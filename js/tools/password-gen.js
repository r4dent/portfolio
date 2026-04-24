/**
 * Password Generator CLI Tool
 * Generates secure random passwords
 * 
 * Usage: run password-gen [length]
 * Example: run password-gen 16
 */

function runPasswordGen(args) {
    let length = 16;
    
    if (args && args.length > 0) {
        length = parseInt(args[0]);
        if (isNaN(length) || length < 4 || length > 128) {
            terminal.print('Password Generator', 'section');
            terminal.print('Usage: run password-gen [length]', 'dim');
            terminal.print('Length must be between 4 and 128', 'error');
            return;
        }
    }

    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    const allChars = lowercase + uppercase + numbers + symbols;

    let password = '';
    const randomValues = new Uint32Array(length);
    crypto.getRandomValues(randomValues);

    for (let i = 0; i < length; i++) {
        password += allChars[randomValues[i] % allChars.length];
    }

    terminal.print('Password Generator', 'section');
    terminal.print('Generated password:', 'highlight');
    terminal.print(password, 'text');
    terminal.print('');
    terminal.print('Length: ' + length + ' characters', 'dim');
    terminal.print('Includes: a-z, A-Z, 0-9, symbols', 'dim');
}