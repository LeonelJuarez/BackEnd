class ProductManager {
    constructor() {
        this.products = [];
        this.id = 1;
    }

    getProducts() {
        return this.products;
    }

    valadateId() {
        return this.id++;
    }

    getProductByld(id) {
        const product = this.products.find(product => product.id === id)
        //return arr.filter(obj => obj.id === id)
        if (!product) {
            console.log("No se encontro el producto");
        } else {
            return product;
        }
    }

    addProduct(obj) {
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
        } else {
            this.products.push({
                id: this.valadateId(this.products),
                title,
                description,
                price,
                thumbnail,
                code,
                stock
            });
        }
    }
}

//PROCESO DE TESTING

let manager = new ProductManager();
//Array vacio
console.log(manager.getProducts());
//Se agregan productos
manager.addProduct({
    title: "producto prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "acb123",
    stock: 24
});
manager.addProduct({
    title: "segundo producto prueba",
    description: "segundo producto",
    price: 15000,
    thumbnail: "Sin imagen",
    code: "acb122",
    stock: 5
});
//Se muestra producto
console.log(manager.getProducts());
//Se agrega el mismo producto: Debe tirar error
manager.addProduct({
    title: "producto prueba",
    description: "Este es un producto de prueba",
    price: 200,
    thumbnail: "Sin imagen",
    code: "acb123",
    stock: 24
});
//Se busca producto con id
console.log(manager.getProductByld(1));
console.log(manager.getProductByld(9));