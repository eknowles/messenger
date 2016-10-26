const fb = require('./../../lib/facebook');
const logger = require('./../../lib/logger');

/*
 * Delivery Confirmation Event
 *
 * This event is sent to confirm the delivery of a message. Read more about
 * these fields at https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-delivered
 *
 */
function receivedDeliveryConfirmation(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;
  var delivery = event.delivery;
  var messageIDs = delivery.mids;
  var watermark = delivery.watermark;
  var sequenceNumber = delivery.seq;

  if (messageIDs) {
    messageIDs.forEach(function (messageID) {
      logger.info(`Received delivery confirmation for message ID: ${messageID}`);
    });
  }

  logger.info(`All message before ${watermark} were delivered.`);
}

module.exports = receivedDeliveryConfirmation;
