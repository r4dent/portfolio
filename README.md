# Interactive Terminal Portfolio

An interactive terminal-style portfolio website for IT professionals. Built with custom HTML, CSS, and JavaScript - no frameworks.

## Live Demo

Visit: **[r4dent.github.io/portfolio](https://r4dent.github.io/portfolio)**

## Features

### Terminal Interface
- Custom terminal emulator with retro-modern aesthetic
- Green-on-dark theme with glow effects
- Command history navigation (arrow keys)
- Tab completion:
  - Single Tab: Complete to unique match
  - Double Tab: Show all suggestions
- Ctrl+L to clear terminal

### Commands
| Command | Description |
|---------|-------------|
| `help` | Show all available commands |
| `clear` | Clear terminal and show welcome |
| `about` | Personal introduction |
| `skills` | Technical skills overview |
| `education` | IT education background |
| `timeline` | Career timeline |
| `career` | Career goals |
| `certs` | Certifications |
| `projects` | Personal projects |
| `cad` | 3D printing projects |
| `tools` | Available utility tools |
| `contact` | Contact information |
| `cv` | Interactive CV |
| `privacy` | Why no social media |

### CV System
Full interactive CV with commands:
- `cv summary` - Professional summary
- `cv exp` - Work experience
- `cv edu` - Education
- `cv certs` - Certifications
- `cv skills` - Technical skills
- `cv projects` - Projects

### CLI Tools
Run tools with `run [tool-name] [args]`

**Network Tools:**
| Tool | Description | Usage |
|------|-------------|-------|
| `subnet` | Subnet calculator | `run subnet 192.168.1.0/24` |

**Security Tools:**
| Tool | Description | Usage |
|------|-------------|-------|
| `password-gen` | Password generator | `run password-gen 16` |

**Utility Tools:**
| Tool | Description | Usage |
|------|-------------|-------|
| `text-stats` | Text statistics | `run text-stats Hello World` |
| `random` | Random number/uuid | `run random 1 100` or `run random uuid` |
| `base64` | Base64 encode/decode | `run base64 encode Hello` |
| `json-format` | JSON formatter | `run json-format {"name":"test"}` |
| `url-encode` | URL encode/decode | `run url-encode encode Hello World` |
| `hex-convert` | Hex/dec/bin converter | `run hex-convert 255` |
| `timestamp` | Timestamp converter | `run timestamp 1704067200` |
| `case-convert` | Case converter | `run case-convert upper hello` |
| `disk-info` | Common directory paths | `run disk-info` |
| `ports` | List well-known ports | `run ports ssh` |
| `ascii-table` | ASCII character table | `run ascii-table 48 57` |
| `env-info` | Browser environment info | `run env-info` |
| `whoami-info` | Current user info | `run whoami-info` |
| `ip-info` | Network information | `run ip-info` |
| `error-codes` | Windows/HTTP error codes | `run error-codes 0x80070005` |
| `service-list` | Common services reference | `run service-list network` |
| `csv-format` | CSV formatter | `run csv-format "name,age" "John,30"` |
| `log-parse` | Log file parser | `run log-parse apache "192.168.1.1 - - [10/Jan] GET / 200"` |
| `xml-validate` | XML validator | `run xml-validate "<tag>value</tag>"` |

### Browser Tools
Open in new tab with `run [tool] --window`:
- SSL Certificate Checker
- Network Diagram Generator
- IT Inventory Tracker
- Log Parser

## Tech Stack

- **HTML5** - Semantic markup
- **CSS3** - Custom styling with CSS variables
- **JavaScript** - Vanilla JS (no frameworks)
  - Terminal emulator
  - Command processing
  - Tab completion
  - CV system
  - Utility tools

## File Structure

```
portfolio/
├── index.html          # Main entry point
├── css/
│   └── style.css      # Terminal styling
├── js/
│   ├── terminal.js    # Terminal emulator core
│   ├── commands.js     # Portfolio commands & tools config
│   ├── cv-data.js      # CV data & display
│   └── tools/          # CLI tool implementations
│       ├── subnet.js
│       ├── password-gen.js
│       ├── text-stats.js
│       ├── random.js
│       ├── base64.js
│       ├── json-format.js
│       ├── url-encode.js
│       ├── hex-convert.js
│       ├── timestamp.js
│       ├── case-convert.js
│       ├── disk-info.js
│       ├── ports.js
│       ├── ascii-table.js
│       ├── env-info.js
│       ├── whoami-info.js
│       ├── ip-info.js
│       ├── error-codes.js
│       ├── service-list.js
│       ├── csv-format.js
│       ├── log-parse.js
│       └── xml-validate.js
├── tools/              # Browser-based tools
│   ├── ssl-check.html
│   ├── network-diagram.html
│   ├── it-inventory.html
│   └── log-parser.html
└── assets/             # Images, fonts, etc.
```

## Development

### Local Development
```bash
# Start local server
python3 -m http.server 8000

# Or use any static server
npx serve .
```

Then visit: http://localhost:8000

### Adding New CLI Tools
1. Create new file in `js/tools/`:
```javascript
// js/tools/my-tool.js
function runMyTool(args) {
    terminal.print('My Tool Output', 'section');
    // Tool logic here
}
```

2. Add to TOOLS config in `js/commands.js`:
```javascript
'my-tool': {
    type: 'cli',
    description: 'My tool description',
    category: 'utilities'
}
```

3. Add case to run switch in `js/commands.js`:
```javascript
case 'my-tool':
    runMyTool(toolArgs);
    break;
```

### Adding CV Data
Edit `js/cv-data.js`:
- Update `CV_DATA` object with your information
- Placeholders like `[YOUR NAME]` need to be filled in

## Tab Completion Behavior

| Input | Single Tab | Double Tab |
|-------|-----------|-----------|
| (empty) | Do nothing | Show all commands |
| `cl` | Complete to `clear` | Show matching |
| `run` | Complete to `run ` | Show all tools |
| `cv` | Complete to `cv ` | Show CV sections |

- Commands that typically have subcommands (`run`, `cv`) auto-add trailing space

## Deployment

### GitHub Pages
1. Push to GitHub repository
2. Go to Settings → Pages
3. Select: Deploy from branch / main / (root)
4. Save

Your site will be live at: `https://yourusername.github.io/repo-name`

## Updating Your Site

Make changes to your files, then push to GitHub:

```bash
# Stage all changes
git add .

# Commit with a message
git commit -m "Description of your changes"

# Push to GitHub
git push
```

GitHub Pages will automatically redeploy (takes 1-2 minutes).

---

## Quick Reference

| Action | Command |
|-------|---------|
| View changes | `git status` |
| Stage all | `git add .` |
| Commit | `git commit -m "message"` |
| Push | `git push` |
| Pull updates | `git pull` |

## Customization

### Updating Personal Info
1. Fill in placeholders in `js/cv-data.js`:
   - `[YOUR NAME]`
   - `[your-email@domain.com]`
   - `[YOUR LOCATION]`

2. Update ASCII art in `js/commands.js`:
   ```javascript
   const ASCII_ART = `...`;
   ```

### Updating Color Scheme
Edit CSS variables in `css/style.css`:
```css
:root {
    --color-user: #3fb950;     /* Terminal prompt color */
    --color-host: #3fb950;
    --color-text: #c9d1d9;   /* Main text */
    --color-dim: #8b949e;    /* Dim text */
    --color-error: #f85149;   /* Error messages */
    --color-highlight: #58a6ff; /* Highlights */
}
```

## License

MIT License - Feel free to use and modify for your own portfolio.

## Credits

- Terminal aesthetic inspired by retro computer terminals
- Built as a career-changing portfolio project
- Any questions? Contact directly via the portfolio.