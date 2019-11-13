import React, { Component } from "react";
import TextInvite from './pages/notification';

require('dotenv').config({ path: __dirname + '/../.env' })

const NEXMO_API_KEY = process.env.NEXMO_API_KEY
const NEXMO_API_SECRET = process.env.NEXMO_API_SECRET
const TO_NUMBER = process.env.NEXMO_TO_NUMBER
const FROM_NUMBER = process.env.NEXMO_FROM_NUMBER

const Nexmo = require('nexmo')

const nexmo = new Nexmo({
    apiKey: "9519aafd",
    apiSecret: "iGeH0kMEFRzOrF54"
})

const from = 15628464795
const to = 19132066963
const text = "A text message sent using the Nexmo SMS API"

nexmo.message.sendSms(({ TextInvite }), (err, responseData) => {
    if (err) {
        console.log(err);
    } else {
        if (responseData.messages[0]['status'] === "0") {
            console.log("Message sent successfully.");
        } else {
            console.log(`Message failed with error: ${responseData.messages[0]['error-text']}`);
        }
    }
})