// Start your server out with a hard-coded array of cart items, each including id, product, price, and quantity.
const express = require('express');
const app = express()

app.use(express.json());
const port = 3000

const cart = require('./cart.js');

app.use('/cart-items', cart);



app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});
