const router = require('express').Router();
const Joi = require('@hapi/joi');
const ControlExamModel = require('../models/Control_Exam');

const schemaControl = Joi.object({
    id_paciente: Joi.string().min(5).max(255).required(),
    fullname: Joi.required(),
    exam: Joi.string().min(1).max(255).required(),
    date_exam: Joi.date().required()

})

//get all control exam
router.get('/control_exam',(req,res) => {
    ControlExamModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//ge control exam
router.get('/control_exam/:id',(req,res) => {
    const {id} = req.params;
    ControlExamModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//create control exam
router.post('/add-controlexam', async (req,res) => {


    // validaciones
    const { error } = schemaControl.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    const historial = ControlExamModel(req.body);
    historial.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update historial
router.put('/edit-controlexam/:id',(req,res) => {
    const {id} = req.params;
    const {id_paciente,fullname,exam,date_exam
    } = req.body;
    const {date_updated} = Date.now;
    ControlExamModel
    .updateOne({_id:id},{$set:{id_paciente,fullname,exam,date_exam,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete historial
router.delete('/control_exam/:id',(req,res) => {
    const {id} = req.params;
    ControlExamModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;