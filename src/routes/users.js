const { Router } = require('express');
const router = Router()
const {User} = require("../db")

router.post('*', async (req, res,next) => {
    let {
        name,
        surname,
        age,
        email,
        password,
        location
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
        location
    })
    
    res.status(200).send("usuario creado") 
    } catch (e) {
        next(e);
    }
})

module.exports = router