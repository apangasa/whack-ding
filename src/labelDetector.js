
async function detectLabels(path) {
    const vision = require('@google-cloud/vision');

    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection(path);
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

detectLabels('C:\\Users\\arnav\\OneDrive - University of Florida\\whack-ding\\resources\\water9.jpg');
