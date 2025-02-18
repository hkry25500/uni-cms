export default class Logger {
    static colors = {
        reset: '\x1b[0m',
        bright: '\x1b[1m',
        dim: '\x1b[2m',
        red: '\x1b[31m',
        green: '\x1b[32m',
        yellow: '\x1b[33m',
        blue: '\x1b[34m',
        magenta: '\x1b[35m',
        cyan: '\x1b[36m',
        white: '\x1b[37m',
        bgRed: '\x1b[41m',
        bgGreen: '\x1b[42m',
        bgYellow: '\x1b[43m',
        bgBlue: '\x1b[44m',
        bgMagenta: '\x1b[45m',
        bgCyan: '\x1b[46m',
        bgWhite: '\x1b[47m',
    };

    /**
     * Generic log method
     * @param {string} message - The message to output
     * @param {string} color - Text color
     * @param {string} bgColor - Background color
     * @param {boolean} bold - Whether to bold the text
     */
    static log(message, color = '', bgColor = '', bold = false) {
        const boldCode = bold ? this.colors.bright : '';
        console.log(`${bgColor}${color}${boldCode}${message}${this.colors.reset}`);
    }

    /**
     * Output info message
     * @param {string} message - The message to output
     * @param {boolean} bold - Whether to bold the text
     */
    static info(message, bold = false) {
        this.log(message, this.colors.blue, this.colors.bgWhite, bold);
    }

    /**
     * Output success message
     * @param {string} message - The message to output
     * @param {boolean} bold - Whether to bold the text
     */
    static success(message, bold = false) {
        this.log(message, this.colors.green, '', bold);
    }

    /**
     * Output warning message
     * @param {string} message - The message to output
     * @param {boolean} bold - Whether to bold the text
     */
    static warning(message, bold = false) {
        this.log(message, this.colors.yellow, this.colors.bgRed, bold);
    }

    /**
     * Output error message
     * @param {string} message - The message to output
     * @param {boolean} bold - Whether to bold the text
     */
    static error(message, bold = false) {
        this.log(message, this.colors.red, this.colors.bgWhite, bold);
    }

    /**
     * Highlight a message
     * @param {string} message - The message to output
     * @param {boolean} bold - Whether to bold the text
     */
    static highlight(message, bold = false) {
        this.log(message, this.colors.cyan, '', bold);
    }

    /**
     * Output a section title with background color
     * @param {string} title - The title
     * @param {boolean} bold - Whether to bold the text
     */
    static section(title, bold = false) {
        this.log(`${title}`, this.colors.white, this.colors.bgYellow, bold);
    }

    /**
     * Output a default message
     * @param {string} message - The message to output
     * @param {boolean} bold - Whether to bold the text
     */
    static default(message, bold = false) {
        this.log(message, '', '', bold);
    }

    /**
     * Output a blank line
     */
    static blank() {
        console.log();
    }
}