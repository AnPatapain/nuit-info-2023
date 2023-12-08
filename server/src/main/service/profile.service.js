const ProfileError = require("../errors/ProfileError")
const RessourceNotFoundError = require("../errors/RessourceNotFoundError")
const cloudinaryService = require("./cloudinary.service")



const profileDao = require("../repository").profileDAO
const userDao = require("../repository").userDAO

const { DEFAULT_PROFILE_IMAGE } = process.env
const create = async (data) => {
    const user = await userDao.findById(data.userId)
    if (user.profileId) {
        throw new ProfileError("Already have profile")

    }
    if (!data.name || !data.userId) {
        throw new RessourceNotFoundError("Missing details for creating profile");
    }
    if (!data.image) {
        data.image = DEFAULT_PROFILE_IMAGE
    }
    const { public_id, url: cloudinaryImgUrl } = await cloudinaryService.uploadImage(data.image)
    data = { ...data, image: cloudinaryImgUrl }
    return await profileDao.create(data.image, data.name, data.userId)
}

const getFromUserId = async (userId) => {
    if (!userId) {
        throw new RessourceNotFoundError("userId missing")
    }
    const user = await userDao.findById(userId)
    return await profileDao.findById(user.profileId)
}
const getFromProfileId = async (profileId) => {
    if (!profileId) {
        throw new RessourceNotFoundError("profileId missing")
    }
    return await profileDao.findById(profileId)
}
const deleteById = async (profileId) => {
    // the profile that need to be deleted
    const profile = await profileDao.findById(profileId)

    if (profile.image) {
        const public_id = cloudinaryService.getPublicIdFromUrl(profile.image)
        await cloudinaryService.deleteImage(public_id)
    }

    // Delete the profile
    return await profileDao.deleteById(profileId)
}
const update = async (data) => {
    if (!data.profileId) {
        throw new RessourceNotFoundError("req.body.profileId missing for updateProfile")
    }
    const profileUpdate = {}
    if (data.name) {
        profileUpdate.name = data.name;
    }
    if (data.image) {
        profileUpdate.image = data.image;
    }
    if (profileUpdate.image) {
        const { public_id, url: cloudinaryImgUrl } = await cloudinaryService.uploadImage(profileUpdate.image)
        profileUpdate.image = cloudinaryImgUrl
        const oldProfile = await profileDao.findById(data.profileId)
        const oldImageId = cloudinaryService.getPublicIdFromUrl(oldProfile.image)
        await cloudinaryService.deleteImage(oldImageId)
    }

    return await profileDao.updateById(data.profileId, profileUpdate)
}

const deleteAll = async () => {
    const allProfiles = await profileDao.getAll();

    // Extract image URLs from profiles
    const profileImageUrls = allProfiles.map(profile => profile.image);

    // Delete all images from Cloudinary
    for (const imageUrl of profileImageUrls) {
        const publicId = cloudinaryService.getPublicIdFromUrl(imageUrl);
        await cloudinaryService.deleteImage(publicId);
    }
    await profileDao.deleteAll()
}
const profileService = {
    create,
    getFromUserId,
    deleteById,
    update,
    deleteAll,
    getFromProfileId
}
module.exports = profileService
