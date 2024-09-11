const express = require('express');
const mysql = require('mysql2'); // Utilisez mysql2 au lieu de mysql
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(bodyParser.json()); // Utilisation de bodyParser.json()

// Routes
const routeAdmin = require('./routes/adminRoute');
const routeStudent = require('./routes/studentRoute');
const routeTeacher = require('./routes/teacherRoute');
const routeCours = require('./routes/coursRoute');
const routeEvent = require('./routes/eventRoute');
const generateId = require('./routes/generateId');

// Static files
app.use("/uploads", express.static("./uploads"));

// Use routes
app.use(routeAdmin);
app.use(routeStudent);
app.use(routeTeacher);
app.use(routeCours);
app.use(routeEvent);
app.use('/api', generateId); // Add the '/api' prefix to the generateId routes

// Listen on port
const http_port = 8800;
app.listen(http_port, () => {
  console.log(`Serveur en cours d'exécution sur : http://localhost:${http_port}`);
});
