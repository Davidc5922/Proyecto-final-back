const {Product,Category} = require("../db")

const filterByCategory = async (category) => {
//  try {
//      const categoryId = await Category.findOne({
//          where: {name : category},
//          include:[{
//             attributes: ["name"],
//             through: {
//               attributes: [],
//             },
//        }]
//      })
//     console.log(categoryId)

//  } catch (e) {
    
//  }
}

const filterByGenre = async (genre) => {
   try {
        const allInfo = await Product.findAll();
        const FilerByGenre = allInfo.filter(e => e.genre===genre)
        return FilerByGenre
   } catch (e) {
       console.log(e)
   }
}

module.exports = {
    filterByGenre,
    filterByCategory
}