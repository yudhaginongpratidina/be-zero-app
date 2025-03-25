const NotFound = (req, res, next) => {

    // 01. colors
    const methodColors = {
        GET     : '\x1b[32m',   // Green
        POST    : '\x1b[34m',   // Blue
        PATCH   : '\x1b[33m',   // Yellow
        DELETE  : '\x1b[31m',   // Red
        RESET   : '\x1b[0m'     // Reset
    };

    const pathColors = {
        DEFAULT : '\x1b[35m',   // Magenta
        RESET   : '\x1b[0m'     // Reset
    };

    // 02. method color
    const methodColor = methodColors[req.method] || methodColors.RESET;

    // 03. path color
    const pathColor = pathColors.DEFAULT;

    // 04. send on console
    console.log(`${methodColor}${req.method}${methodColors.RESET} ${pathColor}${req.path}${pathColors.RESET} not found`);

    // 05. send error
    res.status(404).json({
        message: `${req.method} ${req.path} not found`
    });
};

export default NotFound;