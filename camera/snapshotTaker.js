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

function startPics() {
  let picture = webcam.snap();
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
