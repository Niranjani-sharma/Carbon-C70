import mongoose from 'mongoose';
const AnalysisResultsSchema = new mongoose.Schema({
  _id: { type: mongoose.Schema.Types.ObjectId, auto: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'user', required: true },
  co2Emitted: { type: Number, required: true },
  co2EmittedMining: { type: Number, required: true },
  co2EmittedTransportation: { type: Number, required: true },
  co2EmittedOthers: { type: Number, required: true },
  co2Sink: { type: Number, required: true }, 
  gap: { type: Number, required: true },
  emissionPerCapita: { type: Number, required: true },
  date: { type: Date, default: Date.now },
}, { timestamps: true });

export default mongoose.model('AnalysisResult', AnalysisResultsSchema);