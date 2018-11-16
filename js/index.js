//Global variables
let width = 500,
    height = 0,
    filter = 'none',
    streaming = false;

//DOM Elements
const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const photos = document.getElementById('photos');
const photoButton = document.getElementById('photo-button');
const clearButton = document.getElementById('clear-button');
const photoFilter = document.getElementById('photo-filter');

//Get Media stream
navigator.mediaDevices.getUserMedia({video: true, audio: true})
  .then(stream =>{
    //Link to video element
    video.srcObject = stream;
    //play video
    video.play();
  })
  .catch(err => console.log(`Error: ${err}`));

  //adding event listener to set width height of video and canvas elements
  video.addEventListener('canplay', (e) => {
    if(!streaming) {
      //set video canvas height
      height = video.videoHeight / (video.videoWidth / width);

      video.setAttribute('width', width);
      video.setAttribute('height', height);
      canvas.setAttribute('width', width);
      canvas.setAttribute('height', height);
      streaming = true;

    }
  }, false);

  //set event listener for taking photos
  photoButton.addEventListener('click', e => {
    e.preventDefault();
    takePicture();
  }, false);

  //filter addEventListener
  photoFilter.addEventListener('change', e => {
    e.preventDefault();
    //set filter to chosen option
    filter = e.target.value;
    video.style.filter = filter;
  });

  //Clear button event addEventListener
  clearButton.addEventListener('click', e => {
    //clear photos
    photos.innerHTML = '';
    //change filter back to normal
    filter = 'none';
    video.style.filter = filter;
    //reset select list
    photoFilter.selectedIndex = 0;
  })

  //take picture from canvas
  function takePicture() {
    //Create canvas
    const context = canvas.getContext('2d');
    if(width && height) {
      //set canvas props
      canvas.width = width;
      canvas.height = height;
      //Draw an image of the video on the canvas
      context.drawImage(video, 0, 0 , width, height);

      //create image from canvas
      const imageURL = canvas.toDataURL('image/png');
      //create image element
      const image = document.createElement('img');
      //set image source
      image.setAttribute('src', imageURL);
      //Add image to photos and set filter
      image.style.filter = filter;
      photos.appendChild(image);

    }
  }
