const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const recipes = require("./recipes.json");

const parser = bodyParser.urlencoded({extended: false});
const expApp = express();
const port = 80;

expApp.use(express.static(path.join(__dirname + "/public")));

expApp.get("/", (req, res) => {
    res.sendFile("index.html");
});

expApp.get("/login", (req, res) => {
    res.sendFile(__dirname + "/public/login.html");
});

expApp.get("/recipe", (req, res) => {
    res.send(recipes.public[0]);
});

expApp.get("/recipe/private", (req, res) => {
    // TODO Authentication ??? return 401 if not authed SIMEON
    res.send(recipes.private[0]);
});

expApp.get("/viewer/public", (req, res) => {
    res.sendFile(__dirname + "/public/viewer.html");
});

expApp.get("/viewer/private", ((req, res) => {
    // TODO simeon, make authentication work and make viewer.html show the one private recipe (in position zero) in recipes.json
    // also you need to make a login page. use index.html as like a template.
}));

console.log("RecipeBox Server Started");
expApp.listen(port);



