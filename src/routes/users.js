const { Router } = require('express');

const { findUserByPk } = require('../Controllers/user');
const router = Router()
const {User} = require("../db")

router.post('/post', async (req, res,next) => {
    let {
        name,
        surname,
        age,
        email,
        password,
        location,
    } = req.body

    try {
       // let height=`${heightMin}-${heightMax}`
    // let weight=`${weightMin}-${weightMax}`
    let UserCreated = await User.create({
        name,
        surname,
        age,
        email,
        password,
        location,
    })
    res.status(200).send("usuario creado") 
    } catch (e) {
        next(e);
    }
})

router.put("/ban/:id", async (req,res)=>{
 try {
     const {id} = req.params;
     console.log(id)
     let user = await User.findByPk(id);
     await user.update({
         ...user,
         ban: user.ban === false? true : false,
     })
     res.send(user)
 } catch (e) {
     res.status(400).send(e)
 }
})

module.exports = router