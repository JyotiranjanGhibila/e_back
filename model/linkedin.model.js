const { mongoose } = require("../config/db");
const linkedinSchema = mongoose.Schema({
    title: String,
    body: String,
    device: String,
    no_if_comments: Number,
});

const LinkedinModel = mongoose.model("linkd", linkedinSchema);

module.exports = { LinkedinModel };