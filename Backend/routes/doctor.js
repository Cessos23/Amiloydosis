const router = require('express').Router();
const Joi = require('@hapi/joi');
const doctorModel = require('../models/Doctor');

const schemaDoctor = Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    birthday: Joi.date().required(),
    phone_number: Joi.string().required(),
    personal_number: Joi.string().required(),
    speciality: Joi.string().required(),
    professional_license: Joi.string().required(),
    about: Joi.string().required(),
    education: Joi.string().required(),
    languages: Joi.string().required(),
})

//get all doctors
router.get('/doctors',(req,res) => {
    doctorModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get doctor
router.get('/doctor/:id',(req,res) => {
    const {id} = req.params;
    doctorModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//create doctor
router.post('/add-doctor', async (req,res) => {
    // validaciones
    const { error } = schemaDoctor.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    

    const doctor = doctorModel(req.body);
    doctor.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update doctor
router.put('/edit-doctor/:id',(req,res) => {
    const {id} = req.params;

    const {name,lastname,age,phone_number,personal_number,speciality,professional_license,about,
        education,languages} = req.body;
    const {date_updated} = Date.now;
    doctorModel
    .updateOne({_id:id},{$set:{name,lastname,age,phone_number,personal_number,speciality,
        professional_license,about,education,languages,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})




//delete doctor
router.delete('/doctor/:id',(req,res) => {
    const {id} = req.params;
    doctorModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;