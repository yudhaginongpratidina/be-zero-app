const ErrorHandler = (err, req, res, next) => {

    // 01. disctructuring error
    const { issues, message, status = 500 } = err;

    // 02. formatting error
    const formattedError = issues
        ? issues.map(({ path: [path], message }) => ({ path, message }))
        : { message };

    // 03. send error
    return res.status(status).json(formattedError);
};

export default ErrorHandler