const User = require('../models/User')

module.exports = {
    get: (req, res, next) => {
        User.find({}).populate('profile').select('-password').then((users) => {
            res.send(users)
        }).catch(next)
    },
}