const router = require('express').Router();
const Joi = require('@hapi/joi');
const contractModel = require('../models/Contract');

const schemaContract = Joi.object({
    title: Joi.string().required(),
    protocol_number: Joi.required(),
    doctor_name: Joi.required(),
    hospital_name: Joi.string().required(),
    description_protocol: Joi.string().required(),
    clauses: Joi.string().required(),
    date_start: Joi.required(),
    date_end: Joi.required(),
    fullname_patient: Joi.string().required(),
    signature_patient: Joi.string().required(),
    fullname_witnessone: Joi.string().required(),
    signature_witnessone: Joi.string().required(),
    fullname_witnesstwo: Joi.string().required(),
    signature_witnesstwo: Joi.string().required(),
})

//get all doctors
router.get('/contracts',(req,res) => {
    contractModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get doctor
router.get('/contract/:id',(req,res) => {
    const {id} = req.params;
    contractModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//create doctor
router.post('/add-contract', async (req,res) => {
    // validaciones
    const { error } = schemaContract.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    

    const doctor = contractModel(req.body);
    doctor.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update doctor
router.put('/edit-contract/:id',(req,res) => {
    const {id} = req.params;

    const {title,protocol_number,doctor_name,hospital_name,description_protocol,clauses,date_start,date_end,
        fullname_patient,signature_patient,fullname_witnessone,signature_witnessone
        ,fullname_witnesstwo,signature_witnesstwo} = req.body;
    const {date_updated} = Date.now;
    contractModel
    .updateOne({_id:id},{$set:{title,protocol_number,doctor_name,hospital_name,description_protocol,clauses,
        date_start,date_end,fullname_patient,signature_patient,fullname_witnessone,signature_witnessone
            ,fullname_witnesstwo,signature_witnesstwo,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})




//delete doctor
router.delete('/contract/:id',(req,res) => {
    const {id} = req.params;
    contractModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;