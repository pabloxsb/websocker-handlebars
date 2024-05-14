import express from "express";
import { __dirname } from "./utils.js";
import productsRouter from './routes/products.js'
import { Server } from "socket.io";
import handlebars from 'express-handlebars'
import ProductManager from './products/ProductManager.js'

const productManager = new ProductManager(__dirname + '/db/products.json');

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + '/public'));
app.use(express.json());

app.engine('handlebars', handlebars.engine());
app.set('view engine', 'handlebars');
app.set('views', __dirname + '/views');

app.use('/', productsRouter)


const httpServer = app.listen(8080, () => {
  console.log("Server ok on port 8080");
});

const socketServer = new Server(httpServer)

socketServer.on('connection', async (socket) => {
  console.log('New connection', socket.id)

  socket.on('disconnect', () => {
    console.log('¡User disconnect!', socket.id);
  })


  socket.emit('arrayProducts', await productManager.readProducts());



  socket.on('newProduct', async (obj) => {
    await productManager.addProduct(obj);
    socketServer.emit('arrayProducts', await productManager.readProducts());

  })
})