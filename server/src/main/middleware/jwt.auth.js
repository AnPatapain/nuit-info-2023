const jwt = require("jsonwebtoken")
const { body, validationResult } = require('express-validator');
const { JWT_SECRET } = process.env
const validateEmail = body('email').isEmail().normalizeEmail();



let verifytoken = async (req, res, next) => {
    try {
        // console.log(req.session.token)
        //authen with session
        // const token = req.session.token
        //authen with header

        await validateEmail.run(req);

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const jwtReturn = await jwt.verify(token, JWT_SECRET + req.body.email);
        req.userId = jwtReturn.id
        return next()
    } catch (err) {
        next(new jwt.JsonWebTokenError())
    }
}

module.exports = verifytoken