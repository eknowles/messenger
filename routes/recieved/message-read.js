const fb = require('./../../lib/facebook');
const logger = require('./../../lib/logger');

/*
 * Message Read Event
 *
 * This event is called when a previously-sent message has been read.
 * https://developers.facebook.com/docs/messenger-platform/webhook-reference/message-read
 *
 */
function receivedMessageRead(event) {
  var senderID = event.sender.id;
  var recipientID = event.recipient.id;

  // All messages before watermark (a timestamp) or sequence have been seen.
  var watermark = event.read.watermark;
  var sequenceNumber = event.read.seq;

  logger.info(`Received message read event for watermark ${watermark} and sequence number ${sequenceNumber}`);
}

module.exports = receivedMessageRead;
