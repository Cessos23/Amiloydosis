const router = require('express').Router();
const Joi = require('@hapi/joi');
const patientModel = require('../models/Patient');

const schemaPatient = Joi.object({
    name: Joi.string().required(),
    lastname: Joi.string().required(),
    phone_number: Joi.string(),
    email: Joi.string(),
    status: Joi.string(),
    age: Joi.required(),
    sex: Joi.string(),
    description_status: Joi.string(),
    birthday: Joi.date().required(),
    allergies: Joi.string().required(),
    weight: Joi.number(),
    size: Joi.number(),
    temperature: Joi.number(),
    heart_rate: Joi.number(),
    breathing_frequency: Joi.number(),
    blood_pressure: Joi.number(),
    oxygen_saturation: Joi.number(),
})

//get all patients
router.get('/patients',(req,res) => {
    patientModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get patient
router.get('/patient/:id',(req,res) => {
    const {id} = req.params;
    patientModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//create patient
router.post('/add-patient', async (req,res) => {
    // validaciones
    const { error } = schemaPatient.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    

    const patient = patientModel(req.body);
    patient.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update patient
router.put('/edit-patient/:id',(req,res) => {
    const {id} = req.params;

    const {name,lastname,age,sex,allergies,email,status,description_status,weight,size,temperature,heart_rate,
        breathing_frequency,blood_pressure,oxygen_saturation} = req.body;
    const {date_updated} = Date.now;
    patientModel
    .updateOne({_id:id},{$set:{name,lastname,age,sex,allergies,email,status,description_status,weight,size,temperature,heart_rate,
        breathing_frequency,blood_pressure,oxygen_saturation,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete patient
// router.delete('/patient/:id',(req,res) => {
//     const {id} = req.params;
//     patientModel
//     .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
// })


//delete patient
router.delete('/patient/:id',(req,res) => {
    const {id} = req.params;
    patientModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;