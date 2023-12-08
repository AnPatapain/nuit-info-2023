const authService = require("../service").authService
const { body, validationResult } = require('express-validator');

let signUp = async (req, res, next) => {
    try {
        // handle req 
        const userData = { ...req.body }

        // business logic
        const user = await authService.signUp(userData)

        // handle res
        res.status(201).send({ message: "signup success", user: { email: user.email, local: user.login } })
    } catch (err) {
        next(err)
    }
}

let signIn = async (req, res, next) => {
    try {
        const validate = [
            body('email').not().equals('invalid').isEmail().withMessage('Email is invalid'),
            body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
        ];

        // Sanitization middleware
        const sanitizeInput = [
            body('email').trim().escape().normalizeEmail(),
            body('password').escape(),
        ];

        // Run validation middleware
        await Promise.all(validate.map(validation => validation.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Run sanitization middleware
        await Promise.all(sanitizeInput.map(sanitizer => sanitizer.run(req)))

        const userData = {
            email: req.body.email,
            password: req.body.password,
            session: req.session
        }
        // const userSession = req.session
        const response = await authService.signIn(userData)

        res.status(200).send(response)
    } catch (err) {
        next(err)
    }
}
const authController = {
    signUp,
    signIn,
}

module.exports = authController