const terminal = {
    output: document.getElementById('output'),
    input: null,

    history: [],
    historyIndex: -1,
    commands: [],
    _tabIndex: 0,
    _lastTabTime: 0,

    registerCommands(cmdList) {
        this.commands = cmdList;
    },

    config: {
        user: 'visitor',
        host: 'portfolio',
        location: '~',
        promptTemplate: '{user}@{host}:{location}$'
    },

    initEarly() {
        this.createInput();
        this.output.addEventListener('click', (e) => {
            if (e.target !== this.input && !this.input.contains(e.target)) {
                this.inputField.focus();
            }
        });
        document.addEventListener('click', (e) => {
            if (!this.input.contains(e.target)) {
                this.inputField.focus();
            }
        });
        this.inputField.addEventListener('focus', () => {
            this.input.classList.add('focused');
        });
        this.inputField.addEventListener('blur', () => {
            this.input.classList.remove('focused');
        });
        this.inputField.focus();
    },

    createInput() {
        this.input = document.createElement('div');
        this.input.id = 'input-line';
        this.input.innerHTML = this.buildPromptHtml();
        
        const inputField = document.createElement('input');
        inputField.type = 'text';
        inputField.id = 'input';
        inputField.autocomplete = 'off';
        inputField.spellcheck = false;
        inputField.autofocus = true;
        
        inputField.addEventListener('keydown', (e) => this.handleKey(e));
        this.input.appendChild(inputField);
        this.output.appendChild(this.input);
    },

    buildPromptHtml() {
        return `<span class="prompt-user">${this.escapeHtml(this.config.user)}</span>` +
               `<span class="prompt-at">@</span>` +
               `<span class="prompt-host">${this.escapeHtml(this.config.host)}</span>` +
               `<span class="prompt-colon">:</span>` +
               `<span class="prompt-location">${this.escapeHtml(this.config.location)}</span>` +
               `<span class="prompt-dollar">$ </span>`;
    },

    buildPromptHtmlForEcho() {
        return `<span class="prompt-user">${this.escapeHtml(this.config.user)}</span>` +
               `<span class="prompt-at">@</span>` +
               `<span class="prompt-host">${this.escapeHtml(this.config.host)}</span>` +
               `<span class="prompt-colon">:</span>` +
               `<span class="prompt-location">${this.escapeHtml(this.config.location)}</span>` +
               `<span class="prompt-dollar">$ </span>`;
    },

    get inputField() {
        return document.getElementById('input');
    },

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    },

    handleKey(e) {
        switch(e.key) {
            case 'Enter':
                this.execute();
                break;
            case 'ArrowUp':
                e.preventDefault();
                this.navigateHistory(-1);
                break;
            case 'ArrowDown':
                e.preventDefault();
                this.navigateHistory(1);
                break;
            case 'Tab':
                e.preventDefault();
                const now = Date.now();
                if (now - this._lastTabTime < 300) {
                    // Double tab - show all suggestions
                    this.showSuggestions(true);
                } else {
                    // Single tab - complete to first match
                    this.tabComplete();
                }
                this._lastTabTime = now;
                break;
            case 'l':
                if(e.ctrlKey) {
                    e.preventDefault();
                    this.clear();
                    if (window.commands && window.commands.welcome) {
                        window.commands.welcome(true);
                    }
                }
                break;
            case 'c':
                if(e.ctrlKey) {
                    e.preventDefault();
                    this.cancelInput();
                }
                break;
        }
    },

    cancelInput() {
        this.echoCancel();
        this.inputField.value = '';
    },

    execute() {
        const cmd = this.inputField.value.trim();
        
        if (this.pendingPrompt) {
            this.handlePromptInput(cmd);
            this.inputField.value = '';
            return;
        }
        
        if (cmd) {
            if (this.history.length === 0 || this.history[this.history.length - 1] !== cmd) {
                this.history.push(cmd);
            }
            this.historyIndex = this.history.length;
            this.echo(cmd);
            this.process(cmd);
        } else {
            this.echoEmpty();
        }
        this.inputField.value = '';
        this.scrollToBottom();
    },

    echoEmpty() {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = this.buildPromptHtmlForEcho();
        this.output.insertBefore(line, this.input);
    },

    echo(cmd) {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = this.buildPromptHtmlForEcho() + this.escapeHtml(cmd);
        this.output.insertBefore(line, this.input);
    },

    echoCancel() {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = this.buildPromptHtmlForEcho() + this.escapeHtml(this.inputField.value) + '^C';
        this.output.insertBefore(line, this.input);
    },

    process(cmd) {
        const parts = cmd.split(' ');
        const command = parts[0].toLowerCase();
        const args = parts.slice(1);

        if (window.commands && window.commands[command]) {
            window.commands[command](args);
        } else if (command) {
            this.print(`Command not found: ${command}. Type 'help' for available commands.`, 'error');
        }
    },

    navigateHistory(dir) {
        if (this.history.length === 0) return;
        this.historyIndex += dir;
        if (this.historyIndex < 0) this.historyIndex = 0;
        if (this.historyIndex >= this.history.length) {
            this.historyIndex = this.history.length;
            this.inputField.value = '';
            return;
        }
        this.inputField.value = this.history[this.historyIndex];
    },

    tabComplete() {
        const cmds = this.commands;
        const value = this.inputField.value;
        const trimmed = value.trim();
        
        // If empty input, do nothing (double-Tab will show all)
        if (!trimmed) {
            return;
        }

        const parts = value.split(/\s+/);
        // Keep track if original had trailing space
        const hasTrailingSpace = value.endsWith(' ');
        const lastPart = hasTrailingSpace ? '' : parts[parts.length - 1].toLowerCase();
        
        if (parts.length === 1 && !hasTrailingSpace) {
            // Main command - complete if exactly 1 match
            const matches = cmds.filter(c => c.startsWith(lastPart));
            if (matches.length === 1) {
                // Add trailing space for commands that typically have subcommands
                const cmdsWithSubcommands = ['run', 'cv'];
                const needsSpace = cmdsWithSubcommands.includes(matches[0]);
                this.inputField.value = matches[0] + (needsSpace ? ' ' : '');
            }
            // If 0 or 2+ matches, do nothing (double-Tab shows options)
        } else if (parts[0].toLowerCase() === 'run') {
            // run subcommand - complete if exactly 1 match
            if (typeof TOOLS !== 'undefined') {
                const toolNames = Object.keys(TOOLS);
                const targetPart = hasTrailingSpace ? '' : lastPart;
                const matches = toolNames.filter(t => t.startsWith(targetPart));
                if (matches.length === 1) {
                    // Preserve trailing space after completing
                    const prefix = hasTrailingSpace ? value : parts[0] + ' ';
                    this.inputField.value = prefix + matches[0];
                }
            }
        } else if (parts[0].toLowerCase() === 'cv') {
            // cv subcommand - complete if exactly 1 match
            const targetPart = hasTrailingSpace ? '' : lastPart;
            const cvSubcommands = ['summary', 'exp', 'edu', 'certs', 'skills', 'projects', 'export'];
            const matches = cvSubcommands.filter(c => c.startsWith(targetPart));
            if (matches.length === 1) {
                const prefix = hasTrailingSpace ? value : parts[0] + ' ';
                this.inputField.value = prefix + matches[0];
            }
        }
    },

    showSuggestions() {
        const value = this.inputField.value;
        
        // First, show the input as an echo line (keeps input visible)
        if (value.trim()) {
            this.echo(value);
        }
        
        const trimmed = value.trim();
        
        if (!trimmed) {
            terminal.print('Suggestions:', 'section');
            this.commands.forEach(cmd => {
                terminal.print('  ' + cmd, 'text');
            });
            return;
        }

        // Check for trailing space (show all matching)
        const hasTrailingSpace = value.endsWith(' ');
        const parts = trimmed.split(/\s+/);
        
        if (parts.length === 1 && !hasTrailingSpace) {
            const matches = this.commands.filter(c => c.startsWith(parts[0].toLowerCase()));
            if (matches.length > 0) {
                terminal.print('Suggestions:', 'section');
                matches.forEach(cmd => {
                    terminal.print('  ' + cmd, 'text');
                });
            }
        } else if (parts[0].toLowerCase() === 'run') {
            if (typeof TOOLS !== 'undefined') {
                const lastPart = hasTrailingSpace ? '' : parts[parts.length - 1].toLowerCase();
                const matches = Object.keys(TOOLS).filter(t => t.startsWith(lastPart));
                if (matches.length > 0) {
                    terminal.print('Suggestions:', 'section');
                    matches.forEach(tool => {
                        terminal.print('  run ' + tool, 'text');
                    });
                }
            }
        } else if (parts[0].toLowerCase() === 'cv') {
            const lastPart = hasTrailingSpace ? '' : parts[parts.length - 1].toLowerCase();
            const cvSubcommands = ['summary', 'exp', 'edu', 'certs', 'skills', 'projects', 'export'];
            const matches = cvSubcommands.filter(c => c.startsWith(lastPart));
            if (matches.length > 0) {
                terminal.print('Suggestions:', 'section');
                matches.forEach(cmd => {
                    terminal.print('  cv ' + cmd, 'text');
                });
            }
        }
    },

    print(text, className = '') {
        const line = document.createElement('div');
        line.className = 'line' + (className ? ' ' + className : '');
        line.textContent = text;
        this.output.insertBefore(line, this.input);
        this.scrollToBottom();
    },

    printHTML(html) {
        const line = document.createElement('div');
        line.className = 'line';
        line.innerHTML = html;
        this.output.insertBefore(line, this.input);
        this.scrollToBottom();
    },

    newLine() {
        const line = document.createElement('div');
        line.className = 'line';
        this.output.insertBefore(line, this.input);
    },

    clear() {
        this.output.innerHTML = '';
        this.output.appendChild(this.input);
    },

    scrollToBottom() {
        this.input.scrollIntoView({ behavior: 'smooth', block: 'end' });
        this.inputField.focus();
    },

    init() {
        this.inputField.focus();
    },

    setLocation(loc) {
        this.config.location = loc;
        this.updatePrompt();
    },

    setUser(user) {
        this.config.user = user;
        this.updatePrompt();
    },

    setHost(host) {
        this.config.host = host;
        this.updatePrompt();
    },

updatePrompt() {
        const promptSpan = this.input.querySelector('.prompt_user').parentElement;
        if (promptSpan) {
            promptSpan.innerHTML = this.buildPromptHtml();
        }
    },

    pendingPrompt: null,

    prompt(question, callback) {
        this.pendingPrompt = { question, callback };
        this.print(question + ' ', 'text');
        this.inputField.focus();
    },

    handlePromptInput(value) {
        if (this.pendingPrompt) {
            const { callback } = this.pendingPrompt;
            this.pendingPrompt = null;
            callback(value);
        }
    }
};

terminal.initEarly();

setTimeout(() => {
    if (window.commands && window.commands.clear) {
        window.commands.clear();
    }
}, 50);