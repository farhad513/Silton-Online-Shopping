const ErrorHander = require("../utils/errorHander");

module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.message = err.message || "Internal Server Error";

    //Wrong  MOngodb id
    if (err.name === "CastError") {
        const message = `Resource not found. Invalid: ${err.path}`;
        err = new ErrorHander(message, 404)
    }
    // Dupliate Error
    if (err.code === 11000) {
        const message = `Duplicate ${Object.keys(err.keyValue)} Entered`;
        err = new ErrorHander(message, 404)
    }
    //json web token invalid
    if (err.name === "JsonWebTokenError") {
        const message = `json web token invalid, try again`;
        err = new ErrorHander(message, 404)
    }
    //jwt token expired error
    if (err.name === "TokenExpiredError") {
        const message = `json web token expired, try again`;
        err = new ErrorHander(message, 404)
    }
    res.status(err.statusCode).json({
        success: false,
        message: err.message,
        // message: err.stack
    })
}  