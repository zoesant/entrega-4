const express = require('express');
const { get } = require('http');
const app = express();
const useRoute = express.Router();

let productos = [
    {
        id: 1,
        title: 'remera 1',
        price: 200,
        thumbnail: 'www.google.com',
        
    },

    {   
        id: 2,
        title: 'remera 2',
        price: 300,
        thumbnail: 'www.google.com',
        
    },

    {   
        id: 3,
        title: 'remera 3',
        price: 400,
        thumbnail: 'www.google.com',
        
    }
]

app.use(express.json());
app.use(express.urlencoded({extended: true}));
const routerProductos = express.Router();
app.use('/productos', routerProductos);



routerProductos.get('/', (req, res) =>{
    const price = req.query.price;
    if (price) res.json(productos.filter(producto => producto.price == price));
    else res.json(productos)

    res.json(productos)
});

routerProductos.get('/productos/:prodId', (req, res) => {
    const idProd = req.params.prodId;
    const prodEncontrado = productos.find(producto => producto.id == idProd);
    if (!prodEncontrado) res.status(404).send('La remera no existe');
    else res.json(prodEncontrado);
});

routerProductos.post('/productos/nuevo', (req, res) => {
    const agregarProd = req.body.producto;
    productos.push(agregarProd)
    res.json({
        prodAgregado: agregarProd,
        pos: productos.length-1,
    })
})

routerProductos.put('/productos/:pos', (req, res) => {
    const posicion = parseInt(req.params.pos);
    const agregarProd = req.body.producto;
    productos[posicion] = agregarProd;
    productos.push(agregarProd)
    res.json({
        prodNuevo: agregarProd,
        prodAnterior: productos.length-1,
    })
})

routerProductos.delete('/productos/:pos', (req, res) => {
    const posicion = parseInt(req.params.pos);
    productos = productos.filter((valor, indice) => indice != posicion);
    res.send('Producto borrado')
})


app.listen(8080, () => {
    console.log('escuchando')
});