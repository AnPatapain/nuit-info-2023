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
    if (!data.userId) {
        throw new RessourceNotFoundError("userId missing")
    }
    const profile = await profileService.getFromUserId(data.userId)
    if (!data.dailyFactId) {
        throw new RessourceNotFoundError("dailyFactId missing")
    }
    if (!profile) {
        throw new RessourceNotFoundError("no profile with id")
    }
    const dailyFactId = data.dailyFactId
    const dailyFact = await dailyFactDao.findById(data.dailyFactId)
    if (!dailyFact) {
        throw new RessourceNotFoundError("no dailyFact with given id")
    }
    const isUpvote = await dailyFactDao.isUpvote(profile._id, dailyFactId)
    const isDownvote = await dailyFactDao.isDownvote(profile._id, dailyFactId)
    // if (data.vote > 0) {
    //     if (!isUpvote) {
    //         if (isDownvote) {
    //             dailyFact.vote += 2
    //             await dailyFactDao.removeDownvote(profile._id, dailyFactId)
    //         } else {
    //             dailyFact.vote += 1
    //         }
    //         await dailyFactDao.addUpvote(profile._id, dailyFactId)
    //     }
    // }
    // if (data.vote < 0) {
    //     if (!isDownvote) {
    //         if (isUpvote) {
    //             dailyFact.vote -= 2
    //             await dailyFactDao.removeUpvote(profile._id, dailyFactId)
    //         } else {
    //             dailyFact.vote -= 1
    //         }
    //         await dailyFactDao.addDownvote(profile._id, dailyFactId)
    //     }
    // }
    if (data.vote > 0) {
        const isUpvote = await dailyFactDao.isUpvote(profile._id, dailyFactId);

        if (!isUpvote) {
            const isDownvote = await dailyFactDao.isDownvote(profile._id, dailyFactId);

            if (isDownvote) {
                dailyFact.vote += 2;
                await dailyFactDao.removeDownvote(profile._id, dailyFactId);
            } else {
                dailyFact.vote += 1;
            }

            await dailyFactDao.addUpvote(profile._id, dailyFactId);
        }
    }
    if (data.vote < 0) {
        const isDownvote = await dailyFactDao.isDownvote(profile._id, dailyFactId);

        if (!isDownvote) {
            const isUpvote = await dailyFactDao.isUpvote(profile._id, dailyFactId);

            if (isUpvote) {
                dailyFact.vote -= 2;
                await dailyFactDao.removeUpvote(profile._id, dailyFactId);
            } else {
                dailyFact.vote -= 1;
            }

            await dailyFactDao.addDownvote(profile._id, dailyFactId);
        }
    }
    console.log("aftertreat", dailyFact.vote, dailyFact.upVotes, dailyFact.downVotes);
    await dailyFact.save()
    return dailyFact
}
const getPageRandom = async (data) => {
    if (!data.page) {
        throw new RessourceNotFoundError("page missing")
    }
    if (!data.pageSize) {
        throw new RessourceNotFoundError("pageSize missing")
    }
    const dailyFacts = await dailyFactDao.getPageRandom(data.page, data.pageSize)
    return dailyFacts
}
const getPage = async (data) => {
    if (!data.page) {
        throw new RessourceNotFoundError("page missing")
    }
    if (!data.pageSize) {
        throw new RessourceNotFoundError("pageSize missing")
    }
    const dailyFacts = await dailyFactDao.getPage(data.page, data.pageSize)
    return dailyFactDao
}
const dailyFactService = {
    createOne,
    getFromFactId,
    getAll,
    deleteOne,
    getAllCurrent,
    getToday,
    changeVote,
    getPage,
    getPageRandom,
}

module.exports = dailyFactService