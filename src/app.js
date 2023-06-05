const express = require ("express");
const { ProductManager } = require ("./productManager")


const PORT = 8080;
const app = express();
const manager = new ProductManager();

app.get('/products', async (req, res) => {
    //const manager = new ProductManager();
    
    try{
      const limit = req.query.limit;
      const products = await manager.getProducts();
      if(limit){
        let productArr = [...products]
        const limiteProduct = productArr.slice(0,parseInt(limit))
        return res.status(200).send(limiteProduct) //res.json(limiteProduct)
      }else{
        return res.status(200).send(products)
      }
    }catch(error){
      res.status(500).send(`ERROR EN EL SERVIDOR`) 
    }
  });

app.get('/products/:idUsuario' , async(req, res) => {
  
  const products = await manager.getProducts();
  try{
  let id = req.params.idUsuario;
  const existe = products.find(product => product.id === Number(id))
  if(!existe){
    return res.status(404).send(`El Id: ${id} no existe`) //res.json({response : `No existe ese id: ${id}`})
  }
  return res.status(200).send(existe) //res.json(existe);
}
  catch(error){
   // const response = existe ? existe : { error : `No se encontro ningun producto ${id}`};
   res.status(500).send(`ERROR EN EL SERVIDOR`) 
   //res.json(response)
  }
})



// Iniciamos el servidor
app.listen(PORT, () => {
    console.log(`Servidor Express funcionando en el puerto ${PORT} http://localhost:${PORT}/` );
  });
  