import express from 'express';
import { createCompanyUser } from '../controllers/companyUserController.js';

const router = express.Router();

router.post('/register', createCompanyUser);

export default router;