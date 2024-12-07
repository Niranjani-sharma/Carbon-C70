import mongoose from 'mongoose';

const previousTransactionsSchema = new mongoose.Schema({
    date: { type: Date, required: true },
    company: { type: String, required: true },
    status: { type: Boolean, required: true },  // Picked from Bids.applicant.status where status = true
    credits: { type: Number, required: true },  // Picked from Bids.applicant.credits
    totalCredits: { type: Number, required: true },  // Sum of credits from Bids where success = true
    id: { type: String, required: true } // Add this line
});

const PreviousTransactions = mongoose.model("PreviousTransactions", previousTransactionsSchema);

export default PreviousTransactions;