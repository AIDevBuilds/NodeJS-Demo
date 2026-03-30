const mongoose = require('mongoose')

const Schema = mongoose.Schema

// Create users schema & model
const UserSchema = new Schema({
    name: {
        type: String,
        unique: true
    },
    email: {
        type: String,
        required: [true, 'Email field is required'],
    },
    password: {
        type: String,
        required: [true, 'Password field is required'],
    },
    mobile: {
        type: String,
    },
    isEmailVerified: {
        type: Boolean,
        default: false,
    },
    isMobileVerified: {
        type: Boolean,
        default: false,
    },
    profile: {
        type: Schema.Types.ObjectId, ref: 'Profile',
    },
})

UserSchema.statics.isThisEmailInUse = async function (email) {
    if (!email) throw new Error('Invalid Email')
    try {
        const user = await this.findOne({email})

        if(user) return false
        
        return true
    } catch (error) {
        console.log('Error inside the isThisEmailInUse method', error.message);
        return false
    }
}

const User = mongoose.model('User', UserSchema)

module.exports = User
