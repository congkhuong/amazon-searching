import express from 'express';
import User from '../controller/User';

const router = express.Router();

router.get('/test', User.test);

export default router;
