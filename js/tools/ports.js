/**
 * Ports CLI Tool
 * Lists common well-known ports
 * 
 * Usage: run ports [search]
 * Example: run ports ssh
 */

function runPorts(args) {
    const commonPorts = [
        { port: '20', name: 'FTP Data', desc: 'File transfer (data)' },
        { port: '21', name: 'FTP Control', desc: 'File transfer (control)' },
        { port: '22', name: 'SSH', desc: 'Secure Shell' },
        { port: '23', name: 'Telnet', desc: 'Unencrypted text' },
        { port: '25', name: 'SMTP', desc: 'Email sending' },
        { port: '53', name: 'DNS', desc: 'Domain Name System' },
        { port: '80', name: 'HTTP', desc: 'Web traffic (unencrypted)' },
        { port: '110', name: 'POP3', desc: 'Email retrieval' },
        { port: '143', name: 'IMAP', desc: 'Email management' },
        { port: '443', name: 'HTTPS', desc: 'Web traffic (encrypted)' },
        { port: '445', name: 'SMB', desc: 'Windows file sharing' },
        { port: '3389', name: 'RDP', desc: 'Remote Desktop Protocol' },
        { port: '3306', name: 'MySQL', desc: 'MySQL database' },
        { port: '5432', name: 'PostgreSQL', desc: 'PostgreSQL database' },
        { port: '5900', name: 'VNC', desc: 'Remote desktop' },
        { port: '6379', name: 'Redis', desc: 'Cache database' },
        { port: '8080', name: 'HTTP Alt', desc: 'Alternative HTTP port' },
        { port: '8443', name: 'HTTPS Alt', desc: 'Alternative HTTPS port' },
        { port: '9200', name: 'Elasticsearch', desc: 'Search engine' },
        { port: '27017', name: 'MongoDB', desc: 'NoSQL database' }
    ];

    terminal.print('Common Ports', 'section');
    terminal.print('');

    const search = args && args.length > 0 ? args[0].toLowerCase() : null;

    if (search) {
        const filtered = commonPorts.filter(p => 
            p.name.toLowerCase().includes(search) ||
            p.port.includes(search) ||
            p.desc.toLowerCase().includes(search)
        );
        
        if (filtered.length === 0) {
            terminal.print('No ports found matching: ' + search, 'dim');
        } else {
            filtered.forEach(p => {
                terminal.print('  ' + p.port.padEnd(5) + p.name.padEnd(12) + p.desc, 'text');
            });
        }
    } else {
        commonPorts.forEach(p => {
            terminal.print('  ' + p.port.padEnd(5) + p.name.padEnd(12) + p.desc, 'text');
        });
    }
}