import { Router } from "express";
import ProductManager from "../products/ProductManager.js";
import { fileURLToPath } from "url";
import path from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const productManager = new ProductManager(path.join(__dirname, "../db/products.json"));


const productsRouter = Router()

//<--- rutas --->


productsRouter.get('/', async (req, res) => {
  const products = await productManager.getProducts();
  res.render('home', { products })
});

productsRouter.get('/realTimeProducts', (req, res) => {
  res.render('realTimeProducts');
});


export default productsRouter