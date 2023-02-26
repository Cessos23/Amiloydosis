const router = require('express').Router();
const Joi = require('@hapi/joi');
const historialModel = require('../models/Medical_History');

const schemaHistorial = Joi.object({
    id_paciente: Joi.string().min(5).max(255).required(),
    fullname: Joi.required(),
    sex: Joi.string().min(1).max(100).required(),
    occupation: Joi.string().min(6).max(255).required(),
    current_discomforts: Joi.string().required(),
    family_history: Joi.string().required(),
    personal_history: Joi.string().required(),
    physiological_habits: Joi.string().required(),

})

//get all historial
router.get('/medical_history',(req,res) => {
    historialModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//ge historial
router.get('/medical_history/:id',(req,res) => {
    const {id} = req.params;
    historialModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//create historial
router.post('/add-medicalhistory', async (req,res) => {


    // validaciones
    const { error } = schemaHistorial.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    const historial = historialModel(req.body);
    historial.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update historial
router.put('/edit-medicalhistory/:id',(req,res) => {
    const {id} = req.params;
    const {id_paciente,fullname,sex,occupation,
        current_discomforts, 
        family_history,personal_history,
        physiological_habits
    } = req.body;
    const {date_updated} = Date.now;
    historialModel
    .updateOne({_id:id},{$set:{id_paciente,fullname,sex,occupation,
        current_discomforts, 
        family_history,personal_history,
        physiological_habits,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete historial
router.delete('/medical_history/:id',(req,res) => {
    const {id} = req.params;
    historialModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;