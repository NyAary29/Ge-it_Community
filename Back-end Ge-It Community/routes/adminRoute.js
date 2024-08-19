const express = require("express");
const multer = require('multer')
const routeAdmin = express.Router();
const db = require('../db'); // Importez la connexion à la base de données depuis le fichier approprié


//////////////////////////////////
// Middleware pour l'image
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./uploads");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });


// Route pour mettre à jour les informations de l'administrateur
const query = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, results) => {
            if (err) {
                reject(err);
            } else {
                resolve(results);
            }
        });
    });
};


routeAdmin.put('/admin/update', upload.single('image'), async (req, res) => {
    try {
        if (!req.body || !req.body.user_name || !req.body.email || !req.body.oldpassword || !req.body.password || !req.file) {
            return res.status(400).json({ message: "Tous les champs sont requis" });
        }

        const { user_name, email, oldpassword, password } = req.body;
        const image = req.file.filename;

        // Vérifier l'ancien mot de passe
        const checkPasswordQuery =
            "SELECT * FROM admin WHERE id = 1 AND password = ?";
        const [user] = await query(checkPasswordQuery, [oldpassword]);
        if (!user || user.length === 0) {
            return res.status(401).json({ message: "Mot de passe incorrect" });
        }

        // Mettre à jour les informations de l'administrateur
        const updateQuery =
            "update admin set user_name = ? , email = ?, image = ?,password = ? where id = 1 and password = ?";
        await query(updateQuery, [
            user_name,
            email,
            image,
            password,
            oldpassword,
        ]);

        res.status(200).json({
            message: "Informations de l'administrateur mises à jour avec succès",
        });
    } catch (error) {
        console.error(
            "Erreur lors de la mise à jour des informations de l'administrateur:",
            error
        );
        res.status(500).json({
            message:
                "Une erreur est survenue lors de la mise à jour des informations de l'administrateur",
        });
    }
    console.log(req.body);
})


routeAdmin.get('/admin', (req, res) => {
    const sql = "SELECT * FROM admin";
    db.query(sql, (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur interne du serveur" });
        return res.json(result);
    });
});

routeAdmin.post('/login', (req, res) => {
    const { user_name, email, password } = req.body;

    const sql = "SELECT * FROM admin WHERE email = ?";
    db.query(sql, [email], (err, results) => {
        if (err) {
            res.status(500).json({ message: 'Erreur lors de la connexion' });
            return;
        }

        if (results.length > 0 && results[0].user_name === user_name && results[0].password === password) {
            res.send("connexion reussie");
        } else {
            res.send("Identifiants incorrects");
        }
    });
});




module.exports = routeAdmin;