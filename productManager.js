const { error } = require("console");
const fs = require("fs");
const archivo = "archivo.json"


class ProductManager {
    constructor() {
        this.products = [];
        this.path= archivo;
        this.id = 1;
    }

    async addProduct(obj) {
        try{
        let {
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        } = obj;
        const existe = this.products.find(product => product.code === code)

        if (existe) {
            console.log("Ya existe un producto igual")
        } 

        if (!title||!description||!price||!thumbnail||!code||!stock){
            console.log(`Todos los campos son obligatorios, verificar el producto ${title}`)
        }

        this.products.push({
            id: this.valadateId(this.products),
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        });
        
        await fs.promises.writeFile(this.path, JSON.stringify(this.products))
    
    } catch(error){
        console.log(error);

    }
    }


    async getProducts() {
        try{
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(contenido);
            return products;
        }catch(error){
            console.log(`Error al leer el archivo ${error}`);
            return [];
        }
       // return this.products;
    }

    valadateId() {
        return this.id++;
    }

    async getProductByld(id) {
        try{
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(contenido);
            const product = products.find(product => product.id === id)
        if (!product) {
            console.log("No se encontro el producto");
        } else {
            return product;
        }
    }catch (error){
        console.log(error)
        }
    }   


    async updateProduct(id, updatedFields) {
        try {
            const contenido = await fs.promises.readFile(this.path, "utf-8");
            const products = JSON.parse(contenido);
            const productIndex = products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            console.log("No se encontró el producto");
            return;
        }
        const updatedProduct = { ...products[productIndex], ...updatedFields };
        products[productIndex] = updatedProduct;
        await fs.promises.writeFile(this.path, JSON.stringify(products));
        console.log("Producto actualizado correctamente");
        } 
        catch (error) {
        console.log(error);
        }
    }

    async deleteProduct(id) {
        try {
        const contenido = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(contenido);
        const filteredProducts = products.filter(product => product.id !== id);
        if (filteredProducts.length === products.length) {
            console.log("No se encontró el producto");
            return;
        }
        await fs.promises.writeFile(this.path, JSON.stringify(filteredProducts));
        console.log("Producto eliminado correctamente");
        } catch (error) {
        console.log(error);
        }
    }
}

//PROCESO DE TESTING
(async () => {
    try {
        let manager = new ProductManager();
        //Array vacio
        console.log(manager.getProducts());
        //Se agregan productos
        await manager.addProduct({
            title: "producto prueba",
            description: "Este es un producto de prueba",
            price: 200,
            thumbnail: "Sin imagen",
            code: "acb123",
            stock: 24
        });
        await manager.addProduct({
            title: "segundo producto prueba",
            description: "segundo producto",
            price: 15000,
            thumbnail: "Sin imagen",
            code: "acb122",
            stock: 5
        });
        await manager.addProduct({
            title: "tercer segundo producto prueba",
            description: "segundo producto",
            price: 15000,
            thumbnail: "Sin imagen",
            code: "acfdfb122",
            stock: 5
        });
        console.log(manager.getProducts());
        
        await manager.getProductByld(1);
        await manager.updateProduct(2,"price",349);
        await manager.deleteProduct(2)
    }
    
    catch(error){
        console.log(error)
    
    }
})();
/*

//Se muestra producto
console.log(manager.getProducts());
//Se agrega el mismo producto: Debe tirar error
manager.addProduct({
    title: "producto prueba 2",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "acb123",
    stock: 24
});
//Se busca producto con id
console.log(manager.getProductByld(1));
console.log(manager.getProductByld(9));*/