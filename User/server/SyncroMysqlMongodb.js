import mysql from "mysql2"
import mongoose from "mongoose"
import { hash, genSalt } from "bcrypt"
import User from "./models/UserModel.js";
import dotenv from "dotenv"

dotenv.config()

// Configuration de la connexion à MariaDB
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'nyall',
    database: 'Ge_IT_Community',
    password: ''
});

// Configuration de la connexion à MongoDB
const databaseURL= process.env.DATABASE_URL
mongoose.connect(databaseURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});


async function importData() {
    const query = `
                SELECT email,password FROM admin
                UNION ALL
                SELECT email,password FROM student
                UNION ALL
                SELECT email,password  FROM teacher
                `


    connection.query(query, async (error, results) => {
        if (error) throw error;

        for (const row of results) {
            

           
            const user = new User({
                email: row.email,
                password: row.password,
                profileSetup:false,
            });

           
            await user.save();
        }

        console.log('Données importées avec succès');
        mongoose.disconnect();
        connection.end();
    });
}

importData().catch(err => console.error(err));