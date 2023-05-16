const express = require('express');
const cors = require('cors')
require('dotenv').config();

//CREACION Y CONFIGURACION DEL PUERTO DEL SERVIDOR
const servidor = express();
servidor.use(cors())

servidor.listen(process.env.PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT}`);
});

//RUTAS
servidor.get('/', async (req, res) => {
  res.json(await getProductos());
});

servidor.get('/:id', async (req, res) => {
    const id = req.params.id
    res.json(await getProducto(id));
});

//FUNCIONES
async function getProducto(id) {
  try {
    let productos = await getProductos()
    const ide = Number(id)
    return productos.products.find((objeto) => objeto.id === ide);
  } catch (error) {
    return error;
  }
}
async function getProductos() {
  try {
    let respuesta = await fetch('https://test-fullstack.myshopify.com/admin/api/2023-04/products.json', {  
      headers: {
      'X-Shopify-Access-Token': process.env.X_Shopify_Access_Token, 
      "Content-Type": "application/json",
      },
    });
    return await respuesta.json();
  } catch (error) {
    return error;
  }
}




