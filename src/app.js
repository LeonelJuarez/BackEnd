const express = require ("express");
const { ProductManager } = require ("./productManager")


const PORT = 8080;
const app = express();


app.get('/products', async (req, res) => {
    const manager = new ProductManager();
    const products = await manager.getProducts();
    res.json(products);
  });




// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express funcionando en el puerto ${PORT} http://localhost:${PORT}/` );
  });
  