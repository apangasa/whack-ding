
async function detectLabels(path) {
    const vision = require('@google-cloud/vision');
    var fs = require('fs');
    var imageFile = fs.readFileSync(path);

    var encoded = Buffer.from(imageFile).toString('base64');
    console.log(typeof encoded)

    let request_body_json = {
        "requests":[
            {
              "image":{
                "content":encoded
              },
              "features":[
                {
                  "type":"LABEL_DETECTION",
                  "maxResults":1
                }
              ]
            }
          ]
    }

    const client = new vision.ImageAnnotatorClient();
    const [result] = await client.labelDetection(request_body_json);
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

detectLabels('C:\\Users\\arnav\\OneDrive - University of Florida\\whack-ding\\resources\\water9.png');
