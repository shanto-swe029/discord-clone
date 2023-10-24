// pages/api/login.js
import connection from '../db/db.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import cookie from 'cookie';

export default (req, res) => {
  const { email, password } = req.body.userdata;

  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

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
            const token = jwt.sign({ email: user.email }, 'your_secret_key', { expiresIn: '1h' });

            res.setHeader('Set-Cookie', cookie.serialize('token', token, {
              httpOnly: true,
              maxAge: 3600, // 1 hour in seconds
              path: '/',
            }));

            res.status(200).json({ message: 'Login successful', email: user.email });
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
