# Create a subscription testplan

## Creating a subscription
### Arrange
1. Have a spreadsheet for creating subscriptions with the following columns:
![Example spreadsheet](./__assets__/create-subscription-spreadsheet.png)

2. Adds one subscription row into spreadsheet.

3. Creates a Zap with a Google Sheets trigger for the "New Spreadsheet Row" event, configuring which spreadsheet will activate the trigger.

4. Adds a new Woovi action with the `Create Subscription` event.

5. Configure the action fields to match the values fetched from the worksheet columns:
![Configuring create-subscription action](./__assets__/configuring-create-subscription-action.png)

### Act
6. Click on _Test action_ button:
![Testing create-subscription action](./__assets__/create-subscription-test.png)

### Assert
7. There shouldn't be any errors as the API response, it should be a success response:
![Test result](./__assets__/create-subscription-test-result.png)