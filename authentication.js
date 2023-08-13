module.exports = {
  type: 'custom',
  test: {
    headers: {
      Authorization: '{{bundle.authData.app_id}}',
      'X-APP-ID': '{{bundle.authData.app_id}}',
      'X-APP-NAME': '{{bundle.authData.app_name}}',
    },
    params: {
      app_id: '{{bundle.authData.app_id}}',
      app_name: '{{bundle.authData.app_name}}',
    },
    url: 'https://api.woovi.com/api/v1/charge',
  },
  fields: [
    {
      computed: false,
      key: 'app_id',
      required: true,
      label: 'AppID',
      type: 'string',
      helpText:
        'This is the id of your Woovi app check how to use it here https://developers.woovi.com/docs/apis/api-getting-started',
    },
    {
      computed: false,
      key: 'app_name',
      required: true,
      label: 'App Name',
      type: 'string',
      helpText:
        'Name your app for distinguishing between accounts.\n\n[Learn more](https://platform.zapier.com/publish/integration-publishing-guidelines#33-connection-label).',
    },
  ],
  customConfig: {},
  connectionLabel: '{{bundle.authData.app_name}}',
};
