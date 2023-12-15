import {promises as fs} from "fs"


class ProductManager{
    constructor (){
        this.path = "./productos.txt"
    }


// Método Add Product

        async addProduct (product){
            let products= JSON.parse(await fs.readFile (this.path, "utf-8"))

            if (products.find(producto => producto.id === product.id)){
                return "Producto ya agregado"
            } else {
                products.push(product)  
            }
        
            await fs.writeFile(this.path, JSON.stringify(products))

        }

// Método Get Product

        async getProducts () {
            let products= JSON.parse(await fs.readFile (this.path, "utf-8"))
            return products
        }


//Método Get product by ID

       async getProductsByID(id){
            let products= JSON.parse(await fs.readFile (this.path, 'utf-8'))
            let productoBuscado = products.find(producto => producto.id ===id)
            if (productoBuscado){
                return productoBuscado
            } else {
                console.log ("Not found")
            }
        }


// Método Update Product
    async updateProduct (id, { title }) {
        let products= JSON.parse(await fs.readFile (this.path, "utf-8"))    
        let indice = products.findIndex(prod => prod.id ===id)

        if (indice != -1){
            products [indice].title = title
            await fs.writeFile (this.path, JSON.stringify(products))
        } else {
            console.log ("Producto no encontrado")
        }
        }

// Método Delete Product

    async deleteProduct(id) {
        let products= JSON.parse(await fs.readFile (this.path, "utf-8"))
        let filterOut = products.filter(prod => prod.id !=id)
        await fs.writeFile("./productos.txt", JSON.stringify(prods))
        }

        
        
 }
    
class Product {
    static idIncrement = 0

    constructor(title, description, price, thumbnail, code, stock) {
        Product.idIncrement++
        this.title = title
        this.description = description
        this.price = price
        this.thumbnail = thumbnail
        this.code = code
        this.stock = stock
        this.id = Product.idIncrement
    }


    /* static incrementarID(){
        if(this.idIncrement){
            this.idIncrement++
        } else {
            this.idIncrement = 1
        }
        return this.idIncrement
    } */

    

}


// Inicio de Product Manager y agregar producto

const productManager = new ProductManager
const product1 = new Product("Laptop", "Laptop Asus", 2000, "Sin imagen", "LAP123", 25)
const product2 = new Product("Mouse", "Mouse Logitec", 220, "Sin imagen", "MOU124", 20)
const product3 = new Product("Teclado", "Teclado Logitec", 230, "Sin imagen", "TEC124", 20)
productManager.addProduct(product1)
productManager.addProduct(product2)
productManager.addProduct(product3)
productManager.getProducts()
productManager.getProductsByID(3)
