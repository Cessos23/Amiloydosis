const router = require('express').Router();
const Joi = require('@hapi/joi');
const User = require('../models/User');

const schemaUserByEmail = Joi.object({
    email: Joi.string().min(6).max(255).required().email(),
    address: Joi.string(),
    phone_number: Joi.string(),
    occupation: Joi.string(),
    marital_status: Joi.string(),
})

router.post('/getUserbyEmail', async (req, res) => {
    // validaciones
    const { error } = schemaUserByEmail.validate(req.body);
    if (error) return res.status(400).json({ error: error.details[0].message })
    
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).json({ error: 'Usuario no encontrado' });

    res.json({
        user : {
            id: user._id,
            name: user.name,
            email: user.email,
            avatar: user.avatar,
            roles: user.role,
            permissions: user.permissions
        }
    })

  
})


//get all users
router.get('/users',(req,res) => {
    User
    .find().then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

//get users
router.get('/user/:id',(req,res) => {
    const {id} = req.params;
    User
    .findById(id).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})

router.put('/edit-user/:id',(req,res) => {
    const {id} = req.params;

    const {email,address,phone_number,occupation,marital_status} = req.body;
    const {date_updated} = Date.now;
    User
    .updateOne({_id:id},{$set:{email,address,phone_number,occupation,marital_status,date_updated}}).
    then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


//delete user
router.delete('/user/:id',(req,res) => {
    const {id} = req.params;
    User
    .deleteOne({_id:id}).then((data) =>  res.json(data)).catch((error) => res.json({message: error}))
})


module.exports = router;