import Instamojo from 'instamojo-nodejs';
import Wallet from '../models/Wallet.js';

Instamojo.setKeys('YOUR_API_KEY', 'YOUR_AUTH_KEY');
Instamojo.isSandboxMode(true); // Set to false in production

export const getPaymentAmount = (req, res) => {
  // Fetch the amount from your database or define a static amount
  const amount = 100; // Example amount
  res.json({ amount });
};

export const createPaymentRequest = (req, res) => {
  const { amount } = req.body;

  const data = new Instamojo.PaymentData();
  data.purpose = 'Add Credits';
  data.amount = amount;
  data.buyer_name = 'John Doe'; // Replace with actual user data
  data.redirect_url = 'http://yourdomain.com/payment-success';

  Instamojo.createPayment(data, (error, response) => {
    if (error) {
      res.status(500).json({ message: 'Error creating payment request', error });
    } else {
      res.json({ paymentRequest: response });
    }
  });
};

export const handlePaymentSuccess = async (req, res) => {
  const { payment_id, payment_request_id } = req.body;

  try {
    const response = await Instamojo.getPaymentDetails(payment_id);
    if (response.status === 'Credit') {
      const userId = response.buyer_phone; // Assuming userId is stored in buyer_phone
      const amount = parseFloat(response.amount);

      let wallet = await Wallet.findOne({ userId });

      if (!wallet) {
        wallet = new Wallet({
          userId,
          creditsEarned: 0,
          creditsRedeem: 0,
          time: new Date()
        });
      }

      wallet.creditsEarned += amount;
      wallet.time = new Date();

      await wallet.save();
      res.status(200).json(wallet);
    } else {
      res.status(400).json({ message: 'Payment not successful' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error handling payment success', error: error.message });
  }
};