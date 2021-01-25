const MongoClient = require('mongodb').MongoClient;
require('dotenv').config();
const uri = "mongodb+srv://" + process.env.DB_USERNAME + ":" + process.env.DB_PASSWORD + "@cluster0.gypbn.mongodb.net/test?retryWrites=true&w=majority";

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

var recipe

client.connect(err => {
    if (err) return console.log(err)
    console.log('Connected to Database')

    const db = client.db('Recept_hemsida')
    recipe = db.collection('Recept')
})

function getRecipe(test) {
    let query = {url: test}
    let doc = recipe.findOne(query).catch(error => console.log(error))
    return doc
}

function getAllRecipe() {
    let doc = recipe.find().sort({title: 1}).toArray().catch(error => console.log(error))
    return doc
}

function submitRecipe(newRecipe) {
    var url = newRecipe.title.toLowerCase().replace(/ /g, "-").replace(/ö/g, "o").replace(/ä/g, "a").replace(/å/g, "a")
    newRecipe.url = url
    console.log(newRecipe)
    recipe.insertOne(newRecipe)

}

module.exports = {
    getRecipe,
    getAllRecipe,
    submitRecipe
}