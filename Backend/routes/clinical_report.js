const router = require('express').Router();
const Joi = require('@hapi/joi');
const clinicalReportModel = require('../models/Clinical_Report');


const schemaClinicalReport = Joi.object({
    id_paciente: Joi.string().min(5).max(255).required(),
    fullname: Joi.required(),
    temperature: Joi.required(),
    blood_pressure: Joi.required(),
    glucose: Joi.required(),
    weight: Joi.required(),
    hospital_data: Joi.string().required(),
    reason_medical: Joi.string().required(),
    past_appointment: Joi.string().required(),
    analysis: Joi.string().required(),
    recommendations: Joi.string().required(),
    infusion: Joi.string().required(),

})

//get all historial
router.get('/clinical_report',(req,res) => {
    clinicalReportModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//ge historial
router.get('/clinical_report/:id',(req,res) => {
    const {id} = req.params;
    clinicalReportModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//create historial
router.post('/add-clinicalreport', async (req,res) => {


    // validaciones
    const { error } = schemaClinicalReport.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const historialFind = await clinicalReportModel.findOne({ id_paciente: req.body.id_paciente });
    //if (historialFind) return res.status(400).json({ error: 'No se puede agregar el mismo historial medico' });

    const historial = clinicalReportModel(req.body);
    historial.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//update historial
router.put('/edit-clinicalreport/:id',(req,res) => {
    const {id} = req.params;
    const {id_paciente,fullname,temperature,blood_pressure,
        glucose, 
        weight,hospital_data,
        reason_medical,past_appointment,analysis,recommendations,infusion
    } = req.body;
    const {date_updated} = Date.now;
    clinicalReportModel
    .updateOne({_id:id},{$set:{id_paciente,fullname,temperature,blood_pressure,
        glucose, 
        weight,hospital_data,
        reason_medical,past_appointment,analysis,recommendations,infusion,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})



//delete historial
router.delete('/clinical_report/:id',(req,res) => {
    const {id} = req.params;
    clinicalReportModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





module.exports = router;