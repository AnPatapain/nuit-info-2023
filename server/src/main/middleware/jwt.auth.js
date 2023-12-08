const jwt = require("jsonwebtoken")
const { body, validationResult } = require('express-validator');
const { JWT_SECRET } = process.env



let verifytoken = async (req, res, next) => {
    try {
        // console.log(req.session.token)
        //authen with session
        // const token = req.session.token
        //authen with header

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const jwtReturn = await jwt.verify(token, JWT_SECRET);
        req.userId = jwtReturn.id
        return next()
    } catch (err) {
        next(new jwt.JsonWebTokenError())
    }
}

module.exports = verifytoken