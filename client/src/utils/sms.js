const Nexmo = require('nexmo');

const nexmo = new Nexmo({
    apiKey: process.env.REACT_APP_NEXMO_API_KEY,
    apiSecret: process.env.REACT_APP_NEXMO_API_SECRET
})

const fromPhone = process.env.REACT_APP_NEXMO_FROM_NUMBER;

export default {
    sendSMS: (toPhone, message) => { nexmo.message.sendSms(fromPhone, "1" + toPhone, message, (err, responseData) => {
        if (err) {
            console.log(err);
        } else {
            if (responseData.messages[0]['status'] === "0") {
                console.log("Message sent successfully.");
            } else {
                console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
            }
        }
    })}
};