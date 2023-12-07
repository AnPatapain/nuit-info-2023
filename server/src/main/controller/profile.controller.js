const profileService = require("../service").profileService
const fs = require('fs');

const createOne = async (req, res, next) => {
    try {
        let profileInfo = {
            name: req.body.name || 'NoName',
            github: req.body.github || 'NoGithub',
            techSkills: req.body.techSkills ? req.body.techSkills.split(",") : [],
            image: req?.file?.path ? req.file.path : null,
            userId: req.userId
        }
        const profileData = { ...profileInfo };
        const profile = await profileService.create(profileData)

        res.status(201).send({ profile })
    } catch (err) {
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
        let profile = await profileService.getFromProfileId(req.params.profileId)
        const { userId, ...profileWithoutUserId } = profile.toObject();
        profile = {
            ...profileWithoutUserId,
            email: userId.email,
        };
        // return profile
        res.status(201).send({ profile })
    } catch (err) {
        next(err)
    }
}
const getCurrent = async (req, res, next) => {
    try {
        let profile = await profileService.getFromUserId(req.userId)
        const { userId: user, ...profileWithoutUserId } = profile.toObject();
        console.log(user);
        profile = {
            ...profileWithoutUserId,
            email: user.email,
        };
        res.status(200).json({ profile })
    } catch (err) {
        next(err)
    }
}

const deleteOne = async (req, res, next) => {
    try {
        const profileId = req.params.profileId
        const profile = await profileService.getFromProfileId(profileId)
        console.log(profile.userId._id)
        console.log(req.userId)
        if (!profile.userId._id.equals(req.userId)) {
            return res.status(403).json({ "error": "You are not owner of this profile" })
        }

        const result = await profileService.deleteById(profileId)
        res.status(200).send({ result: result })
    } catch (err) {
        next(err)
    }
}

const updateOne = async (req, res, next) => {
    try {
        let toDeleteProfile = await profileService.getFromUserId(req.userId)

        const profileData = {
            name: req.body.name || '',
            github: req.body.github || '',
            techSkills: req.body.techSkills ? req.body.techSkills.split(",") : [],
            image: req?.file?.path ? req.file.path : null,
            profileId: toDeleteProfile._id
        }

        const profile = await profileService.update(profileData)
        res.status(200).send({ profile: profile })
    } catch (err) {
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

let profileController = {
    createOne,
    getOne,
    getCurrent,
    deleteOne,
    updateOne
}

module.exports = profileController