const router = require('express').Router();
const Joi = require('@hapi/joi');
const testResultModel = require('../models/Test_Result');
const multer  = require('multer'); //generate files library
const fs = require("fs")//upload files library

const schemaControl = Joi.object({
    id_paciente: Joi.string().min(5).max(255).required(),
    fullname: Joi.required(),
    namefile: Joi.string().min(1).max(255).required(),
    date_exam: Joi.date().required()

})

//get all control exam
router.get('/test_results',(req,res) => {
    testResultModel
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//ge control exam
router.get('/test_result/:id',(req,res) => {
    const {id} = req.params;
    testResultModel
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})





//delete historial
router.delete('/test_result/:id',(req,res) => {
    const {id} = req.params;
    testResultModel
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


// Save file to server storage
const storage = multer.diskStorage({//creamos las condiciones del archivo
    filename: function (res, file, cb) {
      const fileName = file.originalname; //obtenemos el nombre del archivo
      cb(null, `${fileName}`); //enviara al post
    },
    destination: function (res, file, cb) {
      cb(null, './public');
    },
  });
  
  const upload = multer({ storage:storage });


  
// post data
router.post("/add-testresult", upload.single("namefile"), (req, res) => {//almacena el archivo
  const file = req.file.filename;
  console.log(file)
    console.log(req.body.id_paciente)
    const body ={
      id_paciente: req.body.id_paciente,
      fullname: req.body.fullname,
      namefile: file
    }
    const historial = testResultModel(body);
    historial.save().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
  });

  //update historial
router.put('/edit-testresult/:id',upload.single("namefile"),(req,res) => {
  const {id} = req.params;
  const {id_paciente,fullname,date_exam
  } = req.body;
  const namefile = req.file.filename;
  const file = req.file.filename;
  const pathToFile = './public/'+req.body.namefilepast+''
  fs.exists(pathToFile, function(exists) { //verificamos si existe el archivo
    if (exists) { 
      // ...
     

    fs.unlink(pathToFile, function(err) {//eliminamos si existe
      if (err) {
        throw err
      } else {//subimos el nuevo archivo
        const {date_updated} = Date.now;
        testResultModel
        .updateOne({_id:id},{$set:{id_paciente,fullname,date_exam,namefile,date_updated}}).
        then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
      }
    })
    }else{//sube el archivo
      const {date_updated} = Date.now;
      testResultModel
      .updateOne({_id:id},{$set:{id_paciente,fullname,date_exam,namefile,date_updated}}).
      then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
    }
  });

})


module.exports = router;