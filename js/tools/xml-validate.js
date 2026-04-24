/**
 * XML Validate CLI Tool
 * Validate XML syntax
 * 
 * Usage: run xml-validate [xml]
 * Example: run xml-validate "<tag>value</tag>"
 */

function runXmlValidate(args) {
    if (!args || args.length === 0) {
        terminal.print('XML Validate', 'section');
        terminal.print('Usage: run xml-validate [xml]', 'dim');
        terminal.print('Example: run xml-validate "<config><setting>value</setting></config>"', 'dim');
        return;
    }

    const xml = args.join(' ');
    terminal.print('XML Validate', 'section');
    terminal.print('');

    try {
        validateXml(xml);
        terminal.print('XML is valid', 'highlight');
    } catch (e) {
        terminal.print('Invalid XML', 'error');
        terminal.print('Error: ' + e.message, 'dim');
    }
}

function validateXml(xml) {
    // Check basic structure
    if (xml.trim().length === 0) {
        throw new Error('Empty XML');
    }

    // Check for proper tag syntax
    if (!/<[a-zA-Z][^>]*>/.test(xml)) {
        throw new Error('No valid tags found');
    }

    // Check for matching open/close tags
    const tagRegex = /<\/?([a-zA-Z][a-zA-Z0-9._:-]*)(?:\s[^>]*)?\/?>/g;
    const stack = [];
    let match;
    let depth = 0;

    while ((match = tagRegex.exec(xml)) !== null) {
        const tag = match[1];
        const isSelfClosing = match[0].endsWith('/>');
        const isClosing = match[0].startsWith('</');

        if (isSelfClosing) {
            continue;
        }

        if (isClosing) {
            if (stack.length === 0) {
                throw new Error('Unexpected closing tag: </' + tag + '>');
            }
            if (stack[stack.length - 1] !== tag) {
                throw new Error('Mismatched tags: expected </' + stack[stack.length - 1] + '>, found </' + tag + '>');
            }
            stack.pop();
        } else {
            stack.push(tag);
        }
        depth++;
    }

    if (stack.length > 0) {
        throw new Error('Unclosed tag: <' + stack[stack.length - 1] + '>');
    }

    if (depth === 0) {
        throw new Error('No XML elements found');
    }

    // Try DOM parsing if available
    if (typeof DOMParser !== 'undefined') {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, 'text/xml');
        const parseError = doc.querySelector('parsererror');
        if (parseError) {
            throw new Error(parseError.textContent.split('\n')[0]);
        }
    }

    return true;
}