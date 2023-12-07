const dailyFactService = require("../service").dailyFactService
const profileService = require("../service").profileService
const fs = require('fs')
const { dailyFactDAO } = require("../repository")


const createOne = async (req, res, next) => {
    try {
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
        const profile = await profileService.getFromUserId(req.userId)
        const dailyFactId = await req.params.dailyFactId
        const dailyFact = await dailyFactService.getFromFactId(dailyFactId)
        if (!dailyFact.profileId._id.equals(profile._id)) {
            return res.status(403).json({ "error": "you are not owner of this fact" })
        }
        const result = await dailyFactService.deleteOne(dailyFactId)
        res.status(200).send({ result })
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
}

module.exports = dailyFactController