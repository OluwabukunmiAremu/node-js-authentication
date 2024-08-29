import express from 'express';
import bcrypt from 'bcrypt';
import { User } from '../models/User.js';

const router = express.Router();

router.post('/signup', async (req, res) => {
     const { username, email, password } = req.body;

     try {
          const userEmailExists = await User.findOne({ email });
          const userNameExists = await User.findOne({ username });

          if (userEmailExists || userNameExists) {
               return res.status(400).json({ message: 'User already exists' });
          }

          const hashedPassword = await bcrypt.hash(password, 10);
          const newUser = new User({
               username,
               email,
               password: hashedPassword,
          });

          await newUser.save();

          return res.status(201).json({ message: 'User registered successfully' });
     } catch (err) {
          console.error(err);
          return res.status(500).json({ message: 'Internal server error' });
     }
});

export { router as UserRouter };
