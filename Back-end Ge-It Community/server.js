const express = require('express');
const mysql = require('mysql'); // Utilisez mysql2 au lieu de mysql
const myconnection = require('express-myconnection');
const cors = require('cors');
const multer = require('multer')
const bodyParser = require('body-parser');
const app = express();

//Extraction des données du formulaire
app.use(express.urlencoded({extended:false}))

//require route 
const routeAdmin = require('./routes/adminRoute')
const routeStudent =require('./routes/studentRoute')
const routeTeacher = require('./routes/teacherRoute')
const routeCours = require('./routes/coursRoute')
const routeEvent = require('./routes/eventRoute')

app.use(cors());
app.use(bodyParser.json()); // Utilisation de bodyParser.json()

///////////////////////////////////
app.use("/uploads", express.static("./uploads"));

///////////////////////////////////
// Importez la connexion à la base de données depuis le fichier approprié
const db = require('./db'); 
app.use(myconnection(mysql, db, 'pool'));

//use routes
app.use(routeAdmin)
app.use(routeStudent)
app.use(routeTeacher)
app.use(routeCours)
app.use(routeEvent)

//listen port
const http_port = 8800;
app.listen(http_port, () => {
  console.log("Serveur en cours d'exécution sur : http://localhost:" + http_port);
});
