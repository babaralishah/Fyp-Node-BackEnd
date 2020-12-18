const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    files: [{
        name: String,
        url: String

    }],
    createdAt: {
        type: Date,
        default: Date.now(),
        select: false,
    },
});
const User = mongoose.model('User', UserSchema);
module.exports = User;