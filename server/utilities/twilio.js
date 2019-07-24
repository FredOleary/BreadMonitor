var twilio = require('twilio');
var twiloAuth = require('./twiloAuth');
var smsMessage ={};

smsMessage.sendMessage = ( message) =>{
    console.log("SmsMessage " + message);

    var client = new twilio(twiloAuth.accountSid, twiloAuth.authToken);

    client.messages.create({
        body: message,
        to: '+14086562041',  // Text this number
        from: '+18317099352' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
}
module.exports = smsMessage;