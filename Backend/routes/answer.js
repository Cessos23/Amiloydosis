const router = require('express').Router();
const Joi = require('@hapi/joi');
const answerModel = require('../models/Answer');

const schemaAnswer = Joi.object({
    id_survey: Joi.string().min(5).max(255).required(),
    fullname: Joi.string().min(5).max(255).required(),
    answers: Joi.required(),

})

//get all control exam
router.get('/answers',(req,res) => {
    answerModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get answer specific
router.get('/answer/:id',(req,res) => { //buscamos por id y obtenemos uno
    const {id} = req.params;
    answerModel
    .findById(id).then((data) => console.log(data) ).catch((error) => res.json({message: error}))
})


//create answers
router.post('/add-answer', async (req,res) => { //creamos las respuestas


    // validaciones
    const { error } = schemaAnswer.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const historialFind = await answerModel.findOne({ id_paciente: req.body.id_paciente });

    const historial = answerModel(req.body);
    historial.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update answer
router.put('/edit-answer/:id',(req,res) => { // actualizamos la respuesta
    const {id} = req.params;
    const {id_survey,answers
    } = req.body;
    const {date_updated} = Date.now;
    answerModel
    .updateOne({_id:id},{$set:{id_survey,answers,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete answer
router.delete('/answer/:id',(req,res) => { //eliminnamos la pregunta
    const {id} = req.params;
    answerModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;