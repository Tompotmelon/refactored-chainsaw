//ECHO is on.
// grab the main Express module from package installed
const express = require('express')
// create the app variable and call the Express function
const app = express()
// establish which port you’d like to use
const port = 3000
// dummy dataset
const fruits = ['apples', 'bananas', 'oranges'] // this is an array
const animals = ['cats', 'birds', 'zebra']

// define route handler for GET requests to the server
app.get('/', (req, res) => {
    res.send('Hello World!')
})

//Challenge:
app.get('/about', (req, res) => {
    res.send('My name is Elizabeth O. I am learning how to code.')
})

// routes
app.get('/', (req, res) => {
  res.send('Hello World!') // unstyled
  res.send("<h1>Welcome to the chat app</h1>") // styled
})

app.get('/fruits', (req, res) => {
  // send all the fruit
    res.json(fruits)
})

app.get('/animals', (req, res) => {
  // send all the animals
    res.json(animals)
})

//original code moved down to allow all get to be together.
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})