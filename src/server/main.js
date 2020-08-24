const { MongoClient } = require('mongodb');
const credentials = require('./credentials.json');
const client = MongoClient(credentials.uri);

async function run() {
    try {
        await client.connect({useNewUriParser: true, useUnifiedTopology: true});
    
        const database = client.db('recipebox');
        const collection = database.collection('recipes');
    
        // Query for a movie that has the title 'Back to the Future'
        const query = {name:'Pizza'};
        const recipe = await collection.findOne(query);
    
        console.log(recipe);
    } finally {
        // Ensures that the client will close when you finish/error
        await client.close();
    }
}

run().catch(console.dir);
