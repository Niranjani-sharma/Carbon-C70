import Wallet from '../models/Wallet.js';

// Fetch last 6 months data for Credits Redeemed and Earned
export const getLastSixMonthsData = async (req, res) => {
  try {
    const { userId } = req.params;
    const sixMonthsAgo = new Date();
    sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

    const walletData = await Wallet.aggregate([
      { $match: { userId: userId, time: { $gte: sixMonthsAgo } } },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m", date: "$time" } },
          creditsEarned: { $sum: "$creditsEarned" },
          creditsRedeemed: { $sum: "$creditsRedeem" }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json(walletData);
  } catch (error) {
    res.status(500).json({ message: "Error fetching wallet data", error: error.message });
  }
};

// Fetch total Credits Earned and Redeemed (all time)
export const getTotalCredits = async (req, res) => {
  try {
    const { userId } = req.params;
    const totalCredits = await Wallet.aggregate([
      { $match: { userId: userId } },
      {
        $group: {
          _id: null,
          totalEarned: { $sum: "$creditsEarned" },
          totalRedeemed: { $sum: "$creditsRedeem" }
        }
      }
    ]);

    res.json(totalCredits[0] || { totalEarned: 0, totalRedeemed: 0 });
  } catch (error) {
    res.status(500).json({ message: "Error fetching total credits", error: error.message });
  }
};

// Post Earned Credits in the Wallet
export const postEarnedCredits = async (req, res) => {
  try {
    const { userId } = req.params;
    const { creditsEarned } = req.body;

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      wallet = new Wallet({
        userId,
        creditsEarned: 0,
        creditsRedeem: 0,
        time: new Date()
      });
    }

    wallet.creditsEarned += creditsEarned;
    wallet.time = new Date();

    await wallet.save();
    res.status(200).json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Error posting earned credits", error: error.message });
  }
};

// Redeem Earned Credits from the Wallet
export const redeemCredits = async (req, res) => {
  try {
    const { userId } = req.params;
    const { creditsToRedeem } = req.body;

    let wallet = await Wallet.findOne({ userId });

    if (!wallet) {
      return res.status(404).json({ message: "Wallet not found for this user" });
    }

    const availableCredits = wallet.creditsEarned - wallet.creditsRedeem;

    if (availableCredits < creditsToRedeem) {
      return res.status(400).json({ message: "Insufficient credits" });
    }

    wallet.creditsRedeem += creditsToRedeem;
    wallet.time = new Date();

    await wallet.save();
    res.json(wallet);
  } catch (error) {
    res.status(500).json({ message: "Error redeeming credits", error: error.message });
  }
};