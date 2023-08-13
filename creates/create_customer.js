const perform = async (z, bundle) => {
  const options = {
    url: 'https://api.woovi.com/api/v1/customer',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: bundle.authData.app_id,
    },
    body: {
      name: bundle.inputData.name,
      email: bundle.inputData.email,
      phone: bundle.inputData.phone,
      correlationID: bundle.inputData.correlationID,
      address: {
        zipcode: bundle.inputData.zipcode,
        street: bundle.inputData.street,
        number: bundle.inputData.number,
        neighborhood: bundle.inputData.neighborhood,
        city: bundle.inputData.city,
        state: bundle.inputData.state,
        complement: bundle.inputData.complement,
        country: bundle.inputData.country,
      },
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
    description: 'Creates a Customer in the system',
    hidden: false,
    label: 'Create Customer',
  },
  key: 'create_customer',
  noun: 'Customer',
  operation: {
    inputFields: [
      {
        key: 'name',
        label: 'Name',
        type: 'string',
        helpText: 'Name of the customer',
        required: true,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'email',
        label: 'Email',
        type: 'string',
        helpText: 'Email of the customer',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'phone',
        label: 'Phone',
        type: 'string',
        helpText: 'Phone number of the customer',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'correlationID',
        label: 'CorrelationID',
        type: 'string',
        helpText: 'Your correlation ID to keep track of this customer',
        required: false,
        list: false,
        altersDynamicFields: false,
      },
      {
        key: 'address',
        children: [
          {
            key: 'zipcode',
            label: 'Zip Code',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'street',
            label: 'Street',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'number',
            label: 'Number',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'neighborhood',
            label: 'Neighborhood',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'city',
            label: 'City',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'complement',
            label: 'Complement',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'country',
            label: 'Country',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
          {
            key: 'state',
            label: 'State',
            type: 'string',
            required: false,
            list: false,
            altersDynamicFields: false,
          },
        ],
        label: 'Address',
        required: false,
        altersDynamicFields: false,
      },
    ],
    sample: {
      customer: {
        name: 'Dan',
        email: 'email0@example.com',
        phone: '5511999999999',
        taxID: { taxID: '31324227036', type: 'BR:CPF' },
        address: {
          zipcode: '30421322',
          street: 'Street',
          number: '100',
          neighborhood: 'Neighborhood',
          city: 'Belo Horizonte',
          state: 'MG',
          complement: 'APTO',
          country: 'BR',
        },
      },
    },
    outputFields: [
      { key: 'customer__name' },
      { key: 'customer__email' },
      { key: 'customer__phone' },
      { key: 'customer__taxID__taxID' },
      { key: 'customer__taxID__type' },
      { key: 'customer__address__zipcode' },
      { key: 'customer__address__street' },
      { key: 'customer__address__number' },
      { key: 'customer__address__neighborhood' },
      { key: 'customer__address__city' },
      { key: 'customer__address__state' },
      { key: 'customer__address__complement' },
      { key: 'customer__address__country' },
    ],
    perform: perform,
  },
};
