const DuplicateEmailError = require("./DuplicateEmailError");
const UnauthorizedError = require("./UnauthorizedError")
const NoTokenError = require("./TokenError").NoTokenError
const InvalidTokenError = require("./TokenError").InvalidTokenError
const UserDataError = require("./UserError").UserDataError
const UserSessionError = require("./UserError").UserSessionError
const ProfileError = require("./ProfileError")
const ResourceNotFoundError = require("./RessourceNotFoundError")
const BadCredentialsError = require("./BadCredentialsError");
const DailyFactError = require("./DailyFactError")
const { JsonWebTokenError } = require("jsonwebtoken");
const { MulterError } = require("multer");


let handleDuplicateEmailError = (err, res) => {
    // res.status(409).json({ "DuplicateEmailError": err.message });
    res.status(409).json({ message: err.message });
}

let handleUnauthorizedError = (err, res) => {
    res.status(401).json({ message: err.message })
}
let handleUserDataError = (err, res) => {
    res.status(400).json({ message: err.message })
}
let handleUserSessionError = (err, res) => {
    res.status(400).json({ message: err.message })
}
let handleNoTokenError = (err, res) => {
    res.status(401).json({ message: err.message })
}

let handleInvalidTokenError = (err, res) => {
    res.status(403).json({ message: err.message })
}

let handleResourceNotFoundError = (err, res) => {
    res.status(404).json({ message: err.message })
}

let handleJwtError = (err, res) => {
    res.status(403).json({ message: err });
}

let handleBadCredentialsError = (err, res) => {
    console.log(err.message);
    res.status(401).json({ message: err.message });
}
let handleProfileError = (err, res) => {
    res.status(400).json({ message: err.message })
}

let handleMulterError = (err, res) => {
    res.status(400).json({ message: err.message });
}

let handleDailyFactError = (err, res) => {
    res.status(400).json({ message: err.message })
}
module.exports = (err, req, res, next) => {

    if (err instanceof DuplicateEmailError) handleDuplicateEmailError(err, res)

    else if (err instanceof UnauthorizedError) handleUnauthorizedError(err, res)

    else if (err instanceof UserDataError) handleUserDataError(err, res)

    else if (err instanceof UserSessionError) handleUserSessionError(err, res)

    else if (err instanceof NoTokenError) handleNoTokenError(err, res)

    else if (err instanceof InvalidTokenError) handleInvalidTokenError(err, res)

    else if (err instanceof ResourceNotFoundError) handleResourceNotFoundError(err, res)

    else if (err instanceof ProfileError) handleProfileError(err, res)

    else if (err instanceof MulterError) handleMulterError(err, res)

    else if (err instanceof BadCredentialsError) handleBadCredentialsError(err, res)

    else if (err instanceof JsonWebTokenError) handleJwtError(err, res)

    else if (err instanceof DailyFactError) handleDailyFactError(err, res)

    else {
        res.status(500).json({ message: "Internal Server Error" + err });
    }
}
