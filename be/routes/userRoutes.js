import express from 'express';
import {Login, Signup, getProfile} from '../controllers/userControllers.js'
import { authMiddleware } from '../middleware/auth.js';

const router = express.Router();

router.get('/getProfile',authMiddleware, getProfile);
router.post('/signup', Signup);
router.post('/login', Login);

export default router;