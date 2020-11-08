const functions = require('firebase-functions');
const cors = require('cors');
require('dotenv').config();

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

async function detectLabels(encoded) {
    const vision = require('@google-cloud/vision');
    console.log('imported vision');

    const request = {
        image: {
            content: encoded
        }
    };
    console.log(encoded);

    const client = new vision.ImageAnnotatorClient();
    console.log('we have client');
    const [result] = await client.labelDetection(request);
    console.log('we have labels');
    const labels = result.labelAnnotations;

    let boiled = false;
    labels.forEach(label => {
        if(label.description.includes('Boiling')) {
            boiled = true;
        }
    });
    let str = boiled ? 'boiling' : 'not boiling';
    console.log('Your water is ' + str)
    return boiled;
}

exports.helloWorld = functions.https.onRequest((req, res) => {

res.set('Access-Control-Allow-Origin', '*');
res.set('Access-Control-Allow-Methods', 'GET, PUT, POST, OPTIONS');
res.set('Access-Control-Allow-Headers', '*');

 if (req.method === 'OPTIONS') {
     console.log('options');
     res.end();
}

else{
    console.log('getting labels');
  b = detectLabels(req.body.message);
  console.log(b);
  res.status(200).send({'water_boiled': b.toString()});
}
});
