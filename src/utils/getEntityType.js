const getEntityType = (transaction, id) => {
  return transaction.map((entity) => ({
    ...entity._doc,
    type:
      entity.origin === id
        ? 'Sent'
        : entity.destination === id
        ? 'Received'
        : '',
  }));
};
export default getEntityType;
