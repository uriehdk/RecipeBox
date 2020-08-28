const { MongoClient } = require('mongodb');
const credentials = require('./credentials.json');
const client = MongoClient(credentials.uri, {useUnifiedTopology: true});

const hostname = '127.0.0.1';
const port = 3000;

async function addRecipe(title, ingredients, steps) {
    try {
        await client.connect();
        
        const database = client.db('recipebox');
        const collection = database.collection('recipes');
        recipe = {title: title, ingredients: ingredients, stes: steps};

        collection.insertOne(recipe, (err, res) => {
            if (err) throw err;
            console.log("Registered recipe");
            db.close();
        });
    } finally {
        await client.close();
    }
}

async function removeRecipe(title) {
    try {
        await client.connect();
        const database = client.db('recipebox');
        const collection = database.collection('recipes');

        const query = {title: title};
        collection.deleteOne(query, (err, res) => {
            if (err) throw err;
            console.log("Deleted recipe");
            db.close();
        });
    } finally {
        await client.close();
    }
}

async function getRecipe(title) {
    try {
        await client.connect();
        const database = client.db('recipebox');
        const collection = database.collection('recipes');

        const query = {title: title};
        const recipe = await collection.findOne(query, (err, res) => {
            if (err) throw err;
            console.log("Returned recipe");
            db.close();
        });

        return recipe;
    } finally {
        await client.close();
    }
}

async function getRecipes() {
    try {
        await client.connect();
        const database = client.db('recipebox');
        const collection = database.collection('recipes');
        
        const recipes = await collection.findAll({}, (err, res) => {
            if (err) throw err;
            console.log("Returned all recipes");
            db.close();
        });

        return recipes;
    } finally {
        await client.close();
    }
}
