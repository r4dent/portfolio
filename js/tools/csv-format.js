/**
 * CSV Format CLI Tool
 * Format and validate CSV data
 * 
 * Usage: run csv-format [csv data]
 * Example: run csv-format "name,age,city" "John,30,NYC"
 */

function runCsvFormat(args) {
    if (!args || args.length === 0) {
        terminal.print('CSV Format', 'section');
        terminal.print('Usage: run csv-format [csv data]', 'dim');
        terminal.print('Example: run csv-format "name,age" "John,30"', 'dim');
        return;
    }

    const csv = args.join(' ');
    const rows = csv.split('\n').map(row => row.trim()).filter(row => row);
    
    terminal.print('CSV Format', 'section');
    terminal.print('Input rows: ' + rows.length, 'dim');
    terminal.print('');

    const results = [];
    let hasError = false;

    rows.forEach((row, index) => {
        const cols = row.split(',').map(c => c.trim());
        
        if (index === 0) {
            terminal.print('Header (' + cols.length + ' columns):', 'highlight');
            terminal.print('  ' + cols.join(' | '), 'text');
            terminal.print('');
        } else {
            if (cols.length > 1) {
                results.push(cols);
            }
        }
    });

    if (results.length > 0) {
        terminal.print('Data rows: ' + results.length, 'text');
        terminal.print('');
        results.slice(0, 10).forEach((row, i) => {
            terminal.print('Row ' + (i + 2) + ': ' + row.join(' | '), 'text');
        });
        
        if (results.length > 10) {
            terminal.print('... and ' + (results.length - 10) + ' more rows', 'dim');
        }
    }

    // Check for common issues
    const firstRowCols = rows[0].split(',').length;
    rows.forEach((row, i) => {
        const cols = row.split(',');
        if (cols.length !== firstRowCols) {
            terminal.print('');
            terminal.print('Warning: Row ' + (i + 1) + ' has ' + cols.length + ' columns (expected ' + firstRowCols + ')', 'warning');
            hasError = true;
        }
    });

    if (!hasError) {
        terminal.print('');
        terminal.print('No formatting issues detected', 'text');
    }
}