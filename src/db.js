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

        await collection.insertOne(recipe, (err, res) => {
            if (err) throw err;
            console.log("Registered recipe");
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

async function updateRecipe(title, newIngredients, newSteps) {
    try {
        await client.connect();
        const database = client.db('recipebox');
        const collection = database.collection('recipes');
        
        const recipes = await collection.updateOne({title: title}, {$set: {ingredients: newIngredients, steps: newSteps}}, (err, res) => {
            if (err) throw err;
            console.log("UpdatedRecipe");
            db.close();
        });

        return recipes;
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
        await collection.deleteOne(query, (err, res) => {
            if (err) throw err;
            console.log("Deleted recipe");
            db.close();
        });
    } finally {
        await client.close();
    }
}

async function addUser(username, password) {
    try {
        await client.connect();
        const database = client.db('recipebox');
        const collection = database.collection('recipes');

        const potentialUser = await collection.findAll({user: username}, {user: 1}, (err, res) => {
            if (err) throw err;
        });
        if (potentialUser.length > 0) throw new Error('Username taken');

        await collection.insertOne({user: username, pass: password}, (err, res) => {
            if (err) throw err;
            console.log("Inserted user");
            db.close();
        });
    } finally {
        await client.close();
    }
}

async function validateUser(username, password) {
    try {
        await client.connect();
        const database = client.db('recipebox');
        const collection = database.collection('recipes');

        const validated = await collection.findAll({user: username, pass: password}, (err, res) => {
            if (err) throw err;
            db.close();
        });

        if (validated.length > 0) return true;
        else return false;
    } finally {
        await client.close();
    }
}
