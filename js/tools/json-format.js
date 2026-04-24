/**
 * JSON Format CLI Tool
 * Pretty prints or validates JSON
 * 
 * Usage: run json-format [json string]
 * Example: run json-format {"name":"test","value":1}
 */

function runJsonFormat(args) {
    if (!args || args.length === 0) {
        terminal.print('JSON Format', 'section');
        terminal.print('Usage: run json-format [JSON string]', 'dim');
        terminal.print('Example: run json-format {"name":"test"}', 'dim');
        return;
    }

    const jsonStr = args.join(' ');

    try {
        const parsed = JSON.parse(jsonStr);
        const pretty = JSON.stringify(parsed, null, 2);
        
        terminal.print('JSON Format', 'section');
        terminal.print('Valid JSON:', 'highlight');
        terminal.print('');
        terminal.print(pretty, 'text');
    } catch (e) {
        terminal.print('JSON Format', 'section');
        terminal.print('Invalid JSON', 'error');
        terminal.print('Error: ' + e.message, 'dim');
    }
}