import express from 'express';
import meController from '../controller/meController.js';

const router = express.Router();

router.get('/', meController.me);

export default router;
