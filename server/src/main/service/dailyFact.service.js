const RessourceNotFoundError = require("../errors/RessourceNotFoundError")
const cloudinaryService = require("./cloudinary.service")

const dailyFactDao = require("../repository").dailyFactDAO
const profileDao = require("../repository").profileDAO

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
        throw new Error("you already create a FACTOS in the previous 24h")
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
const deleteOne = async (dailyFactId) => {
    if (!dailyFactId) {
        throw new RessourceNotFoundError("dailyFactId missing")
    }
    const dailyFact = await dailyFactDao.findById(dailyFactId)
    if (!dailyFact) {
        throw new RessourceNotFoundError("no dailyFact with given id")
    }
    if (dailyFact.image) {
        const public_id = cloudinaryService.getPublicIdFromUrl(dailyFact.image)
        await cloudinaryService.deleteImage(public_id)
    }
    return await dailyFactDao.deleteById(dailyFactId)
}
const dailyFactService = {
    createOne,
    getFromFactId,
    getAll,
    deleteOne,
    getAllCurrent,
    getToday
}

module.exports = dailyFactService