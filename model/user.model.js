const { mongoose } = require("../config/db");

const userSchema = mongoose.Schema({
    name: String,
    email: String,
    gender: String,
    password: String,
    age: Number,
    city: String,
});



const UserModel = mongoose.model("linkeduser", userSchema);

module.exports = { UserModel };