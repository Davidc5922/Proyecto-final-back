const {Product,Category} = require("../db")

const filterByCategory = async (category) => {
 try {
     const Id = await Category.findOne({
         where: {name : category},
     })
     console.log(Id.id)
     const allInfo = await Product.findAll();
     const filterByCategory = allInfo.filter(el => el.categoryId === Id.id)
 
    
    return filterByCategory;
 } catch (e) {
    
 }
}

const filterByGenre = async (genre) => {
   try {
        const allInfo = await Product.findAll();
        const FilerByGenre = allInfo.filter(e => e.genre === genre)
        return FilerByGenre
   } catch (e) {
       console.log(e)
   }
}

module.exports = {
    filterByGenre,
    filterByCategory
}