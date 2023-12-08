const dailyFactService = require("../service").dailyFactService
const profileService = require("../service").profileService
const fs = require('fs')


const createOne = async (req, res, next) => {
    try {

        const validate = [
            body('fact').optional().isString().withMessage('Fact must be a string'),
            body('title').optional().isString().withMessage('Title must be a string'),
        ];

        // Sanitization middleware
        const sanitizeInput = [
            sanitizeBody('fact').trim().escape(),
            sanitizeBody('title').trim().escape(),
        ];

        // Run validation middleware
        await Promise.all(validate.map(validation => validation.run(req)));

        // Check for validation errors
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        // Run sanitization middleware
        await Promise.all(sanitizeInput.map(sanitizer => sanitizer.run(req)));

        const profile = await profileService.getFromUserId(req.userId)
        const dailyFactData = {
            fact: req.body.fact || 'FACTOs',
            title: req.body.title || 'Default FACT',
            image: req?.file?.path ? req.file.path : null,
            profileId: profile._id
        }
        const dailyFact = await dailyFactService.createOne(dailyFactData)
        res.status(201).send({ dailyFact })
    } catch (err) {
        console.log(err);
        next(err)
    } finally {
        if (req.file) {
            try {
                fs.unlink(req.file.path, (err) => {
                    if (err) {
                        console.error("Error deleting file from uploads folder:", err);
                    }
                });
            } catch (err) {
                console.error("Error in finally block:", err);
            }
        }
    }
}
const getOne = async (req, res, next) => {
    try {
        let dailyFact = await dailyFactService.getFromFactId(req.params.dailyFactId)
        // return profile
        res.status(200).send({ dailyFact })
    } catch (err) {
        next(err)
    }
}
const getAll = async (req, res, next) => {
    try {
        let dailyFacts = await dailyFactService.getAll()
        res.status(200).send(dailyFacts)
    } catch (err) {
        console.log(err);
        next(err)
    }
}
const getToday = async (req, res, next) => {
    try {
        const profile = await profileService.getFromUserId(req.userId)
        const dailyFacts = await dailyFactService.getToday(profile._id)
        res.status(200).send(dailyFacts)
    } catch (err) {
        console.log(err)
        next(err)
    }
}

const getAllCurrent = async (req, res, next) => {
    try {
        const profile = await profileService.getFromUserId(req.userId)
        const dailyFacts = await dailyFactService.getAllCurrent(profile._id)
        res.status(200).send({ dailyFacts })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
const deleteOne = async (req, res, next) => {
    try {
        const dailyFactData = {
            userId: req.userId,
            dailyFactId: req.params.dailyFactId
        }
        const result = await dailyFactService.deleteOne(dailyFactData)
        res.status(200).send({ result })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
const changeVote = async (req, res, next) => {
    try {
        const dailyFactData = {
            dailyFactId: req.params.dailyFactId,
            vote: Number(req.body.vote)
        }
        const dailyFact = await dailyFactService.changeVote(dailyFactData)
        res.status(200).send({ dailyFact })
    } catch (err) {
        console.log(err)
        next(err)
    }
}
const dailyFactController = {
    createOne,
    getOne,
    getAll,
    getAllCurrent,
    getToday,
    deleteOne,
    changeVote,
}

module.exports = dailyFactController