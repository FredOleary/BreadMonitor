var twilio = require('twilio');

var smsMessage ={};

var accountSid = 'ACcc2a05b91fc41b597b929b7a60dddb84'; // Your Account SID from www.twilio.com/console
var authToken = 'XXXXXXXXXXXX';   // Your Auth Token from www.twilio.com/console

smsMessage.sendMessage = ( message) =>{
    console.log("SmsMessage " + message);

    var client = new twilio(accountSid, authToken);

    client.messages.create({
        body: message,
        to: '+14086562041',  // Text this number
        from: '+18317099352' // From a valid Twilio number
    })
    .then((message) => console.log(message.sid))
    .catch((err) => console.log(err));
}
module.exports = smsMessage;