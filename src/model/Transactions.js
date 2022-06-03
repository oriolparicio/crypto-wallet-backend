import mongoose from 'mongoose';

const transactionsSchema = new mongoose.Schema(
  {
    // _id: {
    //   type: mongoose.Schema.Types.ObjectId,
    //   default: mongoose.Types.ObjectId(),
    //   unique: true,
    // },
    amount: { type: Number, required: true },
    timestamp: {
      type: Date,
      default: Date.now(),
      required: true,
    },
    origin: { type: String },
    destination: { type: String },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Speed Optimization Indexing the timestamp
// transactionsSchema.index({ _id: 1 });

const Transaction = mongoose.model('transaction', transactionsSchema);

export const schema = Transaction.schema;

export default Transaction;
