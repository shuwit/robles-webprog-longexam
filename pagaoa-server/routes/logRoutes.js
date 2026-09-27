import express from 'express';
import { getLogs } from '../controllers/logController.js';
import authentication from '../middleware/authentication.js';
import authorize from '../middleware/authorization.js';

const router = express.Router();

router.get('/', authentication, authorize('Admin'), getLogs);

export default router;
