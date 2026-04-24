/**
 * Disk Info CLI Tool
 * Shows common directories and their purposes
 * 
 * Usage: run disk-info
 */

function runDiskInfo() {
    const directories = [
        { path: 'C:\\', desc: 'System root (Windows)' },
        { path: 'C:\\Windows', desc: 'Windows system files' },
        { path: 'C:\\Users', desc: 'User profiles' },
        { path: 'C:\\Program Files', desc: '64-bit programs' },
        { path: 'C:\\Program Files (x86)', desc: '32-bit programs' },
        { path: 'C:\\Temp', desc: 'Temporary files' },
        { path: '/', desc: 'Root directory (Linux)' },
        { path: '/home', desc: 'User home directories' },
        { path: '/etc', desc: 'Configuration files' },
        { path: '/var/log', desc: 'Log files' },
        { path: '/tmp', desc: 'Temporary files' },
        { path: '/usr/bin', desc: 'User binaries' }
    ];

    terminal.print('Common Directory Paths', 'section');
    terminal.print('');
    
    directories.forEach(dir => {
        terminal.print('  ' + dir.path.padEnd(25) + dir.desc, 'text');
    });
}