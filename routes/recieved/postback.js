const fb = require('./../../lib/facebook');
const logger = require('./../../lib/logger');

/*
 * Postback Event
 *
 * This event is called when a postback is tapped on a Structured Message.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/postback-received
 *
 */
function receivedPostback(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var timeOfPostback = event.timestamp;

  // The 'payload' param is a developer-defined field which is set in a postback
  // button for Structured Messages.
  var payload = event.postback.payload;

  logger.info(`Received postback for user ${senderID} and page ${recipientID} with payload '${payload}' at ${timeOfPostback}`);

  // When a postback is called, we'll send a message back to the sender to
  // let them know it was successful
  fb.sendTextMessage(senderID, 'Postback called');
}

module.exports = receivedPostback;
