const e = require("express");
const {Product,Category} = require("../db")




const getAllProducts = async function(){
    try {
        const allInfo = await Product.findAll()
        
        
        return allInfo.map(el => ({
            id: el.id,
            name: el.name,
            brand: el.brand,
            image: el.image
        }));
    } catch (error) {
        console.log(error)
    }
}

const filterByCategory = async (category) => {
 try {
     
     const Id = await Category.findOne({
         where: {name : category},
     })
     console.log(Id.id)
     const allInfo = await Product.findAll();
     const filterByCategory = allInfo.filter(el => el.categoryId === Id.id)
 
    
    return filterByCategory.map(el => ({
        id: el.id,
        name: el.name,
        brand: el.brand,
        image: el.image
    }));
 } catch (e) {
    
 }
}

const filterByGenre = async (genre) => {
   try {
        const allInfo = await Product.findAll();
        const FilerByGenre = allInfo.filter(e => e.genre === genre)
        return FilerByGenre.map(el => ({
            id: el.id,
            name: el.name,
            brand: el.brand,
            image: el.image
        }));
   } catch (e) {
       console.log(e)
   }
}


const filterBySize = async (size) => {
    const AllProducts = await Product.findAll()
     if(typeof size === "string"){ 
         const infoFilter = AllProducts.filter(el => el.size.includes(size.toUpperCase()))
         return infoFilter.map(el => ({
            id: el.id,
            name: el.name,
            brand: el.brand,
            image: el.image
        }));
     }else{ 
        const infoFilter = AllProducts.filter(el => el.size.includes(ParseInt(size)))
        return infoFilter.map(el => ({
            id: el.id,
            name: el.name,
            brand: el.brand,
            image: el.image
        }));
}
}


module.exports = {
    filterByGenre,
    filterByCategory,
    getAllProducts,
    filterBySize
}