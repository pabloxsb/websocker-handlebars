const socket = io()

socket.on('arrayProducts', (array) => {
    let products = '';
    array.forEach(product => {
        products += `Producto: ${product.title}
        <br>Descripción: ${product.description}
        <br>Precio: ${product.price}
        <br>Código: ${product.code}
        <br>Stock: ${product.stock}
        <br>Categoría: ${product.category}
        <br><br>`;
    });
    document.getElementById("products").innerHTML = products;
});


const form = document.getElementById('form');
const title = document.getElementById('title');
const description = document.getElementById('description');
const code = document.getElementById('code');
const price = document.getElementById('price');
const stock = document.getElementById('stock');
const category = document.getElementById('category');

form.onsubmit = (send) => {
    send.preventDefault();
    const newProduct = {
        title: title.value,
        description: description.value,
        price: price.value,
        code: code.value,
        stock: stock.value,
        category: category.value
    }
    socket.emit('newProduct', newProduct);
}