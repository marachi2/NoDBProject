require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const port = process.env.PORT;
let recipes = require('./recipes.js')
const axios = require('axios')

let app = express();
app.use(bodyParser.json());
app.use(cors());

app.use(express.static(__dirname + '/../build'));

app.get('/api/getAll', (req, res) =>{
    axios.get('http://food2fork.com/api/search?key=' + process.env.REACT_APP_APIKEY + 
    '&q=' + req.query.search).then(response =>{
        res.status(200).send(response.data)
    })
})


//Get All Recipes//
app.get('/api/recipes', (req, res) => {
    res.status(200).send(recipes);
})

//Get Sorted Recipes//
app.get('/api/recipes/:order', (req, res) => {
    if(req.params.order === 'asc'){
        recipes = recipes.sort((a, b) => { 
            return a.title > b.title
        });
    }
    else if(req.params.order === 'desc'){
        recipes = recipes.sort((a, b) => { 
            return a.title < b.title
        })
    }
    
    res.status(200).send(recipes);
}) 

//Add Recipe//
app.post('/api/recipes', (req, res) =>{
    let newRecipe = Object.assign({}, req.body)
    recipes = recipes.concat(newRecipe)
    res.status(200).send(recipes);
})

//Delete//
app.delete('/api/recipes/:id', (req, res) =>{
    let remainingRecipes = recipes.filter(recipe =>{
        if(recipe.id !==  +req.params.id){
            return recipe
        }
    }) 
    console.log(remainingRecipes);
    res.status(200).send(remainingRecipes);
})


app.get('*', (req, res) => {
    res.sendFile(__dirname + './../build');
})


app.listen(port, () => {
    console.log("Listening on port " + port)

})