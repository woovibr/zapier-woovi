const perform = async (z, bundle) => {
  const options = {
    url: `https://api.woovi.com/api/v1/charge/${bundle.inputData.charge}`,
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.app_id,
    },
    params: {
      app_id: bundle.authData.app_id,
    },
    body: {},
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
    description: 'Deletes a charge from the system',
    hidden: false,
    label: 'Delete a Charge',
  },
  key: 'delete',
  noun: 'Delete Charge',
  operation: {
    inputFields: [
      {
        key: 'charge',
        label: 'id',
        type: 'string',
        helpText:
          'charge ID or correlation ID. You will need URI encoding if your correlation ID has characters outside the ASCII set or reserved characters (%, #, /).',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
    ],
    sample: { status: 'OK', id: 'fe7834b4060c488a9b0f89811be5f5cf' },
    outputFields: [{ key: 'status' }, { key: 'id' }],
    perform: perform,
  },
};
