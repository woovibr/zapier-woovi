const authentication = require('./authentication');
const chargeTrigger = require('./triggers/charge.js');
const createChargeCreate = require('./creates/create_charge.js');
const deleteCreate = require('./creates/delete.js');
const createCustomerCreate = require('./creates/create_customer.js');
const chargeRefundCreate = require('./creates/charge_refund.js');

module.exports = {
  version: require('./package.json').version,
  platformVersion: require('zapier-platform-core').version,
  authentication: authentication,
  triggers: { [chargeTrigger.key]: chargeTrigger },
  creates: {
    [createChargeCreate.key]: createChargeCreate,
    [deleteCreate.key]: deleteCreate,
    [createCustomerCreate.key]: createCustomerCreate,
    [chargeRefundCreate.key]: chargeRefundCreate,
  },
};
