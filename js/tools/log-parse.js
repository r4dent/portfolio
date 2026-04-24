/**
 * Log Parse CLI Tool
 * Parse and analyze common log formats
 * 
 * Usage: run log-parse [log type] [log data]
 * Example: run log-parse syslog "Jan 15 10:23:45 server sshd: Accepted password"
 *         run log-parse apache "192.168.1.1 - - [10/Jan/2024:10:23:45] GET /index.html 200"
 */

function runLogParse(args) {
    if (!args || args.length === 0) {
        terminal.print('Log Parse', 'section');
        terminal.print('Usage: run log-parse [type] [log line]', 'dim');
        terminal.print('');
        terminal.print('Supported types:', 'highlight');
        terminal.print('  syslog    - Standard syslog format', 'text');
        terminal.print('  apache    - Apache/Nginx access log', 'text');
        terminal.print('  json      - JSON formatted logs', 'text');
        terminal.print('');
        terminal.print('Example: run log-parse apache "192.168.1.1 - - [10/Jan/2024] GET /index.html 200"', 'dim');
        return;
    }

    const logType = args[0].toLowerCase();
    const logData = args.slice(1).join(' ');

    if (!logData) {
        terminal.print('Please provide log data to parse', 'error');
        return;
    }

    terminal.print('Log Parse', 'section');
    terminal.print('Type: ' + logType.toUpperCase(), 'dim');
    terminal.print('');

    switch(logType) {
        case 'syslog':
            parseSyslog(logData);
            break;
        case 'apache':
        case 'nginx':
            parseApache(logData);
            break;
        case 'json':
            parseJsonLog(logData);
            break;
        default:
            terminal.print('Unknown log type: ' + logType, 'error');
            terminal.print('Supported: syslog, apache, json', 'dim');
    }
}

function parseSyslog(log) {
    // Syslog format: timestamp hostname process[pid]: message
    const regex = /^(\w+\s+\d+\s+\d+:\d+:\d+)\s+(\S+)\s+(\S+?)(?:\[(\d+)\])?:\s*(.*)$/;
    const match = log.match(regex);

    if (match) {
        terminal.print('Timestamp: ' + match[1], 'text');
        terminal.print('Hostname:  ' + match[2], 'text');
        terminal.print('Process:  ' + match[3], 'text');
        if (match[4]) terminal.print('PID:      ' + match[4], 'text');
        terminal.print('Message:  ' + match[5], 'highlight');
        
        // Check for common severity keywords
        const msg = match[5].toLowerCase();
        if (msg.includes('error') || msg.includes('fail') || msg.includes('crit')) {
            terminal.print('');
            terminal.print('Severity: ERROR', 'error');
        } else if (msg.includes('warn')) {
            terminal.print('');
            terminal.print('Severity: WARNING', 'warning');
        } else {
            terminal.print('');
            terminal.print('Severity: INFO', 'text');
        }
    } else {
        terminal.print('Could not parse syslog format', 'dim');
        terminal.print('Raw: ' + log, 'text');
    }
}

function parseApache(log) {
    // Apache format: IP - - [timestamp] "method path proto" status size
    const regex = /^(\S+)\s+\S+\s+\S+\s+\[([^\]]+)\]\s+"(\S+)\s+(\S+)\s+\S+"\s+(\d+)\s+(\d+|-)/;
    const match = log.match(regex);

    if (match) {
        terminal.print('IP:       ' + match[1], 'text');
        terminal.print('Time:     ' + match[2], 'text');
        terminal.print('Method:   ' + match[3], 'text');
        terminal.print('Path:     ' + match[4], 'text');
        terminal.print('Status:   ' + match[5], getStatusColor(match[5]));
        if (match[6] !== '-') terminal.print('Size:     ' + match[6] + ' bytes', 'text');
        
        // Interpret status code
        const status = parseInt(match[5]);
        terminal.print('');
        terminal.print('Interpretation:', 'highlight');
        if (status === 200) terminal.print('  Success - request completed', 'text');
        else if (status === 301 || status === 302) terminal.print('  Redirect - client sent elsewhere', 'text');
        else if (status === 400) terminal.print('  Bad Request - malformed syntax', 'text');
        else if (status === 401) terminal.print('  Unauthorized - authentication required', 'text');
        else if (status === 403) terminal.print('  Forbidden - access denied', 'text');
        else if (status === 404) terminal.print('  Not Found - resource missing', 'text');
        else if (status === 500) terminal.print('  Server Error - internal failure', 'text');
        else terminal.print('  Status ' + status, 'text');
    } else {
        terminal.print('Could not parse Apache log format', 'dim');
        terminal.print('Raw: ' + log, 'text');
    }
}

function parseJsonLog(log) {
    try {
        const parsed = JSON.parse(log);
        terminal.print('Valid JSON:', 'highlight');
        terminal.print('');
        
        // Common log fields
        const fields = ['timestamp', 'time', 'level', 'severity', 'message', 'msg', 'error', 'host', 'service', 'status'];
        fields.forEach(field => {
            if (parsed[field]) {
                terminal.print(field + ': ' + parsed[field], 'text');
            }
        });
        
        // Show remaining fields
        Object.keys(parsed).forEach(key => {
            if (!fields.includes(key)) {
                terminal.print(key + ': ' + JSON.stringify(parsed[key]), 'dim');
            }
        });
    } catch (e) {
        terminal.print('Invalid JSON', 'error');
        terminal.print('Error: ' + e.message, 'dim');
    }
}

function getStatusColor(status) {
    const code = parseInt(status);
    if (code >= 200 && code < 300) return 'text';
    if (code >= 300 && code < 400) return 'highlight';
    if (code >= 400 && code < 500) return 'warning';
    return 'error';
}