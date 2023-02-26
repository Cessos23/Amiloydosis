const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const fs = require("fs")
require('dotenv').config()
const cors = require('cors');

const app = express();


//Allow Corcs
app.use(cors());
app.use(express.static('./public'));
app.use(express.static('./backups'));


// capturar body
app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

// Conexión a Base de datos
// Conexión a Base de datos
const uri = `mongodb+srv://${process.env.USER}:${process.env.PASSWORD}@cluster0.q3zkz1e.mongodb.net/${process.env.DBNAME}?retryWrites=true&w=majority`;
mongoose.connect(uri,
    { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log('Base de datos conectada'))
.catch(e => console.log('error db:', e))

// import routes
const authRoutes = require('./routes/auth');
const dashboadRoutes = require('./routes/dashboard');
const userRoutes = require('./routes/user');
const servRoutes = require('./routes/service');
const appointmentRoutes = require('./routes/appointment');
const medicalHistoryRoutes = require('./routes/medical_history');
const controlExamRoutes = require('./routes/control_exam');
const testResultRoutes = require('./routes/test_result');
const clinicalReportRoutes = require('./routes/clinical_report');
const notificationRoutes = require('./routes/notification');
const surveyRoutes = require('./routes/survey');
const contractRoutes = require('./routes/contract');
const answerRoutes = require('./routes/answer');

const patientRoutes = require('./routes/patient');
const doctorRoutes = require('./routes/doctor');

const corcs = require('./corcs');
const verifyToken = require('./routes/validate-token');

// route middlewares

app.use('/api/auth', authRoutes);
app.use('/api/user',verifyToken, userRoutes); //usuario
app.use('/api/service',verifyToken, servRoutes); //servicios
app.use('/api/appointment',verifyToken, appointmentRoutes); //citas
app.use('/api/patient',verifyToken, patientRoutes); //pacientes
app.use('/api/doctor',verifyToken, doctorRoutes); //doctores
app.use('/api/medical_history',verifyToken, medicalHistoryRoutes); //historial
app.use('/api/control_exam',verifyToken, controlExamRoutes); //examenes de control
app.use('/api/test_result',verifyToken, testResultRoutes); //resultado de examenes
app.use('/api/clinical_report',verifyToken, clinicalReportRoutes); //informe clinico
app.use('/api/notification',verifyToken, notificationRoutes); //informe clinico
app.use('/api/survey',verifyToken, surveyRoutes); //encuenta
app.use('/api/contract',verifyToken, contractRoutes); //contrato
app.use('/api/answer',verifyToken, answerRoutes); //Respuesta encuesta


app.get('/', (req, res) => {
    res.json({
        estado: true,
        mensaje: 'funciona!'
    })
});

//generar respaldo
app.get('/api/backup', (req, res) => {
    
    const db = mongoose.connection.db;//conexion a la base de datos
    getDocuments(db, async function(docs,element) {//metodo para obtener datos de la colección
        try {
            const nameFile = element+'.json' //archivos en json
            fs.writeFileSync('./backups/new/'+nameFile+'', JSON.stringify(docs));//guardamos el archivo en la ruta
            res.json({message: true})
        }
        catch(err) {
            console.log('Error writing to file', err)
        }
    });
});
const getDocuments = function(db, callback) {
    
    db.listCollections().toArray(function(err, result) {//obtenemos todas las colecciones
        if (err) throw err; 
        result.forEach(element => {//recorremos todas las colecciones
            db.collection(element.name)//buscamos la coleccion
            .find({})
            .toArray(function(err, result) { 
                if (err) throw err; 
                callback(result,element.name); //obtenemos datos de la coleccion y los mandaamos
            }); 
        });
    });
};

//subir respaldo
app.get('/api/restore_backup', (req, res) => {
    
    const db = mongoose.connection.db;//conexion a la base de datos
    const folder = 'new';//folder donde esta almacenado
    var dir = './backups/'+folder+'/';//folder donde esta almacenado

    readFiles(dir, function(filename, content) {//metodo para leer archivos del folder
        
        const data = fs.readFileSync(dir+filename);
        const docs = JSON.parse(data.toString());
        const collection = filename.replace('.json','');

       db.dropCollection(collection)
        if(docs.length > 0){
            db.collection(collection)//buscamos la coleccion
                .insertMany(docs, function(err, result) {//se insertan los datos obtenidos
                    if (err) throw err;
                    console.log('Inserted docs:', result.insertedCount);
                    res.json({message: true})
            });
        }
    }, function(err) {throw err;});
    res.json({estado: true,mensaje: 'funciona!'})
});
function readFiles(dirname, onFileContent, onError) {
    fs.readdir(dirname, function(err, filenames) {//leemos los archivos
      if (err) {onError(err);return;}
      filenames.forEach(function(filename) {//recorremos los archivos
        fs.readFile(dirname + filename, 'utf-8', function(err, content) {//lee archivo y obtiene datos
          if (err) {onError(err);return;}
          onFileContent(filename, content);//manda los archivos
        });
      });
    });
  }

// iniciar server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`servidor andando en: ${PORT}`)
})