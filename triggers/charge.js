const perform = async (z, bundle) => {
  return [bundle.cleanedRequest];
};

const performSubscribe = async (z, bundle) => {
  const options = {
    url: 'https://api.woovi.com/api/v1/webhook',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.app_id,
    },
    body: {
      name: bundle.inputData.name,
      event: bundle.inputData.event,
      url: bundle.targetUrl,
      isActive: bundle.inputData.isActive,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const performList = async (z, bundle) => {
  const options = {
    url: 'https://api.woovi.com/api/v1/webhook',
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.app_id,
    },
  };

  return z.request(options).then((response) => {
    response.throwForStatus();
    const results = response.json;

    // You can do any parsing you need for results here before returning them

    return results;
  });
};

const performUnsubscribe = async (z, bundle) => {
  const options = {
    url: 'https://api.woovi.com/api/v1/webhook',
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.app_id,
    },
    body: {
      hookUrl: bundle.subscribeData.id,
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
  operation: {
    perform: perform,
    inputFields: [
      {
        key: 'name',
        type: 'string',
        label: 'Webhook Name',
        helpText: 'The name of your new integration',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'event',
        type: 'string',
        label: 'Event type',
        helpText: 'The event that will trigger your integration',
        choices: [
          'OPENPIX:CHARGE_CREATED',
          'OPENPIX:CHARGE_COMPLETED',
          'OPENPIX:CHARGE_EXPIRED',
          'OPENPIX:TRANSACTION_RECEIVED',
          'OPENPIX:TRANSACTION_REFUND_RECEIVED',
          'OPENPIX:MOVEMENT_CONFIRMED',
          'OPENPIX:MOVEMENT_FAILED',
          'OPENPIX:MOVEMENT_REMOVED',
        ],
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'isActive',
        type: 'boolean',
        label: 'Is active?',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
    ],
    type: 'hook',
    performSubscribe: performSubscribe,
    sample: {
      charge: {
        status: 'COMPLETED',
        customer: {
          name: 'Julio',
          email: 'email0@example.com',
          phone: '5511999999999',
          taxID: { taxID: '31928282008', type: 'BR:CPF' },
          correlationID: '9134e286-6f71-427a-bf00-241681624586',
        },
        correlationID: '9134e286-6f71-427a-bf00-241681624586',
        transactionID: '9134e2866f71427abf00241681624586',
        brCode:
          '000201010212261060014br.gov.bcb.pix2584https://api.openpix.com.br/openpix/testing?transactionID=867ba5173c734202ac659721306b38c952040000530398654040.015802BR5909LOCALHOST6009Sao Paulo62360532867ba5173c734202ac659721306b38c963044BCA',
        createdAt: '2021-03-03T20:49:23.605Z',
        updatedAt: '2021-03-03T20:49:23.668Z',
      },
    },
    outputFields: [
      { key: 'charge__status' },
      { key: 'charge__customer__name' },
      { key: 'charge__customer__email' },
      { key: 'charge__customer__phone' },
      { key: 'charge__customer__taxID__taxID' },
      { key: 'charge__customer__taxID__type' },
      { key: 'charge__customer__correlationID' },
      { key: 'charge__correlationID' },
      { key: 'charge__transactionID' },
      { key: 'charge__brCode' },
      { key: 'charge__createdAt' },
      { key: 'charge__updatedAt' },
    ],
    performList: performList,
    performUnsubscribe: performUnsubscribe,
  },
  display: {
    description: 'Triggers when a webhook event is called.',
    hidden: false,
    label: 'New Webhook Event',
  },
  key: 'charge',
  noun: 'Webhook',
};
