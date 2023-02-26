const router = require('express').Router();
const Joi = require('@hapi/joi');
const surveyModel = require('../models/Survey');

const schemaSurvey = Joi.object({
    id_paciente: Joi.string().min(5).max(255).required(),
    fullname: Joi.required(),
    questions: Joi.required(),

})

//get all control exam
router.get('/surveys',(req,res) => {
    surveyModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//ge control exam
router.get('/survey/:id',(req,res) => {
    const {id} = req.params;
    surveyModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//create control exam
router.post('/add-survey', async (req,res) => {


    // validaciones
    const { error } = schemaSurvey.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const historialFind = await surveyModel.findOne({ id_paciente: req.body.id_paciente });
    //if (historialFind) return res.status(400).json({ error: 'No se puede agregar el mismo historial medico' });

    const historial = surveyModel(req.body);
    historial.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update historial
router.put('/edit-survey/:id',(req,res) => {
    const {id} = req.params;
    const {id_paciente,fullname,questions
    } = req.body;
    const {date_updated} = Date.now;
    surveyModel
    .updateOne({_id:id},{$set:{id_paciente,fullname,questions,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete historial
router.delete('/survey/:id',(req,res) => {
    const {id} = req.params;
    surveyModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;