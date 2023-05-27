import mongoose from "../database/db";

const Schema = mongoose.Schema

const Users = new Schema({
    username: {
        type: String
    },
    password: {
        type: String
    },
    isLoggedIn: {
        type: Boolean,
        default: false
    }
})

export = mongoose.model("Users",Users)