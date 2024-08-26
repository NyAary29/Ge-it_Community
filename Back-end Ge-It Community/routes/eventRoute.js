const express = require('express');
const routeEvent = express.Router();
const db = require('../db');


function sanitizeInput(input) {
    return input === undefined ? null : input;
}

routeEvent.get('/events', (req, res) => {
    db.query("SELECT * FROM events", (erreur, resultat) => {
        if (erreur) {
            console.log(erreur);
            res.status(500).json({ error: "Erreur lors de la récupération des Events." });
        } else {
            res.status(200).json(resultat);
        }
    });
});

routeEvent.get("/events/:id", (req, res) => {
    const id = req.params.id;
    if (id == "mondays") {
        db.query(
            `SELECT DISTINCT DATE(date - INTERVAL (WEEKDAY(date)) DAY) AS date 
   FROM events 
   WHERE DATE(date) BETWEEN DATE(date - INTERVAL (WEEKDAY(date)) DAY) 
   AND DATE(date - INTERVAL (WEEKDAY(date) - 5) DAY) 
   ORDER BY date`,
            (error, result) => {
                if (error) {
                    console.log(error);
                    res.status(500).json({ error: "Erreur lors de la récupération des Lundis" });
                } else {
                    res.status(200).json(result);
                }
            }
        );

    } else {
        db.query("SELECT * FROM events WHERE id = ? ", id, (error, result) => {
            if (error) {
                console.log(error);
                res.status(500).json({ error: "Erreur lors de la récupération de l'Event" });
            } else {
                res.status(200).json(result);
            }
        })
    }

})

routeEvent.get('/events/getEventsByWeek/:start_date', (req, res) => {
    const start_date = req.params.start_date;
    const end_date = new Date(start_date);
    end_date.setDate(end_date.getDate() + 6);
    const formattedEndDate = end_date.toISOString().split('T')[0];

    console.log("Fetching events from", start_date, "to", formattedEndDate);

    db.query("SELECT * FROM events WHERE date BETWEEN ? AND ?", [start_date, end_date], (erreur, resultat) => {
        if (erreur) {
            console.log(erreur);
            res.status(500).json({ error: "Erreur lors de la récupération des Events." });
        } else {
            res.status(200).json(resultat);
        }
    })
})

routeEvent.post("/events", (req, res) => {
    const { title, description, date, location, start_hour, end_hour } = req.body;

    db.query('INSERT INTO events (title, description, date, location, start_hour, end_hour) VALUES (?, ?, ?, ?, ?, ?)', [sanitizeInput(title), sanitizeInput(description), sanitizeInput(date), sanitizeInput(location), sanitizeInput(start_hour), sanitizeInput(end_hour)], (erreur, resultat) => {
        if (erreur) {
            console.log(erreur);
            res.status(500).json({ error: "Erreur lors de l'ajout de l'Event" });
        } else {

            res.status(201).json({ message: "Event ajouté avec succès" });
        }
    })
})

routeEvent.put("/events/:id", (req, res) => {
    const id = req.params.id
    const { title, description, date, location, start_hour, end_hour } = req.body;

    db.query(
        'UPDATE events SET title = ?, description = ?, date = ?, location = ?, start_hour = ?, end_hour =? WHERE id = ?',
        [sanitizeInput(title), sanitizeInput(description), sanitizeInput(date), sanitizeInput(location), sanitizeInput(start_hour), sanitizeInput(end_hour), id],
        (erreur, resultat) => {
            if (erreur) {
                console.log(erreur);
                res.status(500).json({ error: "Erreur lors de la modification de l'Event" });
            } else {
                res.status(200).json({ message: "Event modifié avec succès" });
            }
        }
    )
})

routeEvent.delete("/events/:id", (req, res) => {
    const id = req.params.id;

    db.query("DELETE FROM events WHERE id = ?", id, (erreur, resultat) => {
        if (erreur) {
            console.log(erreur);
            res.status(500).json({ error: "Erreur lors de la suppression de l'EVENT" });
        } else {
            res.status(200).json({ message: "Event supprimé avec succès" });
        }
    })
})


module.exports = routeEvent;