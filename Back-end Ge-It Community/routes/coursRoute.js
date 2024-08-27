const express = require('express');
const routeCours = express.Router();
const db = require('../db');

// Fonction pour récupérer tous les cours
routeCours.get('/cours', (req, res) => {
  db.query('SELECT * FROM cours', (erreur, resultat) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).json({ error: "Erreur lors de la récupération des cours" });
    } else {
      res.status(200).json({ cours: resultat });
    }
  });
});

routeCours.get('/cours/count', (req, res) => {
  const sql = 'SELECT COUNT(*) AS coursCount FROM cours;';
  db.query(sql, (error, resultat) => {
      if (error) {
          console.log(error);
          res.status(500).json({ error: "Erreur lors de la récupération du nombre de cours" });
      } else {
          res.status(200).json({ count: resultat[0].coursCount });
      }
  });
});


// Fonction pour récupérer les cours avec les enseignants associés
routeCours.get('/cours/affichage', (req, res) => {
  db.query('SELECT * FROM cours JOIN teacher ON cours.id_prof = teacher.N_matricule', (erreur, resultat) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).json({ error: "Erreur lors de la récupération des cours avec les enseignants" });
    } else {
      res.status(200).json({ cours: resultat });
    }
  });
});


routeCours.get('/cours/:id_cours', (req, res) => {
  const sql = 'SELECT * FROM cours WHERE id_cours=?';
  const id_cours = req.params.id_cours

  db.query(sql,[id_cours], (error, resultat) => {
      if (error) {
          console.log(error);
          res.status(500).json({ error: "Erreur lors de la récupération des cours" });
      } else {
          res.status(200).json(resultat);
      }
  });
});

// Fonction pour ajouter un cours
routeCours.post('/add_cours', (req, res) => {
  const { titre_cours, description, heure_total, level, id_prof,heure_semaine,heure_effectue } = req.body;

  db.query('INSERT INTO cours (titre_cours, description, heure_total, level, id_prof,heure_semaine,heure_effectue) VALUES (?, ?, ?, ?, ?, ?,?)',
    [titre_cours, description, heure_total, level, id_prof,heure_semaine,heure_effectue], (erreur, resultat) => {
      if (erreur) {
        console.log(erreur);
        res.status(500).json({ error: "Erreur lors de l'ajout du cours" });
      } else {
       
        res.status(201).json({ message: "Cours ajouté avec succès" });
      }
    });
});

// Fonction pour modifier un cours
routeCours.put('/modify_cours/:id_cours', (req, res) => {
  const id_cours = req.params.id_cours;
  const { titre_cours, description, heure_total, level, id_prof,heure_semaine, heure_effectue } = req.body;

  db.query('UPDATE cours SET titre_cours=?, description=?, heure_total=?, level=?, id_prof=?,heure_semaine=?, heure_effectue=? WHERE id_cours=?',
    [titre_cours, description, heure_total, level, id_prof,heure_semaine,heure_effectue, id_cours], (erreur, resultat) => {
      if (erreur) {
        console.log(erreur);
        res.status(500).json({ error: "Erreur lors de la modification du cours" });
      } else {
        res.status(200).json({ message: "Cours modifié avec succès" });
      }
    });
});

// Fonction pour supprimer un cours
routeCours.delete('/cours/affichage/:id_cours', (req, res) => {
  const id_cours = req.params.id_cours;

  db.query("DELETE FROM cours WHERE id_cours = ?", [id_cours], (erreur, resultat) => {
    if (erreur) {
      console.log(erreur);
      res.status(500).json({ error: "Erreur lors de la suppression du cours" });
    } else {
      res.status(200).json({ message: "Cours supprimé avec succès" });
    }
  });
});

module.exports = routeCours;
