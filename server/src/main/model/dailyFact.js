const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const commentSchema = new mongoose.Schema({
    profileId: { type: Schema.Types.ObjectId, ref: 'Profile', require: true },
    content: { type: String, required: true },
    timeStamp: { type: Date, required: true }
});


const dailyFactSchema = new mongoose.Schema({
    profileId: { type: Schema.Types.ObjectId, ref: 'Profile', require: true },
    vote: { type: Number, default: 0 },
    comments: [commentSchema],
    title: { type: String, required: true },
    fact: { type: String, required: true },
    image: { type: String, required: true }, // Assuming the image is stored as a URL or file path
    timeStamp: { type: Date, required: true } // Added timestamp field
});

const DailyFact = mongoose.model('DailyFact', dailyFactSchema);

const Comment = mongoose.model('Comment', commentSchema)

module.exports = {
    DailyFact,
    Comment,
}
