const crypto = require('crypto');
const logger = require('./../lib/logger');
const Buffer = require('buffer').Buffer;

/*
 * Verify that the callback came from Facebook. Using the App Secret from
 * the App Dashboard, we can verify the signature that is sent with each
 * callback in the x-hub-signature field, located in the header.
 *
 * https://developers.facebook.com/docs/graph-api/webhooks#setup
 *
 */
exports.verifyRequestSignature = function (req, res, buf) {
  const signature = req.headers['x-hub-signature'];
  if (!signature) {
    // For testing, let's log an error. In production, you should throw an
    // error.
    logger.error('Couldn\'t validate the signature.');
  } else {
    [method, signatureHash] = signature.split('=');
    const keyBuf = Buffer.from(process.env.MESSENGER_APP_SECRET, 'utf8');
    const expectedHash = crypto.createHmac('sha1', keyBuf).update(buf).digest('hex');
    if (signatureHash != expectedHash) {
      throw new Error('Couldn\'t validate the request signature.');
    }
  }
};
