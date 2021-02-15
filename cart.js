const { request } = require('express');
const express = require('express');
const cart = express.Router();

// Hard-coded array
const cartList = [
    {id: 1, product: "juice", price: 2.50, quantity: 2},
    {id: 2, product: "chips", price: 3.00, quantity: 1},
    {id: 3, product: "ice cream", price: 3.50, quantity: 1},
    {id: 4, product: "apples", price: 1.99, quantity: 3}
];

// GET /cart-items
cart.get("/", (req, res) => {
    let filteredCart = cartList
   let maxPrice = parseFloat(req.query.maxPrice) 
    if (maxPrice) {
       filteredCart = cartList.filter( (item) => {
             return item.price <= maxPrice
        })

    }
    if (req.query.prefix) {
        filteredCart = cartList.filter( (item) => {
            return item.product.startsWith(req.query.prefix)
        })

    }
    if (req.query.pageSize) {
        filteredCart = cartList.slice(0, parseInt(req.query.pageSize));
    }
     res.json(filteredCart);
});

// GET /cart-items/:id
cart.get("/:id", (req, res) => {

    const item = cartList.find(c => c.id === parseInt(req.params.id));
    if (!item) res.status(404).send('ID Not Found')

//     const id = req.params.cartId;

//     const item = cartList.find( (cart) => {
//         return cart.id === id;
//     })

//     res.json(item);
});

// POST /cart-items
cart.post("/", (req, res) => {
    // Get item from body
    const newCartItem = {
        id: cartList.length + 1,
        product: req.body.product,
        price: req.body.price,
        quantity: req.body.quantity,
    };
    cartList.push(newCartItem);

    res.status(201).send(cartList);
    // res.json(cartList)
});

// PUT /cart-items/:id
cart.put("/:id", (req, res) => {
    const id = req.params.cartId;

    const index = cartList.findIndex( (cart) => {
        return cart.id === id;
    })

    const newCart = req.body;

    cart.splice(index, 1, newCart);

  res.json(newCart);
});

// DELETE /cart-items/:id
cart.delete("/:id", (req, res) => {

    const index = cartList.findIndex( (cart) => {
        return cart.id === id;
    })

    cart.splice(index, 1);
    res.status(204)
    res.json("Deleted");
});

module.exports = cart;