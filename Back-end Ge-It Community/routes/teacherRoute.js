const express = require('express');
const routeTeacher = express.Router();
const db = require('../db');

routeTeacher.get('/teacher', (req, res) => {
    const sql = 'SELECT * FROM teacher;';
    db.query(sql, (error, resultat) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Erreur lors de la récupération des enseignants" });
        } else {
            res.status(200).json(resultat);
        }
    });
});

routeTeacher.get('/teacher/count', (req, res) => {
    const sql = 'SELECT COUNT(*) AS teacherCount FROM teacher;';
    db.query(sql, (error, resultat) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Erreur lors de la récupération du nombre d'enseignants" });
        } else {
            res.status(200).json({ count: resultat[0].teacherCount });
        }
    });
});

routeTeacher.post('/add_teacher', (req, res) => {
    let matricule = req.body.N_matricule
    let nom = req.body.nom
    let prenom = req.body.prenom
    let adresse = req.body.adresse;
    let grade = req.body.grade
    let tel = req.body.tel
    let email = req.body.email
    let password = req.body.password
    let speciality = req.body.specialite

    db.query('INSERT INTO teacher VALUES (?,?,?,?,?,?,?,?,?)',
        [matricule, nom, prenom, adresse, grade, tel, email, password, speciality], (error, resultat) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: "Erreur lors de l'ajout de l'enseignant" });
            } else {
                res.status(201).json({ message: "Enseignant ajouté avec succès" });
            }
        });
});

routeTeacher.put('/modify_teacher/:matricule', (req, res) => {
    const matricule = req.params.matricule;
    const { nom, prenom, adresse, grade, tel, specialite } = req.body;
  
    db.query('UPDATE teacher SET nom=?, prenom=?, adresse=?, grade=?, tel=?, specialite=? WHERE N_matricule=?',
      [nom, prenom, adresse, grade, tel, specialite, matricule], (error, results) => {
        if (error) {
          console.log(error);
          res.status(500).json({ error: "Erreur lors de la modification du professeurs" });
        } else {
          res.status(200).json({ message: "Modification avec succès" });
        }
      });
  });
  
  routeTeacher.get('/teacher/:matricule', (req, res) => {
    const sql = 'SELECT * FROM teacher WHERE N_matricule=?';
    const matricule = req.params.matricule

    db.query(sql,[matricule], (error, resultat) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Erreur lors de la récupération des enseignants" });
        } else {
            res.status(200).json(resultat);
        }
    });
});


routeTeacher.delete('/delete_teacher/:matricule', (req, res) => {
    let matricule = req.params.matricule;
    db.query("DELETE FROM teacher WHERE N_matricule = ?", [matricule], (error, resultat) => {
        if (error) {
            console.log(error);
            res.status(500).json({ error: "Erreur lors de la suppression de l'enseignant" });
        } else {
            res.status(200).json({ message: "Enseignant supprimé avec succès" });
        }
    });
});

module.exports = routeTeacher;
