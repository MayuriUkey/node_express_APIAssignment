const express = require('express')
const app = express()
const Joi = require('joi')
const { products } = require('./data')

//1.get all products................app.get()
app.get('/products', (req, res) => {
    res.json(products)
})

//2.get product by id................app.get()
app.get('/products/:id', (req, res) => {
    const singleProduct = products.find(
      (product) => product._id=== parseInt(req.params.id)
    )
    if (!singleProduct) {
      return res.status(404).send('Product Does Not Exist')
    }
    res.send(singleProduct)
})

//3.Add product.....................app.post()
app.post('/products',(req,res)=>{
    const {error} = validateproduct(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    const product ={
      id: products.length+1,
      name: req.body.name,
      price: req.body.price,
      availableQuantity: req.body.availableQuantity,
      manufacturer: req.body.manufacturer
    }

    products.push(product)
    res.send(product)
})

//4) Update product..................app.put()
app.put('/products/:id',(req,res)=>{
    const singleProduct = products.find(
      (product) => product._id=== parseInt(req.params.id)
    )
    if (!singleProduct) {
      return res.status(404).send('Product Does Not Exist')
    }

    const {error} = validateproduct(req.body)
    if(error) return res.status(400).send(error.details[0].message)

    product.name =req.body.name;
    product.price =req.body.price,
    product.availableQuantity = req.body.availableQuantity,
    product.manufacturer = req.body.manufacturer
    res.send(Product)
})

//5) Delete product..................app.delete()
app.delete('/products/:id',(req,res)=>{
    const singleProduct = products.find(
      (product) => product._id=== parseInt(req.params.id)
    )
    if (!singleProduct) {
      return res.status(404).send('Product Does Not Exist')
    }
    const index= products.indexOf(singleProduct)
    products.splice(index,1)

    res.send(singleProduct)
})

/*6) Create an API that takes the following request:

Request: {
    product_id: 1,
    quantityToBuy: 5
}

Response:
{
        "_id": 1,
        "name": "Product 1",
        "pricePerItem": 10,
        "totalPrice": 50,
        "quantity":5
}.............................................app.get()*/

app.get('/products',(req,res)=>{
    const id=req.query.id
    const buy=req.query.buy
    const singleProduct = products.find(
      (product) => product._id=== parseInt(id)
    )
    if (!singleProduct) {
      return res.status(404).send('Product Does Not Exist')
    }
    const availableQty =singleProduct.availableQuantity
    if(availableQty>=buy){
      singleProduct.availableQtuantity=availableQty-buy
      const total = singleProduct.price*buy
      return res.send(`id:`,singleProduct._id,`name:`,singleProduct.name,`price:`,singleProduct.price,`total:`,total,`quatity:`,buy)
    }
    res.send("out of stock")
})

function validateproduct(product){
  const schema ={
    name : Joi.string().required(),
    price : Joi.number().required(),
    availableQuantity : Joi.number().required(),
    manufacturer : Joi.string().required
  };
  return Joi.valid(product,schema)
}

app.listen(3000, () => {
  console.log('Server is listening on port 3000....')
})