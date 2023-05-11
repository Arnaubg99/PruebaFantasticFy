const express = require('express');

//CREACION Y CONFIGURACION DEL PUERTO DEL SERVIDOR
const servidor = express();
servidor.listen(3000, () => {
  console.log(`Servidor en http://localhost:3000`);
});

//CREACION DE VARIABLE GLOBAL CON TODOS LOS PRODUCTOS
let products;
(async () => {
  const respuesta = await getProductos();
  products = respuesta.products;
})();

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
    const ide = Number(id)
    return products.find((objeto) => objeto.id === ide);
  } catch (error) {
    return error;
  }
}
async function getProductos() {
  try {
    let respuesta = await fetch('https://test-fullstack.myshopify.com/admin/api/2023-04/products.json', {  
      headers: {
      'X-Shopify-Access-Token': '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', 
      "Content-Type": "application/json",
      },
    });
    return await respuesta.json();
  } catch (error) {
    return error;
  }
}




