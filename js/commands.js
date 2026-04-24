/**
 * Terminal Portfolio - Interactive Command Line Interface
 * A terminal-style portfolio website for IT professionals
 * @author Your Name
 * @version 1.0.0
 */

/**
 * ASCII Art displayed on startup
 * @constant {string}
 */
const ASCII_ART = `
  PPPPP   RRRRR  IIIII  SSSSS  M   M  DDDD   RRRRR    A    IIIII  N   N
  P   P   R   R    I    S      MM MM  D   D  R   R   A A     I    NN  N
  PPPPP   RRRRR    I    SSSSS  M M M  D   D  RRRRR  AAAAA    I    N N N
  P       R  R     I        S  M   M  D   D  R  R   A   A    I    N  NN
  P       R   R  IIIII  SSSSS  M   M  DDDD   R   R  A   A  IIIII  N   N

  Welcome to my interactive portfolio!
  Type 'help' to get started

`;

/**
 * Tool configuration
 * Defines all available tools and their properties
 * @constant {Object}
 */
const TOOLS = {
    // Network tools
    'subnet': {
        type: 'cli',
        description: 'Subnet calculator',
        category: 'network'
    },

    // Security tools
    'password-gen': {
        type: 'cli',
        description: 'Password generator',
        category: 'security'
    },

    // Utility tools
    'text-stats': {
        type: 'cli',
        description: 'Text statistics',
        category: 'utilities'
    },
    'random': {
        type: 'cli',
        description: 'Random number/uuid',
        category: 'utilities'
    },
    'base64': {
        type: 'cli',
        description: 'Base64 encode/decode',
        category: 'utilities'
    },
    'json-format': {
        type: 'cli',
        description: 'JSON formatter',
        category: 'utilities'
    },
    'url-encode': {
        type: 'cli',
        description: 'URL encode/decode',
        category: 'utilities'
    },
    'hex-convert': {
        type: 'cli',
        description: 'Hex/dec/bin converter',
        category: 'utilities'
    },
    'timestamp': {
        type: 'cli',
        description: 'Timestamp converter',
        category: 'utilities'
    },
    'case-convert': {
        type: 'cli',
        description: 'Case converter',
        category: 'utilities'
    },
    'disk-info': {
        type: 'cli',
        description: 'Common directory paths',
        category: 'utilities'
    },
    'ports': {
        type: 'cli',
        description: 'List well-known ports',
        category: 'utilities'
    },
    'ascii-table': {
        type: 'cli',
        description: 'ASCII character table',
        category: 'utilities'
    },
    'env-info': {
        type: 'cli',
        description: 'Browser environment info',
        category: 'utilities'
    },
    'whoami-info': {
        type: 'cli',
        description: 'Current user info',
        category: 'utilities'
    },
    'ip-info': {
        type: 'cli',
        description: 'Network information',
        category: 'utilities'
    },
    'error-codes': {
        type: 'cli',
        description: 'Windows/HTTP error codes',
        category: 'utilities'
    },
    'service-list': {
        type: 'cli',
        description: 'Common services reference',
        category: 'utilities'
    },

    // Browser-only tools
    'ssl-check': {
        url: '/tools/ssl-check.html',
        description: 'SSL certificate',
        category: 'security'
    },
    'log-parser': {
        url: '/tools/log-parser.html',
        description: 'Log parser',
        category: 'utilities'
    },
    'network-diagram': {
        url: '/tools/network-diagram.html',
        description: 'Network diagram',
        category: 'utilities'
    },
    'it-inventory': {
        url: '/tools/it-inventory.html',
        description: 'IT inventory',
        category: 'utilities'
    }
};

/**
 * Pad a command string to a fixed width for alignment
 * @param {string} cmd - The command string to pad
 * @param {number} width - The target width (default: 30)
 * @returns {string} Padded string
 */
function _pad(cmd, width = 30) {
    return cmd + ' '.repeat(width - cmd.length);
}

/**
 * Main commands object
 * Contains all interactive terminal commands
 * @namespace window.commands
 */
window.commands = {
    /**
     * Display help message with all available commands
     * @method help
     */
    help() {
        terminal.print('Available commands:', 'section');
        terminal.print('');
        terminal.print(_pad('  help') + 'Show this help message', 'command');
        terminal.print(_pad('  clear') + 'Clear terminal', 'command');
        terminal.print(_pad('  privacy') + 'Why no social media', 'command');
        terminal.print(_pad('  about') + 'About me', 'command');
        terminal.print(_pad('  skills') + 'Technical skills', 'command');
        terminal.print(_pad('  education') + 'Education', 'command');
        terminal.print(_pad('  timeline') + 'Career timeline', 'command');
        terminal.print(_pad('  career') + 'Career goals', 'command');
        terminal.print(_pad('  certs') + 'Certifications', 'command');
        terminal.print(_pad('  projects') + 'Personal projects', 'command');
        terminal.print(_pad('  cad') + '3D printing', 'command');
        terminal.print(_pad('  tools') + 'Available tools', 'command');
        terminal.print(_pad('  contact') + 'Contact info', 'command');
        terminal.print(_pad('  cv') + 'Interactive CV', 'command');
        terminal.print('');
        terminal.print('Tool commands:', 'section');
        terminal.print(_pad('  run') + 'Run tool (run [name] [args])', 'command');
        terminal.print('');
        terminal.print('Tip: Press Tab to cycle commands!', 'dim');
    },

    /**
     * Clear the terminal and display welcome message
     * @method clear
     */
    clear() {
        terminal.clear();
        window.commands.welcome(true);
    },

    /**
     * Display privacy information
     * @method privacy
     * @param {string[]} [args] - Optional arguments (--details for more info)
     */
    privacy(args) {
        if (args && args.includes('--details')) {
            terminal.print('Why I don\'t use social media:', 'section');
            terminal.print('');
            terminal.print('Security is not just a buzzword for me — it\'s a practice.', 'text');
            terminal.print('');
            terminal.print('Social media platforms are designed to extract maximum personal data while providing minimum security. They become high-value targets for attackers and frequently fail to protect user data.', 'text');
            terminal.print('');
            terminal.print('Some examples of what can go wrong:', 'highlight');
            terminal.print('');
            terminal.print('  2013 - Adobe          153 million accounts leaked', 'dim');
            terminal.print('  2018 - Facebook      87 million profiles harvested', 'dim');
            terminal.print('  2019 - LinkedIn       500 million profiles sold', 'dim');
            terminal.print('  2021 - LinkedIn       700 million profiles scraped', 'dim');
            terminal.print('  2023 - 23andMe       Genetic data breached', 'dim');
            terminal.print('');
            terminal.print('My approach:', 'highlight');
            terminal.print('  - No social media accounts', 'text');
            terminal.print('  - No data on third-party platforms', 'text');
            terminal.print('  - Questions? Ask me directly.', 'text');
        } else {
            terminal.print('I don\'t use social media or maintain public profiles.', 'text');
            terminal.print('This is a deliberate choice based on security principles.', 'text');
            terminal.print('');
            terminal.print('Type \'privacy --details\' to learn why.', 'dim');
        }
    },

    /**
     * Display personal introduction
     * @method about
     */
    about() {
        terminal.print('Hi, I\'m a motivated IT professional transitioning from system administration to technical support.', 'text');
        terminal.print('');
        terminal.print('After years of hands-on admin work, I decided to formalize my skills with a 2-year accelerated IT education, which I completed in just 1 year while continuing to work.', 'text');
        terminal.print('');
        terminal.print('I\'m looking to grow in the IT support field with a long-term goal of breaking into cybersecurity.', 'text');
        terminal.print('');
        terminal.print('Type \'skills\' to see what I know, or \'timeline\' to see my journey.', 'dim');
    },

    /**
     * Display technical skills
     * @method skills
     */
    skills() {
        terminal.print('Languages & Scripting:', 'section');
        terminal.print('  JavaScript, Java, Python, PHP, Bash, PowerShell', 'text');
        terminal.print('');
        terminal.print('Web & Data:', 'section');
        terminal.print('  HTML, CSS, SQL, JSON, XML', 'text');
        terminal.print('');
        terminal.print('Networking:', 'section');
        terminal.print('  Cisco IOS, TCP/IP, DNS, DHCP, VLANs, CCNA concepts', 'text');
        terminal.print('');
        terminal.print('Tools & Platforms:', 'section');
        terminal.print('  Git, Linux, Windows Server, Apache, Nginx', 'text');
        terminal.print('');
        terminal.print('Utilities:', 'section');
        terminal.print('  Subnetting, Packet analysis, Network diagnostics', 'text');
        terminal.print('  SSL/TLS, Log analysis, Security fundamentals', 'text');
        terminal.print('');
        terminal.print('CAD & 3D Printing (FreeCAD):', 'section');
        terminal.print('  Parametric 3D modeling, Custom designs & repairs', 'text');
        terminal.print('');
        terminal.print('Type \'cad\' to see my projects.', 'dim');
    },

    /**
     * Display education background
     * @method education
     */
    education() {
        terminal.print('IT Education (Accelerated 2-Year Program)', 'section');
        terminal.print('Completed in: 1 year', 'highlight');
        terminal.print('');
        terminal.print('  - Hardware fundamentals', 'text');
        terminal.print('  - Operating systems (Windows, Linux)', 'text');
        terminal.print('  - Networking protocols (TCP/IP, DNS, DHCP)', 'text');
        terminal.print('  - Programming basics', 'text');
        terminal.print('  - Database fundamentals', 'text');
        terminal.print('  - IT security basics', 'text');
        terminal.print('');
        terminal.print('Cisco CCNA Certification:', 'section');
        terminal.print('  - Network fundamentals', 'text');
        terminal.print('  - Routing & switching', 'text');
        terminal.print('  - Security fundamentals', 'text');
    },

    /**
     * Display career timeline
     * @method timeline
     */
    timeline() {
        terminal.print('2015-2023', 'highlight');
        terminal.print('  System Administration', 'section');
        terminal.print('  Server management, network maintenance, user support', 'text');
        terminal.print('');
        terminal.print('2022-2023', 'highlight');
        terminal.print('  IT Education (Accelerated)', 'section');
        terminal.print('  Completed 2-year program in 1 year while working full-time', 'text');
        terminal.print('');
        terminal.print('2023', 'highlight');
        terminal.print('  Cisco CCNA Certification', 'section');
        terminal.print('  Networking fundamentals and routing & switching', 'text');
        terminal.print('');
        terminal.print('2023-Present', 'highlight');
        terminal.print('  Building portfolio, targeting IT support roles', 'text');
        terminal.print('  Long-term goal: cybersecurity', 'dim');
    },

    /**
     * Display career goals
     * @method career
     */
    career() {
        terminal.print('Goal: IT Support Specialist (1st/2nd Level)', 'section');
        terminal.print('');
        terminal.print('Why support?', 'highlight');
        terminal.print('  After years as an admin, I understand systems from the ground up.', 'text');
        terminal.print('');
        terminal.print('Why pivot from admin to support?', 'highlight');
        terminal.print('  - Broader skill development', 'text');
        terminal.print('  - More diverse daily challenges', 'text');
        terminal.print('  - Foundation for security work', 'text');
        terminal.print('');
        terminal.print('Long-term: Cybersecurity', 'highlight');
        terminal.print('  The education was the first step. IT support gives me exposure to real environments, incidents, and threats.', 'text');
    },

    /**
     * Display certifications
     * @method certs
     */
    certs() {
        terminal.print('Certifications:', 'section');
        terminal.print('');
        terminal.print('[2023]', 'highlight');
        terminal.print('  Cisco CCNA', 'section');
        terminal.print('  Network Fundamentals, Routing & Switching, Network Security', 'text');
    },

    /**
     * Display personal projects
     * @method projects
     */
    projects() {
        terminal.print('Personal Projects:', 'section');
        terminal.print('');
        terminal.print('Network & Utility Tools:', 'highlight');
        terminal.print('  - Subnet Calculator, IP Locator, Ping Tool, DNS Lookup', 'text');
        terminal.print('  - Password Generator, Hash Generator, Base64 Encoder', 'text');
        terminal.print('  - JSON Formatter, Regex Tester', 'text');
        terminal.print('');
        terminal.print('New tools:', 'highlight');
        terminal.print('  - SSL Certificate Checker', 'text');
        terminal.print('  - Network Diagram Generator', 'text');
        terminal.print('  - IT Inventory Tracker', 'text');
        terminal.print('');
        terminal.print('Type \'tools\' for full list.', 'dim');
    },

    /**
     * Display CAD/3D printing projects
     * @method cad
     */
    cad() {
        terminal.print('CAD Projects:', 'section');
        terminal.print('');
        terminal.print('Phone Mount Repair', 'highlight');
        terminal.print('  Type:      Repair / Replacement Part', 'dim');
        terminal.print('  Software:  FreeCAD 1.1', 'dim');
        terminal.print('  Material:  PLA (heat-resistant)', 'dim');
        terminal.print('  Status:    Completed', 'dim');
        terminal.print('');
        terminal.print('  Goal:', 'highlight');
        terminal.print('    Fix broken tracking camera mount with swivel functionality', 'text');
        terminal.print('');
        terminal.print('More projects coming soon.', 'dim');
    },

    /**
     * Display available tools
     * @method tools
     */
    tools() {
        const categories = {
            network: [],
            security: [],
            utilities: []
        };

        for (const [name, tool] of Object.entries(TOOLS)) {
            if (categories[tool.category]) {
                categories[tool.category].push({ name, ...tool });
            }
        }

        terminal.print('Available Tools:', 'section');
        terminal.print('');

        terminal.print('Network:', 'section');
        categories.network.forEach(tool => {
            terminal.print(_pad('  run ' + tool.name) + tool.description, 'text');
        });

        terminal.print('Security:', 'section');
        categories.security.forEach(tool => {
            terminal.print(_pad('  run ' + tool.name) + tool.description, 'text');
        });

        terminal.print('Utilities:', 'section');
        categories.utilities.forEach(tool => {
            terminal.print(_pad('  run ' + tool.name) + tool.description, 'text');
        });

        terminal.print('');
        terminal.print('Usage: run [tool-name]', 'dim');
    },

    /**
     * Display contact information
     * @method contact
     */
    contact() {
        terminal.print('Contact Information:', 'section');
        terminal.print('');
        terminal.print('  Email:    [your-email@domain.com]', 'text');
        terminal.print('  GitHub:   [github.com/yourusername]', 'text');
        terminal.print('');
        terminal.print('  Open to: IT Support, Junior Security, SysAdmin', 'text');
        terminal.print('');
        terminal.print('Note: No LinkedIn. Type \'privacy\' to learn more.', 'dim');
    },

    /**
     * Display interactive CV
     * @method cv
     * @param {string[]} [args] - Section to display
     */
    cv(args) {
        if (!args || args.length === 0) {
            terminal.print('CV Commands:', 'section');
            terminal.print('  cv summary     View professional summary', 'command');
            terminal.print('  cv exp         View work experience', 'command');
            terminal.print('  cv edu         View education', 'command');
            terminal.print('  cv certs       View certifications', 'command');
            terminal.print('  cv skills     View technical skills', 'command');
            terminal.print('  cv projects   View projects', 'command');
            terminal.print('  cv export    Download as PDF', 'command');
            terminal.print('');
            terminal.print('Use cv [section] to view specific sections', 'dim');
            return;
        }

        const subcommand = args[0].toLowerCase();

        switch(subcommand) {
            case 'summary':
                terminal.print('Professional Summary:', 'section');
                terminal.print('Motivated IT professional transitioning from system administration to technical support.', 'text');
                terminal.print('Completed 2-year IT education in 1 year while working full-time.', 'text');
                terminal.print('Looking to grow in IT support with long-term goal of cybersecurity.', 'text');
                break;
            case 'exp':
            case 'experience':
                terminal.print('Work Experience:', 'section');
                terminal.print('2015-2023: System Administration', 'highlight');
                terminal.print('  Server management, network maintenance, user support', 'text');
                break;
            case 'edu':
            case 'education':
                terminal.print('Education:', 'section');
                terminal.print('IT Education (Accelerated 2-Year Program)', 'highlight');
                terminal.print('Completed in: 1 year', 'highlight');
                terminal.print('  - Hardware, OS, Networking, Programming, Security', 'text');
                terminal.print('');
                terminal.print('Cisco CCNA Certification (2023)', 'highlight');
                break;
            case 'certs':
            case 'certifications':
                terminal.print('Certifications:', 'section');
                terminal.print('[2023] Cisco CCNA', 'highlight');
                terminal.print('  Network Fundamentals, Routing & Switching, Security', 'text');
                break;
            case 'skills':
                terminal.print('Technical Skills:', 'section');
                terminal.print('Languages: JavaScript, Java, Python, PHP, Bash, PowerShell', 'text');
                terminal.print('Web: HTML, CSS, SQL, JSON, XML', 'text');
                terminal.print('Networking: Cisco IOS, TCP/IP, DNS, DHCP, VLANs', 'text');
                terminal.print('CAD: FreeCAD 1.1, Parametric modeling', 'text');
                break;
            case 'projects':
                terminal.print('Projects:', 'section');
                terminal.print('IT Tools Collection (JS utilities)', 'highlight');
                terminal.print('Phone Mount Repair (FreeCAD)', 'highlight');
                terminal.print('SSL Certificate Checker', 'highlight');
                terminal.print('Network Diagram Generator', 'highlight');
                terminal.print('IT Inventory Tracker', 'highlight');
                break;
            case 'export':
                terminal.print('CV Export:', 'section');
                terminal.print('PDF export coming soon. CV data stored in cv-data.js', 'dim');
                break;
            default:
                terminal.print('Unknown section: ' + subcommand, 'error');
                terminal.print('Use cv to see available sections', 'dim');
        }
    },

    /**
     * Run a tool
     * @method run
     * @param {string[]} args - Tool name and optional arguments
     */
    run(args) {
        if (!args || args.length === 0) {
            terminal.print('Usage: run [tool-name] or run [tool-name] --window', 'warning');
            terminal.print('Type "tools" to see available tools.', 'dim');
            return;
        }

        const useWindow = args.includes('--window');
        const filteredArgs = args.filter(a => a !== '--window');
        const toolName = filteredArgs[0];
        const toolArgs = filteredArgs.slice(1);

        const tool = TOOLS[toolName];

        if (!tool) {
            terminal.print(`Tool not found: ${toolName}`, 'error');
            terminal.print('Type "tools" to see available tools.', 'dim');
            return;
        }

        if (tool.type === 'cli') {
            // Call CLI tool function
            switch(toolName) {
                case 'subnet':
                    runSubnet(toolArgs);
                    break;
                case 'password-gen':
                    runPasswordGen(toolArgs);
                    break;
                case 'text-stats':
                    runTextStats(toolArgs);
                    break;
                case 'random':
                    runRandom(toolArgs);
                    break;
                case 'base64':
                    runBase64(toolArgs);
                    break;
                case 'json-format':
                    runJsonFormat(toolArgs);
                    break;
                case 'url-encode':
                    runUrlEncode(toolArgs);
                    break;
                case 'hex-convert':
                    runHexConvert(toolArgs);
                    break;
                case 'timestamp':
                    runTimestamp(toolArgs);
                    break;
                case 'case-convert':
                    runCaseConvert(toolArgs);
                    break;
                case 'disk-info':
                    runDiskInfo(toolArgs);
                    break;
                case 'ports':
                    runPorts(toolArgs);
                    break;
                case 'ascii-table':
                    runAsciiTable(toolArgs);
                    break;
                case 'env-info':
                    runEnvInfo(toolArgs);
                    break;
                case 'whoami-info':
                    runWhoamiInfo(toolArgs);
                    break;
                case 'ip-info':
                    runIpInfo(toolArgs);
                    break;
                case 'error-codes':
                    runErrorCodes(toolArgs);
                    break;
                case 'service-list':
                    runServiceList(toolArgs);
                    break;
                default:
                    terminal.print(`Tool not implemented: ${toolName}`, 'error');
            }
            return;
        }

        if (tool.url) {
            if (useWindow) {
                terminal.print(`Opening ${toolName} in new tab...`, 'command');
                window.open(tool.url, '_blank');
            } else {
                terminal.print(`[Inline mode] ${toolName}`, 'command');
                terminal.print(`Tool URL: ${window.location.origin}${tool.url}`, 'text');
            }
        }
    },

    /**
     * Run subnet calculator (CLI tool)
     * @method _runSubnet
     * @private
     * @param {string[]} args - IP/CIDR arguments
     */
    _runSubnet(args) {
        if (!args || args.length === 0) {
            terminal.print('Subnet Calculator', 'section');
            terminal.print('Usage: run subnet [IP/CIDR]', 'dim');
            terminal.print('Example: run subnet 192.168.1.0/24', 'dim');
            return;
        }

        let ip, cidr;
        if (args[0].includes('/')) {
            const parts = args[0].split('/');
            ip = parts[0];
            cidr = parseInt(parts[1]);
        } else if (args[1]) {
            ip = args[0];
            if (args[1].includes('.')) {
                cidr = this._maskToCidr(args[1]);
            } else {
                cidr = parseInt(args[1]);
            }
        } else {
            ip = args[0];
            cidr = 24;
        }

        if (!this._isValidIp(ip)) {
            terminal.print('Invalid IP address: ' + ip, 'error');
            return;
        }
        if (cidr < 0 || cidr > 32) {
            terminal.print('Invalid CIDR: ' + cidr, 'error');
            return;
        }

        const ipNum = this._ipToNum(ip);
        const mask = cidr === 0 ? 0 : (~0 << (32 - cidr)) >>> 0;
        const network = (ipNum & mask) >>> 0;
        const broadcast = (network | (~mask >>> 0)) >>> 0;
        const firstUsable = cidr >= 31 ? network : network + 1;
        const lastUsable = cidr >= 31 ? broadcast : broadcast - 1;
        const totalHosts = Math.pow(2, 32 - cidr);
        const usableHosts = cidr >= 31 ? totalHosts : totalHosts - 2;

        terminal.print('Subnet Results:', 'section');
        terminal.print('  Input:      ' + ip + '/' + cidr, 'highlight');
        terminal.print('');
        terminal.print('  Network:   ' + this._numToIp(network), 'text');
        terminal.print('  Broadcast: ' + this._numToIp(broadcast), 'text');
        terminal.print('  Netmask:   ' + this._numToIp(mask), 'text');
        terminal.print('  First IP:  ' + this._numToIp(firstUsable), 'text');
        terminal.print('  Last IP:   ' + this._numToIp(lastUsable), 'text');
        terminal.print('');
        terminal.print('  Total:     ' + totalHosts + ' addresses', 'dim');
        terminal.print('  Usable:    ' + usableHosts + ' hosts', 'dim');
    },

    /**
     * Convert IP string to number
     * @method _ipToNum
     * @private
     * @param {string} ip - IP address string
     * @returns {number} IP as number
     */
    _ipToNum(ip) {
        return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
    },

    /**
     * Convert number to IP string
     * @method _numToIp
     * @private
     * @param {number} num - IP as number
     * @returns {string} IP address string
     */
    _numToIp(num) {
        return [
            (num >>> 24) & 255,
            (num >>> 16) & 255,
            (num >>> 8) & 255,
            num & 255
        ].join('.');
    },

    /**
     * Convert subnet mask to CIDR
     * @method _maskToCidr
     * @private
     * @param {string} mask - Subnet mask
     * @returns {number} CIDR value
     */
    _maskToCidr(mask) {
        const maskNum = this._ipToNum(mask);
        let cidr = 0;
        while ((maskNum & (1 << 31)) === 0) {
            cidr++;
            maskNum <<= 1;
        }
        return 32 - cidr;
    },

    /**
     * Validate IP address
     * @method _isValidIp
     * @private
     * @param {string} ip - IP address to validate
     * @returns {boolean} True if valid
     */
    _isValidIp(ip) {
        const parts = ip.split('.');
        if (parts.length !== 4) return false;
        return parts.every(p => {
            const n = parseInt(p);
            return !isNaN(n) && n >= 0 && n <= 255 && p === String(n);
        });
    },

    /**
     * Display welcome message
     * @method welcome
     * @param {boolean} [isCleared=false] - Whether terminal was cleared
     */
    welcome(isCleared = false) {
        terminal.print(ASCII_ART, 'ascii');
    }
};

// Initialize terminal
terminal.registerCommands(Object.keys(window.commands));
terminal.print(ASCII_ART, 'ascii');
