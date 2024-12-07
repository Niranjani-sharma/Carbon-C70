import express from 'express';
import {
  getLastSixMonthsData,
  getTotalCredits,
  postEarnedCredits,
  redeemCredits
} from '../controllers/walletController.js';

const router = express.Router();

router.get('/:userId/last-six-months', getLastSixMonthsData);
router.get('/:userId/total-credits', getTotalCredits);
router.post('/:userId/earn', postEarnedCredits);
router.post('/:userId/redeem', redeemCredits);

export default router;