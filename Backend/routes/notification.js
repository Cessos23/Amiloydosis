const router = require('express').Router();
const Joi = require('@hapi/joi');
const patientModel = require('../models/Patient');
const nodemailer = require("nodemailer");/// libreria para poder enviar correos 


const mailUser ={
  user:'447a820fd831f9',// usuario del servicio de mail
  pass:'56a2bc30189568' // contraseña del servicio de mail
}

router.post("/sendmail_appointment", (req, res) => {
  let transporter = nodemailer.createTransport({
        host: "sandbox.smtp.mailtrap.io",//host del servidor de correos
        port: '587',
        secure: false,
        auth: mailUser,
  });

  return transporter.sendMail({//enviamos el mail
    from: ''+req.body.emailfrom+'',
    to: ''+req.body.email+'',
    subject: 'Servicio de: '+req.body.servicio+' Fecha y hora: '+req.body.fecha+'',
    html:`<h1>Estimado/a: `+req.body.name+` <br>Este es un recordatorio para asistir a su servicio de `+req.body.servicio+`</h1>
      <h2>con la siguiente fecha `+req.body.fecha+`</h2>`
  },(error,info)=>{
    if(error) res.status(200).send({ success: false, error:error});
    return res.status(200).send({
        success: true,
        message: 'email sent'
    })
  })

});

router.post("/sendmail_controlexam", (req, res) => {
      let transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: '587',
            secure: false,
            auth: mailUser,
      });
    
      return transporter.sendMail({//enviamos el mail
        from: ''+req.body.emailfrom+'',
        to: ''+req.body.email+'',
        subject: 'Recordatorio de examen de control: '+req.body.exam+'',
        html:`<h1>Estimado/a: `+req.body.name+`<br>  Este es un recordatorio para realizarse su examen de control `+req.body.exam+`</h1>`
      },(error,info)=>{
        if(error) res.status(200).send({ success: false, error:error});
        return res.status(200).send({
            success: true,
            message: 'email sent'
        })
      })
    
});

router.post("/sendmail_user", (req, res) => {
      let transporter = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: '587',
            secure: false,
            auth: mailUser,
      });
    
      return transporter.sendMail({//enviamos el mail
        from: ''+req.body.emailfrom+'',
        to: ''+req.body.email+'',
        subject: 'Feliz Cumpleaños '+req.body.name+' !',
        html:`<h1>Estimado/a: `+req.body.name+`<br>  Hoy `+req.body.fecha+`, te deseamos un feliz cumpleaños</h1>
        <h2>¡Muchos años de vida, siempre feliz y con mucha salud, paz y amor!
         A usted en particular, cliente y amigo que nos brindó su presencia, le deseamos un feliz cumpleaños.</h2>`
      },(error,info)=>{
        if(error) res.status(200).send({ success: false, error:error});
        return res.status(200).send({
            success: true,
            message: 'email sent'
        })
      })
    
});




module.exports = router;