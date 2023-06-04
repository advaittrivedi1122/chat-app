
import mongoose from "../database/db";

const Schema = mongoose.Schema;

const messages = new Schema({
    from: {
        type: String
    },
    to: {
        type: String
    },
    message: {
        type: String
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

export = mongoose.model("Messages",messages);