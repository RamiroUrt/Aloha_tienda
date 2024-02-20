const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();
const fs = require('fs');
const exp = require('constants');
const path = require('path');
const productsController = require('./src/database/productos.json');

const app = express();
const PORT = 5050;

app.use(express.static(path.join(__dirname, 'src', 'database')));
app.use(bodyParser.json());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));
// app.use(logger('dev'))
// // View engine setup
// app.set('view engine', 'ejs');
// app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');
    
app.listen(PORT, () => {
    console.log(`Servidor escuchando en http://localhost:${PORT}`);
});
    
app.get('/', (req, res) => {
    // Lee el contenido del archivo JSON de manera sincrónica
    const productosJSON = fs.readFileSync('./src/database/productos.json', 'utf8');
    const productos = JSON.parse(productosJSON);

    // Renderiza la vista 'index' y envía los productos como datos
    res.render('index', { productos });
});

app.get('/carrito', (req, res) => {
    res.render('carrito')
})
app.get('/logger', (req, res) => {
    res.render('form')
})
app.get('/load', (req, res) => {
    res.render('load')
});
app.get('/user', (req, res) => {
    // Lee el contenido del archivo JSON de manera sincrónica
    const productosJSON = fs.readFileSync('./src/database/productos.json', 'utf8');
    const productos = JSON.parse(productosJSON);
    res.render('user', { productos })
})

app.delete('/user/:id', (req, res) => {
    const productId = parseInt(req.params.id);

    // Lee el contenido del archivo JSON de manera sincrónica
    const productosJSON = fs.readFileSync('./src/database/productos.json', 'utf8');
    const productos = JSON.parse(productosJSON);

    // Encuentra el índice del producto en el array
    const index = productos.findIndex(producto => producto.id === productId);
  
    if (index !== -1) {
      // Elimina el producto del array
      productos.splice(index, 1);

      // Guarda los datos actualizados en el archivo JSON
      fs.writeFileSync('./src/database/productos.json', JSON.stringify(productos, null, 2), 'utf8');

      res.status(200).send('Producto eliminado con éxito.');
    } else {
      res.status(404).send('Producto no encontrado.');
    }
});
///
router.post('/load', (req, res) => {
    console.log(req.body);
    res.send('recibido')

    // const nuevoProducto = {
    //     id: productos.length + 1,
    //     nombre: req.body.id,
    //     nombre: req.body.titulo,
    //     descripcion: req.body.categoria,
    //     precio: req.body.precio,
    //     imagen: req.body.imagen
    // }

    res.redirect('/user');
});

module.exports = app;
    // app.get('/', (req, res) => {
    //     res.render('index')
    //     res.get(productsController)
    // })

//     // Agrega el nuevo producto al arreglo existente
//     productos.push(nuevoProducto);

//     // Escribe el arreglo actualizado de productos de vuelta al archivo JSON

//     // Envía una respuesta al cliente
//     res.json({ mensaje: 'Producto agregado con éxito' });
// });
