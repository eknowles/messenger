const request = require('request');
const rp = require('request-promise');

function getUser(userId) {
  const data = {
    uri: `https://graph.facebook.com/v2.6/${userId}`,
    qs: {access_token: process.env.MESSENGER_PAGE_ACCESS_TOKEN},
    method: 'GET'
  };
  return rp(data);
}

function send(messageData) {
  const data = {
    uri: 'https://graph.facebook.com/v2.6/me/messages',
    qs: {access_token: process.env.MESSENGER_PAGE_ACCESS_TOKEN},
    method: 'POST',
    json: messageData
  };
  return rp(data);
}

function sendTextMessage(recipientId, message) {
  return send({recipient: {id: recipientId}, message: message});
}

function setTyping(recipientId, on=true) {
  return send({recipient: {id: recipientId}, sender_action: on ? 'typing_off' : 'typing_on'});
}

function markSeen(recipientId) {
  return send({recipient: {id: recipientId}, sender_action: 'mark_seen'});
}

module.exports = {
  getUser,
  markSeen,
  send,
  sendTextMessage,
  setTyping
};
