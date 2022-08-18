const {Product} = require("../db")

const filterByCategory = async (category) => {
 try {
    const allInfo = await Product.findAll();
    const filter = allInfo.filter(e => e.category===category)
      return filter;
 } catch (e) {
    
 }
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