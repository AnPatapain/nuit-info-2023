const db = require("../model/")
const User = db.user
const Profile = db.profile
const DailyFact = db.dailyFact

const create = async (image, name, userId) => {

    const newProfile = new Profile({
        image: image,
        name: name,
        userId: userId,
        dailyFacts: [],
        comments: [],
        notificationSend: [],
        notificationReceived: [],
    })

    const user = await User.findById(userId)
    user.profileId = newProfile._id
    await user.save()
    await newProfile.save()
    return newProfile
}

let findByName = async (name) => {
    return Profile.findOne({ name: name })
}
let findById = async (id) => {
    return Profile.findById(id).populate('userId', 'email');
}

const getAll = async () => {
    return Profile.find();
}

const deleteById = async (id) => {
    // Remove the profile from the database
    const result = await Profile.findByIdAndRemove(id);

    // Optionally, you might want to update the corresponding user's profileId
    if (result && result.userId) {
        const user = await User.findById(result.userId);
        if (user) {
            user.profileId = null;
            await user.save();
        }
    }
    return result;
}
const updateById = async (id, updates) => {
    // Use findByIdAndUpdate to update the profile
    // Set { new: true } to return the updated profile
    const profile = await Profile.findByIdAndUpdate(id, updates, { new: true });
    await profile.save()
    return profile
}
const deleteAll = async () => {
    // Delete all profiles from the database
    const result = await Profile.deleteMany({});

    // Optionally, you might want to update the corresponding users' profileIds
    if (result && result.deletedCount > 0) {
        const userIds = result.deletedIds.map(profile => profile.userId);
        const users = await User.find({ _id: { $in: userIds } });

        for (const user of users) {
            user.profileId = null;
            await user.save();
        }
    }
    return result;
};
const addDailyFact = async (profileId, dailyFactId) => {
    const profile = await Profile.findById(profileId)
    if (!profile) {
        throw new Error(`Profile with ID ${profileId} not found`);
    }
    await profile.dailyFacts.push(dailyFactId)
    await profile.save()
}
const removeDailyFact = async (profileId, dailyFactId) => {
    const profile = await Profile.findById(profileId);

    if (!profile) {
        throw new Error(`Profile with ID ${profileId} not found`);
    }
    // Remove the DailyFact by ID from the dailyFacts array
    await profile.dailyFacts.pull(dailyFactId);
    // Save the updated profile
    await profile.save();
}


let profileDAO = {
    getAll,
    create,
    findByName,
    findById,
    deleteById,
    updateById,
    deleteAll,
    addDailyFact,
    removeDailyFact,
}


module.exports = profileDAO