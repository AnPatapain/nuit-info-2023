const DailyFactError = require("../errors/DailyFactError")
const RessourceNotFoundError = require("../errors/RessourceNotFoundError")
const cloudinaryService = require("./cloudinary.service")

const dailyFactDao = require("../repository").dailyFactDAO
const profileDao = require("../repository").profileDAO

const profileService = require("./profile.service")

const { DEFAULT_FACT_IMAGE } = process.env

const createOne = async (data) => {
    if (!data.fact || !data.profileId || !data.title) {
        throw new RessourceNotFoundError("Missing details for creating dailyFact");
    }
    if (!data.image) {
        data.image = DEFAULT_FACT_IMAGE
    }
    const todayDailyFact = await getToday(data.profileId)
    if (todayDailyFact.length > 0) {
        throw new DailyFactError("you already create a FACTOS in the previous 24h")
    }
    const { public_id, url: cloudinaryImgUrl } = await cloudinaryService.uploadImage(data.image)
    data = { ...data, image: cloudinaryImgUrl }
    const newDailyFact = await dailyFactDao.createOne(data)
    await profileDao.addDailyFact(data.profileId, newDailyFact._id)
    return newDailyFact
}

const getFromFactId = async (dailyFactId) => {
    if (!dailyFactId) {
        throw new RessourceNotFoundError("dailyFactId missing")
    }
    return await dailyFactDao.findById(dailyFactId)
}

const getAll = async () => {
    return await dailyFactDao.getAll()
}

const getAllCurrent = async (profileId) => {
    const profile = await profileDao.findById(profileId)
    const dailyFactIds = profile.dailyFacts
    const dailyFactsPromises = dailyFactIds.map((factId) => getFromFactId(factId._id));
    return Promise.all(dailyFactsPromises)
}
const getToday = async (profileId) => {
    const profile = await profileDao.findById(profileId)
    const dailyFactIds = profile.dailyFacts.map((factId) => factId._id)
    const dailyFact = await dailyFactDao.getToday(dailyFactIds)
    return dailyFact
}
const deleteOne = async (data) => {
    if (!data.userId || !data.dailyFactId) {
        throw new RessourceNotFoundError("dailyFact deleteOne req missing")
    }
    const profile = await profileService.getFromUserId(data.userId)
    const dailyFactId = await data.dailyFactId
    const dailyFact = await getFromFactId(dailyFactId)
    if (!dailyFact.profileId._id.equals(profile._id)) {
        return res.status(403).json({ "error": "you are not owner of this fact" })
    }
    if (dailyFact.image) {
        const public_id = cloudinaryService.getPublicIdFromUrl(dailyFact.image)
        await cloudinaryService.deleteImage(public_id)
    }
    await profileDao.removeDailyFact(profile._id, dailyFactId)
    return await dailyFactDao.deleteById(dailyFactId)
}

const changeVote = async (data) => {
    console.log(data);
    if (!data.dailyFactId) {
        throw new RessourceNotFoundError("dailyFactId missing")
    }
    const dailyFact = await dailyFactDao.findById(data.dailyFactId)
    if (!dailyFact) {
        throw new RessourceNotFoundError("no dailyFact with given id")
    }
    dailyFact.vote += data.vote
    await dailyFact.save()
    return dailyFact
}
const dailyFactService = {
    createOne,
    getFromFactId,
    getAll,
    deleteOne,
    getAllCurrent,
    getToday,
    changeVote,
}

module.exports = dailyFactService