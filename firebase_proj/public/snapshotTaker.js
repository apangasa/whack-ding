function wait(ms){
  console.log("waiting");
   var start = new Date().getTime();
   var end = start;
   while(end < start + ms) {
     end = new Date().getTime();
  }
  console.log("snapping");
  let picture = webcam.snap();
  document.querySelector('.imageLoad').href = picture;
/*  let picture = webcam.snap();
  console.log(picture);
  document.querySelector('.imageLoad').href = picture;*/
}

function saveBase64AsFile(base64, fileName) {
    var link = document.createElement("a");

    document.body.appendChild(link); // for Firefox

    link.setAttribute("href", base64);
    link.setAttribute("download", fileName);
    link.click();
}


function startPics() {
  let picture = webcam.snap();
  let base64string = picture.split(',')[1];
  console.log(base64string);
  var xhr = new XMLHttpRequest();
  xhr.open("POST", "https://cors-anywhere.herokuapp.com/https://us-central1-ding2-bf6b7.cloudfunctions.net/helloWorld", true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({
    message: base64string
}));
  document.querySelector('.imageLoad').href = picture;
};

const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const webcam = new Webcam(webcamElement, 'user', canvasElement);
webcam.start()
  .then(result =>{
    console.log("webcam started");
  })
  .then(result =>{
    setInterval(startPics, 3000);
    console.log("starting repeating pics");
  }
)
  .catch(err => {
    console.log(err);
});
