import express from 'express';
import { getPaymentAmount, createPaymentRequest, handlePaymentSuccess } from '../controllers/paymentController.js';

const router = express.Router();

router.get('/getPaymentAmount', getPaymentAmount);
router.post('/createPaymentRequest', createPaymentRequest);
router.post('/handlePaymentSuccess', handlePaymentSuccess);

export default router;