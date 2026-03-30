const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create Profile schema & model
const ProfileSchema = new Schema({
    image: {
        type: String,
    },
    role: {
        type: String,
        enum: ['ADMIN', 'EDITOR', 'WRITER', 'READER'],
        default: 'READER',
    }
})

const Profile = mongoose.model('Profile', ProfileSchema)

module.exports = Profile