const mongoose = require('mongoose')

const Schema = mongoose.Schema

const ComicsSchema = new Schema({
    name: {
        type: String
    },
    shortDescription: {
        type: String,
        required: [true, 'Short description field is required']
    },
    description: {
        type: String
    },
    tags: {
        type: [String]
    },
    author: {
        type: Schema.Types.ObjectId, ref: 'User',
    },
    isPublished: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
})

const Comics = mongoose.model('Comics', ComicsSchema)

module.exports = Comics
