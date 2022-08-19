const { Router } = require("express");

const uuid = require("uuid");
const {
  filterByGenre,
  filterByCategory,
  getAllProducts,
  filterBySize,
} = require("../Controllers");
const { Product, Category, User } = require("../db.js");
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

const router = Router();

router.get("/", async (req, res, next) => {
  const { name } = req.query;
  try {
    let allInfo = await getAllProducts();
    if (name) {
      const filterProducts = allInfo.filter((e) =>
        e.name.toLowerCase().includes(name.toString().toLowerCase())
      );
      if (filterProducts.length) {
        return res.json(filterProducts);
      }
    }
    return res.json(allInfo);
  } catch (error) {
    next(error);
  }
});

router.get("/genres/:genre", async (req, res) => {
  try {
    const { genre } = req.params;
    if (genre === "hombre" || genre === "mujer") {
      const info = await filterByGenre(genre);
      return res.status(200).send(info);
    } else {
      const allInfo = await getAllProducts();
      res.send(allInfo);
    }
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    if (
      category === "campera" ||
      category === "calzado" ||
      category === "buzo" ||
      category === "pantalon" ||
      category === "camiseta"
    ) {
      const info = await filterByCategory(category);
      return res.status(200).send(info);
    } else {
      const allInfo = await getAllProducts();
      res.send(allInfo);
    }
  } catch (e) {
    res.status(400).send(e);
  }
});
router.get("/size/:size", async (req, res) => {
  try {
    const { size } = req.params;
    console.log(size);
    const info = await filterBySize(size);
    res.send(info);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.get("/:id", async (req, res, next) => {
  const { id } = req.params;
  try {
    if (id) {
      let productDetail = await Product.findByPk(id);
      if (productDetail) {
        let categoryDb = await Category.findByPk(productDetail.categoryId);
        const concatProduct = {
          ...productDetail.dataValues,
          categoryName: categoryDb.name,
        };
        res.status(200).json(concatProduct);
      } else {
        return res.status(200).json({ message: "ID not found" });
      }
    }
  } catch (error) {
    next(error);
  }
});
router.delete("/delete/:id", async function (req, res) {
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

router.post("*", async (req, res, next) => {
  let { name, brand, price, stock, image, sold, size, score, genre } = req.body;

  try {
    let newProduct = await Product.create({
      name,
      brand,
      price,
      stock,
      image,
      sold,
      size,
      score,
      genre,
    });

    res.status(200).send("Producto Creado");
  } catch (e) {
    next(e);
  }
});

module.exports = router;
