const express = require('express')
const router = express.Router()

const controller = require('../controllers/UserController')

const Profile = require('../models/Profile')
const User = require('../models/User')


// Get a list of users from the database
router.get('/', controller.get)

router.get('/:id', (req, res, next) => {
    User.findOne({_id: req.params.id}).populate('profile').select('-password').then((users) => {
        res.send(users)
    }).catch(next)
})

// add a new user to database
router.post('/', async (req, res, next) => {
    const isNewUser = await User.isThisEmailInUse(req.body.email)

    if(!isNewUser) {
        res.send({errorMessage: 'This email is already in use, try sign-in'})
    } else {

        Profile.create(req.body.profile).then((profile) => {
            const user = new User(req.body)

            user.profile = profile
            
            user.save().then(usr => {
                
                const jsobject = usr.toJSON()

                delete jsobject['password']

                res.send(jsobject)
            }).catch(next)

        }).catch(next)
    }
})

module.exports = router