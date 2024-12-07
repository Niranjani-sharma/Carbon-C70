import express from 'express';
import {
  getApplicants,
  getBidsLastFiveMonths,
  postBid,
  getLastFiveSuccessfulTransactions,
  updateBidStatus,
  postApplication,
  updateApplicationStatus,
  getBidById // Add this import
} from '../controllers/bidsController.js';

const router = express.Router();

// Define more specific routes first
router.get('/last-five-months', getBidsLastFiveMonths);
router.get('/successful-transactions', getLastFiveSuccessfulTransactions);

// Then define routes with parameters
router.get('/applicants/:bidId', getApplicants);
router.post('/new', postBid);
router.put('/update-status/:bidId', updateBidStatus);
router.post('/:bidId/apply', postApplication);
router.patch('/:bidId/updateStatus', updateApplicationStatus);

// Define the general getBidById route last
router.get('/:bidId', getBidById);

export default router;