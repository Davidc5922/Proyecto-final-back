const {User} = require("../db.js");



const findUserByPk = async (id) => {
   try {
       const user = await User.findByPk(id)
        console.log(user)
       return user
   } catch (e) {
       console.log(e)
   }
}



module.exports = {
    findUserByPk,
}