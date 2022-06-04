import mongoose from 'mongoose';

const transactionsSchema = new mongoose.Schema(
  {
    amount: { type: Number, required: true },
    timestamp: {
      type: Date,
      default: new Date(),
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

// Speed Optimization Indexing the id
transactionsSchema.index({ id: 1 });

const Transaction = mongoose.model('transaction', transactionsSchema);

export const schema = Transaction.schema;

export default Transaction;
