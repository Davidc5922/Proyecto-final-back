const { Router } = require('express');
const uuid = require('uuid');
const { filterByGenre, filterByCategory, getAllProducts, filterBySize } = require('../Controllers');
const { User, Product } = require('../db');
// const allInfo = require('./info.json');
const { Product, Category,User } = require('../db.js');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req,res) => {
  try {
     const allInfo = await getAllProducts();
     res.status(200).send(allInfo)
  } catch (e) {
     res.status(400).send(e)
  }
})

router.get('/genres/:genre', async (req, res) => {
	try {
		const {genre} = req.params
    if(genre === "hombre" || genre === "mujer"){
        const info = await filterByGenre(genre)
           return res.status(200).send(info)
    }
    else{
      const allInfo = await getAllProducts()
      res.send( allInfo)
    }
	    
	} catch (error) {
		res.status(400).send(error)
	}
	
});

router.get("/category/:category", async (req,res) => {
	try {
		const {category} = req.params;
    if(category === "campera" || category === "calzado" || category === "buzo" || category === "pantalon" || category === "camiseta" ){
        const info = await filterByCategory(category)
         return res.status(200).send(info)
    }
		else{
      const allInfo = await getAllProducts()
      res.send( allInfo)
    }
      
	} catch (e) {
		res.status(400).send(e)
	}
})
router.get("/size/:size",async (req,res)=>{
  try {
        const {size} = req.params;
        console.log(size)
        const info = await filterBySize(size);
        res.send(info)

    
  } catch (error) {
    res.status(400).send(error)
  }
})

router.get('/:id',async(req, res,next) => {
  const { Id } = req.params;
  console.log(Id)
  if (Id) {
      let product = await Product.findByPk(Id);
 
          res.status(200).json(product) 
         
  } 
})
router.delete("/:id", async function (req, res) {
  const { id } = req.params;
  try {
    if (id) {
      await Product.destroy({
        where: { id: id },
      });
      res.send({ msg: "producto eliminado" });
    }
  } catch (error) {
    console.log(error);
  }
});



router.post('*', async (req, res,next) => {
  let {
      name,
      brand,
      price,
      stock,
      image,
      sold,
  size,
  score,
  genre
  } = req.body
  
  try {
  let newProduct= await Product.create({
      name,
      brand,
      price,
      stock,
      image,
      sold,
  size,
  score,
  genre
  })
  
  res.status(200).send("Producto Creado") 
  } catch (e) {
      next(e);
  }
})


module.exports = router;
