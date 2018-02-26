const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const port = process.argv[2] || 8080
const fs = require('fs')

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*")
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept")
  next()
})

app.use(bodyParser.json())

app.get('/cart', (req, res) => {
  //return cart
  fs.readFile('cart.json', (err, data) => {
    if(err) console.log(err)
    let cart = JSON.parse(data)
    res.json(cart)
  })
})

app.post('/cart', (req, res) => {
  //update cart
  console.log(req.body.cart)
  const cart = req.body.cart
  // console.log(cart)
    fs.writeFile('cart.json', JSON.stringify(cart), err => {
      if(err) console.log(err)
    }) 
  res.json({success: true})
})

app.listen(port, () => {
  console.log(`Listening on port ${port}...`)
})