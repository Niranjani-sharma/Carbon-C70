import Bids from '../models/Bids.js';
import PreviousTransactions from '../models/previousTransactions.js';

// Get last Bid applicants for a particular Bid
export const getApplicants = async (req, res) => {
  try {
    const { bidId } = req.params;

    const bid = await Bids.findById(bidId).select('applicants');

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    const sortedApplicants = bid.applicants.sort((a, b) => b.date - a.date);
    res.json(sortedApplicants);
  } catch (error) {
    res.status(500).json({ message: "Error fetching applicants", error: error.message });
  }
};

// Get total number of Bids made in the last 5 months
export const getBidsLastFiveMonths = async (req, res) => {
  try {
    const fiveMonthsAgo = new Date();
    fiveMonthsAgo.setMonth(fiveMonthsAgo.getMonth() - 5);

    const result = await Bids.aggregate([
      {
        $match: {
          'applicants.date': { $gte: fiveMonthsAgo }
        }
      },
      {
        $unwind: '$applicants'
      },
      {
        $match: {
          'applicants.date': { $gte: fiveMonthsAgo }
        }
      },
      {
        $group: {
          _id: { 
            year: { $year: '$applicants.date' },
            month: { $month: '$applicants.date' }
          },
          count: { $sum: 1 }
        }
      },
      {
        $sort: { '_id.year': 1, '_id.month': 1 }
      }
    ]);

    const totalBids = result.reduce((sum, month) => sum + month.count, 0);

    res.json({ totalBids, monthlyBreakdown: result });
  } catch (error) {
    res.status(500).json({ message: "Error fetching bid count", error: error.message });
  }
};

// Post a new bid
export const postBid = async (req, res) => {
  try {
    const { name, carbonCredits, price } = req.body;

    const newBid = new Bids({
      name,
      success: false,
      active: true,
      carbonCredits,
      price,
      applicants: [] // Initialize with an empty array
    });

    await newBid.save();
    res.status(201).json(newBid);
  } catch (error) {
    res.status(500).json({ message: "Error posting bid", error: error.message });
  }
};

// Get last 5 successful transactions
export const getLastFiveSuccessfulTransactions = async (req, res) => {
  try {
    console.log("Fetching last 5 successful transactions");
    
    const successfulTransactions = await PreviousTransactions.find({ status: true })
      .sort({ date: -1 })
      .limit(5)
      .lean();

    console.log(`Found ${successfulTransactions.length} successful transactions`);

    if (successfulTransactions.length === 0) {
      // If no transactions are found, let's check if there are any successful bids
      const successfulBids = await Bids.find({ success: true })
        .sort({ updatedAt: -1 })
        .limit(5)
        .lean();

      console.log(`Found ${successfulBids.length} successful bids`);

      if (successfulBids.length > 0) {
        // If there are successful bids but no transactions, we might need to create transactions
        const transactions = successfulBids.map(bid => ({
          date: bid.updatedAt || new Date(),
          company: bid.applicants[0]?.contractorName || 'Unknown',
          status: true,
          credits: bid.carbonCredits,
          totalCredits: bid.carbonCredits, // This is a simplification, you might want to calculate this differently
          id: bid._id.toString() // Add this line to include the id
        }));

        await PreviousTransactions.insertMany(transactions);
        console.log(`Created ${transactions.length} new transactions`);

        res.json(transactions);
      } else {
        res.json([]);
      }
    } else {
      res.json(successfulTransactions);
    }
  } catch (error) {
    console.error("Error fetching successful transactions:", error);
    res.status(500).json({ message: "Error fetching successful transactions", error: error.message });
  }
};

// Update bid status and create previous transaction
export const updateBidStatus = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { success } = req.body;

    console.log(`Updating bid status for bidId: ${bidId} with success: ${success}`);

    const bid = await Bids.findById(bidId);

    if (!bid) {
      console.log("Bid not found");
      return res.status(404).json({ message: "Bid not found" });
    }

    bid.success = success;
    bid.active = !success;

    if (success) {
      if (bid.applicants.length === 0) {
        console.log("No applicants found for this bid");
        return res.status(400).json({ message: "No applicants found for this bid" });
      }

      // Find the successful applicant
      const successfulApplicant = bid.applicants.find(applicant => applicant.status === true);

      if (successfulApplicant) {
        console.log(`Creating new transaction for applicant ID: ${successfulApplicant.id}`);

        const totalCredits = await Bids.aggregate([
          { $match: { success: true } },
          { $unwind: '$applicants' },
          { $group: { _id: null, total: { $sum: '$applicants.credits' } } }
        ]);

        const newTransaction = new PreviousTransactions({
          date: new Date(),
          company: successfulApplicant.contractorName,
          status: true,
          credits: successfulApplicant.credits,
          totalCredits: totalCredits[0]?.total || successfulApplicant.credits,
          id: successfulApplicant.id
        });

        await newTransaction.save();
      } else {
        console.log("No successful applicant found for this bid");
        return res.status(400).json({ message: "No successful applicant found for this bid" });
      }
    }

    await bid.save();

    res.json(bid);
  } catch (error) {
    console.error("Error updating bid status:", error);
    res.status(500).json({ message: "Error updating bid status", error: error.message });
  }
};

// Post an application request and update the relevant bid
export const postApplication = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { contractorName, id, credits, city } = req.body;

    const bid = await Bids.findById(bidId);

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    if (!bid.active) {
      return res.status(400).json({ message: "This bid is no longer active" });
    }

    const newApplicant = {
      date: new Date(),
      contractorName,
      status: false,
      id,
      credits,
      city
    };

    // Use findByIdAndUpdate to ensure atomic operation
    const updatedBid = await Bids.findByIdAndUpdate(
      bidId,
      { $push: { applicants: newApplicant } },
      { new: true, runValidators: true }
    );

    if (!updatedBid) {
      return res.status(500).json({ message: "Failed to update bid with new applicant" });
    }

    res.status(201).json(updatedBid);
  } catch (error) {
    console.error("Error posting application:", error);
    res.status(500).json({ message: "Error posting application", error: error.message });
  }
};

// Update application status
export const updateApplicationStatus = async (req, res) => {
  try {
    const { bidId } = req.params;
    const { applicationId } = req.body;

    const bid = await Bids.findById(bidId);

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    // Find the applicant and update its status
    const applicant = bid.applicants.id(applicationId);

    if (!applicant) {
      return res.status(404).json({ message: "Application not found" });
    }

    // Set this applicant's status to true and all others to false
    bid.applicants.forEach(app => {
      app.status = app._id.toString() === applicationId;
    });

    // Update bid status
    bid.success = true;
    bid.active = false;

    await bid.save();

    // Create a new transaction for the successful applicant
    const totalCredits = await Bids.aggregate([
      { $match: { success: true } },
      { $unwind: '$applicants' },
      { $group: { _id: null, total: { $sum: '$applicants.credits' } } }
    ]);

    const newTransaction = new PreviousTransactions({
      date: new Date(),
      company: applicant.contractorName,
      status: true,
      credits: applicant.credits,
      totalCredits: totalCredits[0]?.total || applicant.credits,
      id: applicant.id
    });

    await newTransaction.save();

    res.json(bid);
  } catch (error) {
    console.error("Error updating application status:", error);
    res.status(500).json({ message: "Error updating application status", error: error.message });
  }
};

// Get bid by ID
export const getBidById = async (req, res) => {
  try {
    const { bidId } = req.params;
    const bid = await Bids.findById(bidId);

    if (!bid) {
      return res.status(404).json({ message: "Bid not found" });
    }

    res.json(bid);
  } catch (error) {
    res.status(500).json({ message: "Error fetching bid", error: error.message });
  }
};