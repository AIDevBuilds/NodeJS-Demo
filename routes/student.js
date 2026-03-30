const express = require('express')
const Joi = require('joi')

const router = express.Router()

const Student = require('../models/student')

// Get a list of students from the database
router.get('/', (req, res, next) => {
    Student.find({}).then((students) => {
        res.send(students)
    }).catch(next)
})

// Get a student from the database
router.get('/:id', (req, res, next) => {
    Student.findOne({_id: req.params.id}).then((students) => {
        res.send(students)
    }).catch(next)
})

// add a new student to database
router.post('/', (req, res, next) => {
    const {error} = validateStudent(req.body)

    if (error) {
        return res.status(400).send({
            type: error.name,
            message: error.message
        })
    }

    Student.create(req.body).then((student) => {
        res.send(student)
    }).catch(next)
})

// update a student in the database
router.put('/:id', (req, res, next) => {
    // Lookup for the student
    // if not exist return  404
    Student.findOne({_id: req.params.id}).then((student) => {
        if (!student) {
            return res.status(404).send({
                type: 'Data Validation',
                message: 'The student with the given ID was not found.'
            })
        }
    }).catch(next)

    console.log('Testing the logic')

    // Validate
    // If invalid return 400 - Bad request

    const {error} = validateStudent(req.body)

    if (error) {
        res.status(400).send({
            type: error.name,
            message: error.message
        })
        return
    }

    // Update student
    // Return the update student
    Student.findOneAndUpdate({_id: req.params.id}, req.body).then((student) => {
        res.send(student)
    }).catch(next)
})

// delete a student in the database
router.delete('/:id', (req, res, next) => {

    // Lookup the student
    // Not existing 404 - Not found

    // Delete

    // Return the same course
    Student.findOneAndDelete({_id: req.params.id}).then((student) => {
        res.send(student)
    }).catch(next)
})


const validateStudent = (student) => {
    const schema = Joi.object({
        name: Joi.string().min(3).required(),
        roll: Joi.string().min(5).required()
    })
    
    return schema.validate(student)
}

// router.route('/')
// .get((req, res) => {

// })
// .post((req, res) => {

// })





module.exports = router