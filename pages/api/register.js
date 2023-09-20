// pages/api/register.js
import connection from "../db/db.js";
import bcrypt from 'bcrypt';

export default (req, res) => {
  const { email, displayName, username, password, dob } = req.body.credentials;

  // Check if the email already exists in the database
  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }

      // If a user with this email already exists, return an error
      if (results.length > 0) {
        res.status(400).json({ error: 'Email already exists' });
        return;
      }

      // Generate a salt and hash the password
      bcrypt.hash(password, 10, (error, hashedPassword) => {
        if (error) {
          res.status(500).json({ error: 'Password hashing failed' });
          return;
        }

        // Insert the user into the database
        connection.query(
          'INSERT INTO users (email, displayName, username, password, dateOfBirth) VALUES (?, ?, ?, ?, ?)',
          [email, displayName, username, hashedPassword, dob],
          (error, results) => {
            if (error) {
              res.status(500).json({ error: error.message });
              return;
            }

            if (results.affectedRows === 1) {
              res.status(200).json({ message: 'Registration successful' });
            } else {
              res.status(500).json({ error: 'Registration failed' });
            }
          }
        );
      });
    }
  );
};
