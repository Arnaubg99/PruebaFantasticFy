const express = require('express');
const cors = require('cors');
require('dotenv').config();

//CREACION Y CONFIGURACION DEL PUERTO DEL SERVIDOR
const servidor = express();
servidor.use(cors());

servidor.listen(process.env.PORT, () => {
  console.log(`Servidor en http://localhost:${process.env.PORT}`);
});

//RUTAS
servidor.get('/', async (req, res) => {
  res.json(await getProductos());
});

servidor.get('/:id', async (req, res) => {
    const id = req.params.id;
    res.json(await getProductoPorId(id));
});

//FUNCIONES
async function getProductoPorId(id) { 
  try {
    const productos = await getProductos();
    const ide = Number(id);
    if (isNaN(ide)) {
      throw new Error('Id no válida');
    }
    const producto = productos.products.find((objeto) => objeto.id === ide);
    if (!producto) {
      throw new Error('Producto no encontrado');
    }
    return producto;
  } catch (error) {
    return error;
  }
}
async function getProductos() {
  try {
    let respuesta = await fetch(process.env.rutaApi, {  
      headers: {
      'X-Shopify-Access-Token': process.env.X_Shopify_Access_Token, 
      "Content-Type": "application/json",
      },
    });
    if (!respuesta.ok) {
      throw new Error('No se han podido recopilar los productos');
    }
    return await respuesta.json();
  } catch (error) {
    return error;
  }
}




