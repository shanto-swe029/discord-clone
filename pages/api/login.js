// pages/api/login.js
import connection from '../db/db.js';
import bcrypt from 'bcrypt'

export default (req, res) => {
  const { email, password } = req.body.userdata;

  connection.query(
    'SELECT * FROM users WHERE email = ?',
    [email],
    (error, results) => {
      if (error) {
        res.status(500).json({ error: error.message });
        return;
      }
  
      if (results.length === 1) {
        const user = results[0];
        bcrypt.compare(password, user.password, (error, isMatch) => {
          if (error) {
            res.status(500).json({ error: 'Password comparison failed' });
            return;
          }
  
          if (isMatch) {
            res.status(200).json({ message: 'Login successful' });
          } else {
            res.status(401).json({ message: 'Invalid credentials' });
          }
        });
      } else {
        res.status(401).json({ message: 'Invalid credentials' });
      }
    }
  );

};
