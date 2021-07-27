const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require("mongoose");
const todoRoutes = require("./routes/todo");
const userRoutes = require('./routes/users');
const path = require('path');
const dotenv = require("dotenv")
const cors = require('cors')

dotenv.config()

//Connecté à mongodb
mongoose.connect(`mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@${process.env.DB_URL}/${process.env.DB_NAME}?retryWrites=true&w=majority`,
    { useNewUrlParser: true,
        useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

const app = express();

//Empecher les erreurs CORS

app.use(cors());
// app.use((req, res, next) => {
//     res.setHeader('Access-Control-Allow-Origin', '*');
//     res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
//     next();
// });

//bodyParser convertis les données recu en json
app.use(bodyParser.json());

// indique à Express qu'il faut gérer la ressource images de manière statique (un sous-répertoire de notre répertoire de base)
app.use('/images', express.static(path.join(__dirname, 'images')));

app.use("/api/todos",todoRoutes);
app.use('/api/auth',userRoutes);

module.exports = app;