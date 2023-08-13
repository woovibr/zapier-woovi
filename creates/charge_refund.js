const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.woovi.com/api/v1/refund',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.app_id,
    },
    body: {
      value: bundle.inputData.value,
      comment: bundle.inputData.comment,
      transactionEndToEndId: bundle.inputData.transactionEndToEndId,
      correlationID: bundle.inputData.correlation,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

module.exports = {
  display: {
    description: 'Creates a Refund request for a Charge',
    hidden: false,
    label: 'Create a Charge Refund',
  },
  key: 'charge_refund',
  noun: 'Charge Refund',
  operation: {
    inputFields: [
      {
        key: 'correlation',
        label: 'Refund CorrelationID',
        type: 'string',
        helpText: 'Your correlation ID to keep track for this refund',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'transactionEndToEndId',
        label: 'Transaction End to End ID',
        type: 'string',
        helpText:
          'Your transaction ID, or endToEnd ID, to keep track of this refund.',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'value',
        label: 'Value',
        type: 'number',
        helpText: 'Value in cents for this refund',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'comment',
        label: 'Comment',
        type: 'string',
        helpText: 'Comment for this refund. Maximum length of 140 characters.',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      refund: {
        status: 'IN_PROCESSING',
        value: 100,
        correlationID: 'a273e72c-9547-4c75-a213-3b0a2735b8d5',
        endToEndId: 'E23114447202304181826HJNwY577YDX',
        time: '2023-03-02T17:28:51.882Z',
        comment: 'Comentário do reembolso',
      },
    },
    outputFields: [
      { key: 'refund__status' },
      { key: 'refund__value' },
      { key: 'refund__correlationID' },
      { key: 'refund__endToEndId' },
      { key: 'refund__time' },
      { key: 'refund__comment' },
    ],
    perform: perform,
  },
};
