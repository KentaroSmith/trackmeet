var https = require('https');

var data = JSON.stringify({
    api_key: "9519aafd",
    api_secret: "iGeH0kMEFRzOrF54",
    to: "",
    from: "15628464795",
    text: 'Hello from Nexmo'
});

var options = {
    host: 'rest.nexmo.com',
    path: '/sms/json',
    port: 443,
    method: 'POST',
    headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(data)
    }
};

var req = https.request(options);

req.write(data);
req.end();

var responseData = '';
req.on('response', function (res) {
    res.on('data', function (chunk) {
        responseData += chunk;
    });

    res.on('end', function () {
        console.log(JSON.parse(responseData));
    });
});