const notFound = (req, res, next) => {
    const error = new Error(`not found - ${req.originalUrl}`);
    res.status(404);
    next(error);
}

const errHandler = (err, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = err.message;

    if (err.name === 'CastError' && err.kind == 'ObjectId') {
        statusCode = 404;
        message = "Resourse not found";
    }

    res.status(statusCode).json({
        message,
    })

}

module.exports = { notFound, errHandler };