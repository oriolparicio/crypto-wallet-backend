import Transaction from '../model/Transactions.js';
import APIError from '../utils/apiError.js';

import getEntityType from '../utils/getEntityType.js';

/**
 * Gets user transactions.
 */
const getUserTransactions = async (req, res, next) => {
  let id = req.params.id;
  let transaction = await Transaction.find({
    $or: [{ origin: id }, { destination: id }],
  })
    .sort({ timestamp: 'desc' })
    .exec();
  if (!transaction) {
    throw new APIError('Document not found', 404);
  }

  // Map objects array pushing type of transaction
  let transactionsMapped = getEntityType(transaction, id);

  // Response
  res.status(200).send({
    status: 'success',
    data: transactionsMapped,
  });
};

/**
 * Post transactions.
 */
const postTransaction = async (req, res, next) => {
  let body = req.body;

  let transaction = await Transaction.create(body);
  if (!transaction) {
    throw new APIError('Failed to create transaction', 500);
  }
  console.log(transaction);

  // Response
  return res.status(201).send({
    status: 'success',
    data: transaction,
  });
};

export { getUserTransactions, postTransaction };
