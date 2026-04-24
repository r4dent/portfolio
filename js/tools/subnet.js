/**
 * Subnet Calculator CLI Tool
 * Calculates subnet details from IP/CIDR input
 * 
 * Usage: run subnet [IP/CIDR]
 * Example: run subnet 192.168.1.0/24
 */

function runSubnet(args) {
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
            cidr = maskToCidr(args[1]);
        } else {
            cidr = parseInt(args[1]);
        }
    } else {
        ip = args[0];
        cidr = 24;
    }

    if (!isValidIp(ip)) {
        terminal.print('Invalid IP address: ' + ip, 'error');
        return;
    }
    if (cidr < 0 || cidr > 32) {
        terminal.print('Invalid CIDR: ' + cidr, 'error');
        return;
    }

    const ipNum = ipToNum(ip);
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
    terminal.print('  Network:   ' + numToIp(network), 'text');
    terminal.print('  Broadcast: ' + numToIp(broadcast), 'text');
    terminal.print('  Netmask:   ' + numToIp(mask), 'text');
    terminal.print('  First IP:  ' + numToIp(firstUsable), 'text');
    terminal.print('  Last IP:   ' + numToIp(lastUsable), 'text');
    terminal.print('');
    terminal.print('  Total:    ' + totalHosts + ' addresses', 'dim');
    terminal.print('  Usable:   ' + usableHosts + ' hosts', 'dim');
}

function ipToNum(ip) {
    return ip.split('.').reduce((acc, octet) => (acc << 8) + parseInt(octet), 0) >>> 0;
}

function numToIp(num) {
    return [
        (num >>> 24) & 255,
        (num >>> 16) & 255,
        (num >>> 8) & 255,
        num & 255
    ].join('.');
}

function maskToCidr(mask) {
    const maskNum = ipToNum(mask);
    let cidr = 0;
    while ((maskNum & (1 << 31)) === 0) {
        cidr++;
        maskNum <<= 1;
    }
    return 32 - cidr;
}

function isValidIp(ip) {
    const parts = ip.split('.');
    if (parts.length !== 4) return false;
    return parts.every(p => {
        const n = parseInt(p);
        return !isNaN(n) && n >= 0 && n <= 255 && p === String(n);
    });
}