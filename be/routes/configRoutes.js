import express from 'express';
import { getConfig } from '../controllers/configControllers.js';

const router = express.Router();

router.get('/getConfig', getConfig);

export default router;