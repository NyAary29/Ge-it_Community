const express = require('express')
const routeStudent = express.Router();
const db = require('../db');

routeStudent.get('/student', (req, res) => {
  const sql = 'SELECT * FROM student;';
  db.query(sql, (error, resultat) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de la récupération des étudiants" });
    } else {
      res.status(200).json(resultat);
    }
  });
});


routeStudent.get('/student/count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS studentCount FROM student;';
  db.query(sql, (error, resultat) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de la récupération du nombre d'étudiants" });
    } else {
      res.status(200).json({ count: resultat[0].studentCount });
    }
  });
});

routeStudent.get("/students/level", (req,res) => {
  const sql = "SELECT DISTINCT niveau from student "
  db.query(sql, (error, resultat) => {
    if (error) {
      console.log(error);
    }
    else {
      res.status(200).json(resultat)
    }
  })
})

routeStudent.post('/add_student', (req, res) => {
  const { N_matricule, nom, prenom, adresse, birthday, tel, email, password, niveau, sexe } = req.body;

  db.query('INSERT INTO student (N_matricule, nom, prenom, adresse, birthday, tel, email, password, niveau, sexe) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
    [N_matricule, nom, prenom, adresse, birthday, tel, email, password, niveau, sexe], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de l'ajout de l'étudiant" });
      } else {
        res.status(201).json({ message: "Étudiant ajouté avec succès" });
      }
    });
});

routeStudent.put('/modify_student/:matricule', (req, res) => {
  const matricule = req.params.matricule;
  const { nom, prenom, adresse, birthday, tel, email, password, niveau, sexe } = req.body;

  db.query('UPDATE student SET nom=?, prenom=?, adresse=?, birthday=?, tel=?, email=?, password=?, niveau=?, sexe=? WHERE N_matricule=?',
    [nom, prenom, adresse, birthday, tel, email, password, niveau, sexe, matricule], (error, results) => {
      if (error) {
        console.log(error);
        res.status(500).json({ error: "Erreur lors de la modification de l'étudiant" });
      } else {
        res.status(200).json({ message: "Étudiant modifié avec succès" });
      }
    });
});

routeStudent.get('/student/:matricule', (req, res) => {
  const matricule = req.params.matricule;
  const sql = 'SELECT * FROM student WHERE N_matricule=?'
 
  db.query(sql,[matricule], (error, resultat) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de la récupération des étudiants" });
    } else {
      res.status(200).json(resultat);
    }
  });
});

routeStudent.delete('/delete_student/:matricule', (req, res) => {
  const matricule = req.params.matricule;

  db.query("DELETE FROM student WHERE N_matricule = ?", [matricule], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).json({ error: "Erreur lors de la suppression de l'étudiant" });
    } else {
      res.status(200).json({ message: "Étudiant supprimé avec succès" });
    }
  });
});

module.exports = routeStudent