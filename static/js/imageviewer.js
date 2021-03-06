var currentImage = 0;
var images = new Array();
// =========================================
//Image overlay functions

function overlay_on(e){
  overlay.style.display = "flex";
  currentImage = e;
  setCurrentImage(currentImage);
}


function setCurrentImageType(type, element){
    $('#imageTypeSelect').val(type);
    if (element != null){
        $("#optionElement").val(element);
    }

    handleImageType(document.getElementById("imageTypeSelect"), document.getElementById("elementDiv"));
}

function setCurrentImage(currentImage){
  var img = document.getElementById("displayImage");
  img.src = images[currentImage]["url"];
  img.width = img.naturalWidth;
  img.height = img.naturalHeight;
  setCurrentImageType(images[currentImage].type, images[currentImage].element);
  document.getElementById("imageDescriptionText").value = images[currentImage]["description"];

  // Reset updated label
  hideUpdatedLabel();
}

function nextImage(){
  if (images.length <= 1) return;
  currentImage = (currentImage+1) % images.length;
  setCurrentImage(currentImage);
}

function previousImage(){
  if (images.length <= 1) return;
  currentImage = currentImage - 1;
  if (currentImage < 0){
    currentImage = images.length-1;
  }
  setCurrentImage(currentImage);
}


function overlay_off(){
  overlay.style.display = "none";
}

function toggleFit(){
    var img = document.getElementById("displayImage");

    if (img.width != img.naturalWidth)
    {
        img.style.width="";
        img.width = img.naturalWidth;
        img.height = img.naturalHeight;
    }
    else{
        img.style.width = "100%";
        img.style.height = "auto";
    }
}

function resetImageUpdate()
{
    // Restore form to default values
    $("#imageDescriptionText").val(images[currentImage]["description"]);
    // $("#imageTypeSelect").val(images[currentImage]["type"]);
    setCurrentImageType(images[currentImage]["type"], images[currentImage].element);
    hideUpdatedLabel();
}

function postImageUpdate()
{
    var form = document.getElementById("formUpdateImage");

    var descr = document.createElement("input");
    descr.type="hidden";
    descr.name = "description";
    descr.value = document.getElementById("imageDescriptionText").value;

    var type = document.createElement("input");
    type.type = "hidden";
    type.name = "type";
    type.value = document.getElementById("imageTypeSelect").value;

    var img_id = document.createElement("input");
    img_id.type = "hidden";
    img_id.name = "id";
    img_id.value = images[currentImage]["id"];

    form.appendChild(descr);
    form.appendChild(img_id);
    form.appendChild(type);
    // form.submit();
 }


window.onclick = function(event)
{

  if (event.target == overlay || event.target == imagePanel){
    overlay_off();
  }
}

window.onkeydown = keyDownHandler;

function keyDownHandler(e){
    var keycode = e.keyCode;
    if (keycode == 27) overlay_off();
    else if (overlay && overlay.style.display != "none" && keycode == 37)  previousImage();
    else if (overlay && overlay.style.display != "none" && keycode == 39)  nextImage();
}

$(document).ready(function() {
    var overlay = document.getElementById('overlay');
    var imagePanel = document.getElementById('imagePanel');
    var topBox = document.getElementById("topBox");
    var imageContainer = document.getElementById("imageContainer");
    var uploadOverlay = document.getElementById("uploadOverlay");
});

$(document).ready(function() {
    $('#includeImageViewer').load('/static/includes/imageviewer.html');
});


// END OF OVERLAY FUNCTIONS
// ===========================================