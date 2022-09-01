const mercadopago = require("mercadopago");
require("dotenv").config();
const { ACCESS_TOKEN } = process.env;
const { Router } = require("express");
const router = Router();

mercadopago.configure({
  access_token:
    "APP_USR-7262929329049314-083112-618a2487d51780282e7c007859e9dc37-408019538",
});

let preference = {
  items: [
    {
      title: "hola",
      unit_price: 100,
      quantity: 1,
    },
  ],
  // back_urls: {
  //   success: "http://localhost:3000/feedback",
  //   failure: "http://localhost:3000/feedback",
  //   pending: "http://localhost:3000/feedback",
  // },
  // auto_return: "approved",
};

router.post("/", async (req, res) => {
  let error = false;
  // ids.forEach((id) => {
  //   const product = productsCopy.find((p) => p.id === id);
  //   if (product.stock > 0) {
  //     product.stock--;
  //     preference.items.push({
  //       title: product.name,
  //       unit_price: product.price,
  //       quantity: 1,
  //     });
  //   } else {
  //     error = true;
  //   }
  // });

  if (error) {
    res.send("Sin stock").statusCode(400);
  } else {
    const response = await mercadopago.preferences.create(preference);
    const preferenceId = response.body.id;
    res.send({ preferenceId });
  }
});

module.exports = router;
