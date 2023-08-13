const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.woovi.com/api/v1/charge',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.app_id,
    },
    params: {
      app_id: bundle.authData.app_id,
    },
    body: {
      correlationID: bundle.inputData.correlationID,
      value: bundle.inputData.value,
      type: bundle.inputData.type,
      comment: bundle.inputData.comment && null,
      identifier: bundle.inputData.identifier,
      expiresIn: bundle.inputData.expiresIn,
      customer: bundle.inputData,
      daysForDueDate: bundle.inputData.daysForDueDate,
      daysAfterDueDate: bundle.inputData.daysAfterDueDate,
      interests: bundle.inputData.Interests,
      fines: bundle.inputData.fines && null,
    },
  };
  console.log({ a: bundle.inputData });
  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them
    console.log(results);
    return bundle.inputData;
    return results;
  });
};

module.exports = {
  display: {
    description: 'Creates a Charge for a customer',
    hidden: false,
    label: 'Create Charge',
  },
  key: 'create_charge',
  noun: 'Charge',
  operation: {
    inputFields: [
      {
        key: 'correlation',
        label: 'Correlation ID',
        type: 'string',
        helpText: 'Your correlation ID to keep track of this charge',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'value',
        label: 'Value',
        type: 'number',
        helpText: 'Value in cents of this charge',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'type',
        label: 'Type',
        type: 'string',
        helpText:
          'Charge type is used to determine whether a charge will have a deadline, fines and interests.',
        choices: ['OVERDUE', 'DYNAMIC'],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'comment',
        label: 'Comment',
        type: 'string',
        helpText: 'Comment to be added in infoPagador',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'identifier',
        label: 'Identifier',
        type: 'string',
        helpText: 'Custom identifier for EMV',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'expiresIn',
        label: 'Expires In',
        type: 'number',
        helpText: 'Expires the charge in seconds (minimum is 15 minutes)',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'customer',
        children: [
          {
            key: 'name',
            label: 'Name',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'email',
            label: 'Email',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'phone',
            label: 'Phone',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'correlationID',
            label: 'Correlation ID',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
        ],
        label: 'Customer',
        required: false,
        altersDynamicFields: false,
      },
      {
        key: 'daysForDueDate',
        label: 'Days for Due Date',
        type: 'string',
        helpText:
          'Time in days until the charge hits the deadline so fines and interests start applying. This property is only considered for charges of type OVERDUE',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'daysAfterDueDate',
        label: 'Days after Due Date',
        type: 'string',
        helpText:
          'Time in days that a charge is still payable after the deadline. This property is only considered for charges of type OVERDUE',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'Interests',
        children: [
          {
            key: 'interest_value',
            label: 'Value',
            type: 'number',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
        ],
        label: 'interests',
        required: false,
        altersDynamicFields: false,
      },
      {
        key: 'fines',
        children: [
          {
            key: 'fines_value',
            label: 'Value',
            type: 'number',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
        ],
        label: 'Fines',
        required: false,
        altersDynamicFields: false,
      },
    ],
    perform: perform,
    sample: {
      charge: {
        status: 'ACTIVE',
        customer: {
          name: 'Dan',
          email: 'email0@example.com',
          phone: '5511999999999',
          taxID: { taxID: '31324227036', type: 'BR:CPF' },
        },
        value: 100,
        comment: 'good',
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        paymentLinkID: '7777a23s-6f71-427a-bf00-241681624586',
        paymentLinkUrl:
          'https://openpix.com.br/pay/9134e286-6f71-427a-bf00-241681624586',
        qrCodeImage:
          'https://api.openpix.com.br/openpix/charge/brcode/image/9134e286-6f71-427a-bf00-241681624586.png',
        expiresIn: 2592000,
        expiresDate: '2021-04-01T17:28:51.882Z',
        createdAt: '2021-03-02T17:28:51.882Z',
        updatedAt: '2021-03-02T17:28:51.882Z',
        brCode:
          '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
        additionalInfo: [
          { key: 'Product', value: 'Pencil' },
          { key: 'Invoice', value: '18476' },
          { key: 'Order', value: '302' },
        ],
      },
    },
    outputFields: [
      { key: 'charge__status' },
      { key: 'charge__customer__name' },
      { key: 'charge__customer__email' },
      { key: 'charge__customer__phone' },
      { key: 'charge__customer__taxID__taxID' },
      { key: 'charge__customer__taxID__type' },
      { key: 'charge__value' },
      { key: 'charge__comment' },
      { key: 'charge__correlationID' },
      { key: 'charge__paymentLinkID' },
      { key: 'charge__paymentLinkUrl' },
      { key: 'charge__qrCodeImage' },
      { key: 'charge__expiresIn' },
      { key: 'charge__expiresDate' },
      { key: 'charge__createdAt' },
      { key: 'charge__updatedAt' },
      { key: 'charge__brCode' },
      { key: 'charge__additionalInfo[]key' },
      { key: 'charge__additionalInfo[]value' },
    ],
  },
};
