const express = require('express');
const generateId = express.Router();
const mysql = require('mysql2');
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'Ge_IT_Community'
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    process.exit(1);
  }
});

function generateInitials(name) {
  const nameParts = name.split(' ');
  return (nameParts[0][0] || '').toUpperCase() + (nameParts[1] ? nameParts[1][0].toUpperCase() : '');
}


function generateNumericPart(counter) {
  return counter.toString().padStart(5, '0');
}

function generateUserId(name, counter, year) {
  const initials = generateInitials(name);
  const numericPart = generateNumericPart(counter);
  return `${initials}-${numericPart}-${year}`;
}

generateId.post('/generate_id', (req, res) => {
  const { name, year } = req.body;

  if (!name || !year) {
    return res.status(400).json({ error: 'Name and year are required' });
  }

  db.beginTransaction((error) => {
    if (error) {
      console.error('Error starting transaction:', error);
      return res.status(500).json({ error: 'Failed to start transaction' });
    }

    db.query('SELECT counter FROM id_counters WHERE id = 1 FOR UPDATE', (error, rows) => {
      if (error) {
        return db.rollback(() => {
          console.error('Error retrieving counter:', error);
          res.status(500).json({ error: 'Failed to retrieve counter' });
        });
      }

      if (rows.length === 0) {
        db.query('INSERT INTO id_counters (counter) VALUES ( 1)', (error) => {
          if (error) {
            return db.rollback(() => {
              console.error('Error inserting initial counter:', error);
              res.status(500).json({ error: 'Failed to insert initial counter' });
            });
          }

          db.commit((error) => {
            if (error) {
              return db.rollback(() => {
                console.error('Error committing transaction:', error);
                res.status(500).json({ error: 'Failed to commit transaction' });
              });
            }

            const userId = generateUserId(name, 1, year);
            res.json({ user_id: userId });
          });
        });
      } else {
        
        const currentCounter = rows[0].counter;
        db.query('UPDATE id_counters SET counter = ? WHERE id = 1', [currentCounter + 1], (error) => {
          if (error) {
            return db.rollback(() => {
              console.error('Error updating counter:', error);
              res.status(500).json({ error: 'Failed to update counter' });
            });
          }

          db.commit((error) => {
            if (error) {
              return db.rollback(() => {
                console.error('Error committing transaction:', error);
                res.status(500).json({ error: 'Failed to commit transaction' });
              });
            }

            const userId = generateUserId(name, currentCounter + 1, year);
            res.json({ user_id: userId });
          });
        });
      }
    });
  });
});

module.exports = generateId;
