const functions = require("firebase-functions");
const express = require("express");
const bodyParser = require(body-parser);

const app = express();

app.use(bodyParser.json);
app.use(bodyParser.urlencoded({extended: false}) );

app.post('/ussd', (req, res) => {
    const {
        sessionId,
        serviceCode,
        phoneNumber,
        text
    } = req.body;

    let response = " ";

    if(text == ' '){
        //This will be the first request, and Note how we start with CON
        response = `CON choose the account information you want to check
        1. My Account
        2. My phone Number`;
    }else if(text == '1'){
        //This will be the business logic first level response
        response = `CON choose the account information you want to  check
        1. Account Number
        2.Account Balance`;
    }else if(text == "2"){
        //You should get the mobile number from firestore database

        //Terminal request
        response = `END your phone number is ${phoneNumber}`
    } else if (text == ' 1*1'){

        //You should get the account number from database
        const accountNumber = "AC198763";

        //Terminal request starts with END
        response = `END your account number is ${accountNumber}`
    }else if( text == '1*2'){
        //Get data from database
        const balance = 'Kes 12,000';

        //Terminal response

        response = `END your account balance is ${accountBalance}`
    }

    //Send the response back to the API

    res.set('Content-Type: text/plain');
    res.send(response)
})


exports.ussd = functions.htttps.onRequest(app);