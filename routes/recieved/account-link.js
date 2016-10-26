const fb = require('./../../lib/facebook');
const logger = require('./../../lib/logger');

/*
 * Account Link Event
 *
 * This event is called when the Link Account or UnLink Account action has been
 * tapped.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/account-linking
 *
 */
function receivedAccountLink(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  var status = event.account_linking.status;
  var authCode = event.account_linking.authorization_code;

  logger.info(`Received account link event with for user ${senderID} with status  ${status} and auth code ${authCode}`);
}

module.exports = receivedAccountLink;
