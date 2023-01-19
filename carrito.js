class ProductManager {
    constructor(ruta) {
        this.path = ruta;
    }
    getProducts = async () => {
        const fs = require('fs');
        try{
            let data = await fs.promises.readFile(this.path, "utf-8");
            let products = JSON.parse(data);
            return products;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    addProduct = async (titulo, desc, precio, imagen, codigo, cantidad) => {
        const fs = require('fs');
        try{
            let data = await this.getProducts();
            if (data.find( x => x.code == codigo) != null)
                return false;
            
            let num = data.length == 0 ? 0 : (data[data.length-1].id + 1);
            const product = {id: num, title: titulo, description: desc, price: precio, thumbnail: imagen, code: codigo, stock: cantidad};
            data.push(product);
            let res = JSON.stringify(data);
            await fs.promises.writeFile(this.path, res, 'utf-8');
            return true;
        }
        catch (ex) {
            console.log(ex);
        }
    }
    getProductById = async (id) => {
        const fs = require('fs');
        try{
            let data = await this.getProducts();
            let index = data.findIndex( x => x.id == id);
            if (index == -1)
                throw "ID no encontrado!";

            return data[index];
        }
        catch (ex) {
            console.log(ex);
        }
    }
    updateProduct = async (id, titulo, desc, precio, imagen, codigo, cantidad) => {
        const fs = require('fs');
        try{
            let data = await this.getProducts();
            let index = data.findIndex( x => x.id == id);
            if (index == -1)
                throw "ID no encontrado!";
            data[index] = {id:id, title: titulo, description: desc, price: precio, thumbnail: imagen, code: codigo, stock: cantidad};
            let res = JSON.stringify(data);
            await fs.promises.writeFile(this.path, res, 'utf-8');
        } 
        catch (ex) {
            console.log(ex);
        }
    }
    deleteProduct = async (id) => {
        const fs = require('fs');
        try{
            let data = await this.getProducts();
            let index = data.findIndex( x => x.id == id);
            if (index == -1)
                return false;
            data.splice(index);
            let res = JSON.stringify(data);
            await fs.promises.writeFile(this.path, res, 'utf-8');
        } 
        catch (ex) {
            console.log(ex);
        }
    }
}

async function Main(){
    const pm = new ProductManager("salida.txt");
    let res = await pm.getProducts();
    console.log(res);
    res = await pm.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
    console.log(res);
    res = await pm.getProducts();
    console.log(res);
    console.log("----------------------------");
    res = await pm.getProductById(0);
    console.log(res);
    res = await pm.getProductById(-1);
    console.log(res);
    await pm.updateProduct(0, "Galletitas", "Con ananá", 520, "Sin imagen", "notfromitaly", 30000);
    console.log("----------------------------");
    res = await pm.getProducts();
    console.log(res);
    await pm.addProduct('eliminable', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25);
    await pm.deleteProduct(1);
    res = await pm.getProducts();
    console.log(res);
}

Main();

//console.log(pm.addProduct('producto prueba', 'Este es un producto prueba', 200, 'Sin imagen', 'abc123', 25))
//console.log(pm.products[0].title);
//console.log(ProductManager.getProducts())
//console.log(ProductManager.getProductById('abc123'))

// this.imagen =
//producto.imagen = new Image(249, 28);
//imagen.src = "";
//