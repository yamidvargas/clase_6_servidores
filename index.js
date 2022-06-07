const fs = require('fs')

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName

    }

    async getAll() {
        try {
            let data = await fs.promises.readFile(`./productos.txt`, 'utf-8')
            data = JSON.parse(data)

            return data
        } catch {

            console.log('Error')
        }

    }




}

const express = require("express");
const contenedor = new Contenedor()

const objeto1 = {
    nombre: "celular",
    precio: 1500000,
    thumbnail: "https://cdn.pixabay.com/photo/2014/08/05/10/27/iphone-410311__480.jpg",
}

const objeto2 = {
    nombre: 'computador',
    precio: 3500000,
    thumbnail: "https://http2.mlstatic.com/D_NQ_NP_603535-MCO47189740321_082021-V.jpg",
}

const objeto3 = {
    nombre: 'tablet',
    precio: 2000000,
    thumbnail: "https://www.lenovo.com/co/es/tablets/android-tablets/lenovo-tab-series/Lenovo-Yoga-Tab-11/p/WMD00000472",

}





const app = express();
const port = 8080;


/*Ruta get '/productos' que devuelva un array con todos los productos disponibles 
en el servidor*/
app.get("/products", productsController)

/*Ruta get '/productoRandom' que devuelva un producto elegido al azar entre todos 
los productos disponibles*/
app.get("/productoRandom", randomProducts)

app.listen(port, () => {
    console.log(`servidor escuchando en el puerto ${port}`)
})



async function productsController(req, res) {
    const response = await contenedor.getAll()
    res.send(response)
    console.log("nueva peticion")

}

async function randomProducts(req, res) {
    let myArray = await contenedor.getAll()
    let rand = Math.floor(Math.random() * myArray.length);
    let rValue = myArray[rand];
    res.send(rValue)
    console.log("producto generado")
}