/**
 * Service List CLI Tool
 * Lists common Windows and Linux services
 * 
 * Usage: run service-list [search]
 * Example: run service-list network
 */

function runServiceList(args) {
    const services = [
        { name: 'wuauserv', desc: 'Windows Update', platform: 'Windows' },
        { name: 'Spooler', desc: 'Print Spooler', platform: 'Windows' },
        { name: 'DHCP', desc: 'DHCP Client', platform: 'Windows' },
        { name: 'Dnscache', desc: 'DNS Client', platform: 'Windows' },
        { name: 'EventLog', desc: 'Windows Event Log', platform: 'Windows' },
        { name: 'Netlogon', desc: 'Netlogon (AD)', platform: 'Windows' },
        { name: 'W32Time', desc: 'Windows Time', platform: 'Windows' },
        { name: 'Themes', desc: 'Themes Service', platform: 'Windows' },
        { name: 'BITS', desc: 'Background Intelligent Transfer', platform: 'Windows' },
        { name: 'WSearch', desc: 'Windows Search', platform: 'Windows' },
        { name: 'sshd', desc: 'SSH Daemon', platform: 'Linux' },
        { name: 'httpd', desc: 'Apache Web Server', platform: 'Linux' },
        { name: 'nginx', desc: 'Nginx Web Server', platform: 'Linux' },
        { name: 'mysqld', desc: 'MySQL Database', platform: 'Linux' },
        { name: 'postgresql', desc: 'PostgreSQL Database', platform: 'Linux' },
        { name: 'docker', desc: 'Docker Container', platform: 'Linux' },
        { name: 'firewalld', desc: 'Firewall Service', platform: 'Linux' },
        { name: 'systemd-journald', desc: 'System Journal', platform: 'Linux' },
        { name: 'cron', desc: 'Task Scheduler', platform: 'Linux' },
        { name: 'rsyslog', desc: 'Syslog Service', platform: 'Linux' }
    ];

    const search = args && args.length > 0 ? args[0].toLowerCase() : null;

    terminal.print('Common Services', 'section');
    terminal.print('');

    if (search) {
        const filtered = services.filter(s =>
            s.name.toLowerCase().includes(search) ||
            s.desc.toLowerCase().includes(search)
        );

        if (filtered.length === 0) {
            terminal.print('No services found matching: ' + search, 'dim');
        } else {
            terminal.print('Results:', 'highlight');
            filtered.forEach(s => {
                terminal.print('  ' + s.name.padEnd(15) + '(' + s.platform + ')', 'text');
                terminal.print('    ' + s.desc, 'dim');
            });
        }
    } else {
        terminal.print('Windows:', 'highlight');
        services.filter(s => s.platform === 'Windows').forEach(s => {
            terminal.print('  ' + s.name.padEnd(15) + s.desc, 'text');
        });
        terminal.print('');
        terminal.print('Linux:', 'highlight');
        services.filter(s => s.platform === 'Linux').forEach(s => {
            terminal.print('  ' + s.name.padEnd(15) + s.desc, 'text');
        });
    }
}