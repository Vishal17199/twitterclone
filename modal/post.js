const mongoose = require('mongoose')

//a mongoose scheme for posts
const postSchema = new mongoose.Schema({
    title: {
        required: true,
        type: String
    },
    name: {
        required: true,
        type: String
    },
    email: {
        required: true,
        type: String
    },
    pic: {
        required: true,
        type: String
    },
    likes: [
        {
            type: String
        }
    ],

}, { timestamps: true })

mongoose.model("Post", postSchema)