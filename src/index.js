/**
 * Responds to any HTTP request.
 *
 * @param {!express:Request} req HTTP request context.
 * @param {!express:Response} res HTTP response context.
 */
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


exports.analyzeImage = (req, res) => {
  b = detectLabels(req.body.message);
  res.status(200).send(b);
};
