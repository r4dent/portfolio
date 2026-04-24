/**
 * Text Stats CLI Tool
 * Counts characters, words, and lines in text
 * 
 * Usage: run text-stats [text to analyze]
 * Example: run text-stats Hello World
 */

function runTextStats(args) {
    if (!args || args.length === 0) {
        terminal.print('Text Stats', 'section');
        terminal.print('Usage: run text-stats [text]', 'dim');
        terminal.print('Example: run text-stats Hello World', 'dim');
        return;
    }

    const text = args.join(' ');
    
    // Count characters (excluding spaces)
    const charsNoSpaces = text.replace(/\s/g, '').length;
    const charsWithSpaces = text.length;
    
    // Count words
    const words = text.trim().split(/\s+/).filter(w => w.length > 0);
    const wordCount = words.length;
    
    // Count lines (by newlines)
    const lines = text.split('\n').length;
    const lineCount = lines === 1 && !text.includes('\n') ? 1 : lines;
    
    // Count sentences (by . ! ?)
    const sentences = text.split(/[.!?]+/).filter(s => s.trim().length > 0).length;
    
    terminal.print('Text Stats', 'section');
    terminal.print('Text: "' + text.substring(0, 50) + (text.length > 50 ? '...' : '') + '"', 'dim');
    terminal.print('');
    terminal.print('  Characters (no spaces): ' + charsNoSpaces, 'text');
    terminal.print('  Characters (with spaces): ' + charsWithSpaces, 'text');
    terminal.print('  Words: ' + wordCount, 'text');
    terminal.print('  Lines: ' + lineCount, 'text');
    terminal.print('  Sentences: ' + sentences, 'text');
}