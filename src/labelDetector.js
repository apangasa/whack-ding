
async function detectLabels(encoded) {
    const vision = require('@google-cloud/vision');

    const request = {
        image: {
            content: encoded
        }
    };


    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection(request);
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

detectLabels(/*base 64 encoded image*/);
