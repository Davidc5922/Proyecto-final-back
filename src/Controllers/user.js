const {User} = require("../db.js");


const findByName = async (name) => {
    try {
          const user = await User.findAll({where: {username: name}})
              return user;
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
  findByName,
}