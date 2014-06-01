/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/w3c_html5/
 * Last Update : Fri, 19 Apr 2013 18:12:00 +0200
 * License     : Creative Commons Attribution 3.0 Unported License
 *               http://creativecommons.org/licenses/by/3.0/
 * =============================================================================
 */
var formRegister = document.getElementById('formRegister');
var username     = document.getElementById('username');
var password1    = document.getElementById('password');
var password2    = document.getElementById('password2');
var name         = document.getElementById('name');
var email        = document.getElementById('email');
var website      = document.getElementById('website');
var geo          = document.getElementById('geo');
var city         = document.getElementById('city');
var zip          = document.getElementById('zip');
var street       = document.getElementById('street');
var country      = document.getElementById('country');
var phone        = document.getElementById('phone');

function checkPasswords() {
    if (password1.value != password2.value) {
        password2.setCustomValidity('Passwords do not match');
    } else {
        password2.setCustomValidity('');
    }
}

function getLocation(event) {
    if (!navigator.geolocation) {
        alert("Geolocation API not supported by your browser.");
        return;
    }
    event.preventDefault();

    navigator.geolocation.getCurrentPosition(getPosition, errorPosition);
}

function getPosition(position) {
    var centerpos = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
    var geocoder = new google.maps.Geocoder();
    geocoder.geocode({'latLng': centerpos}, function(results, status) {
        if (status == google.maps.GeocoderStatus.OK) {
            if (!results) {
                alert('No results found');
                return;
            }
            if (results.length == 0) {
                alert('No results found');
                return;
            }
            fillAddressInputFields(results[0].formatted_address.trim());
        } else {
            alert('Geocoder failed due to: ' + status);
        }
    });
}

function errorPosition(error) {
    var info = 'Error in fetching geolocation data: ';

    switch(error.code) {
        case error.TIMEOUT:
            info += "Timeout !";
            break;
        case error.PERMISSION_DENIED:
            info += "Permission denied, geolocation could not be obtained...";
            break;
        case error.POSITION_UNAVAILABLE:
            info += "Location could not be obtained though the avaible means...";
            break;
        case error.UNKNOWN_ERROR:
            info += "Unknown error";
            break;
        default :
            info += "Unexpected error code";
            break;
    }
    alert(info);
}

function fillAddressInputFields(addressLine) {
    if (!addressLine) { return; }
    var arr = addressLine.split(',');
    if (!arr) { return; }
    if (arr.length == 0) { return;  }
    street.value = arr[0].trim();
    if (arr.length > 2) {
        country.value = arr[2].trim();
    }
    if (arr.length == 1) {
        return;
    }
    var zc = arr[1].trim().split(' ');
    if (!zc) { return; }
    if (zc.length == 0) { return; }
    if (zc.length == 1) {
        city.value = zc[0].trim();
        return;
    }
    zip.value  = zc[0].trim();
    city.value = zc[1].trim();
}


var dragCanvas = document.getElementById('dragCanvas');
var ctx = dragCanvas.getContext("2d");
var state = document.getElementById('status');

if (typeof window.FileReader === 'undefined') {
    state.className = 'fail';
} else {
    state.className = 'success';
    state.innerHTML = 'File API & FileReader available';
}

var imageLoaded   = false;
var imageSize     = 0;
var imageMoveable = true;
var imageOffsetX  = 0;
var imageOffsetY  = 0;
var draggedImage = null;
dragCanvas.ondragover = function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.className = 'hover';
    return false;
};
dragCanvas.ondragend = function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.className = '';
    return false;
};
dragCanvas.ondrop = function (e) {
    e.stopPropagation();
    e.preventDefault();
    this.className = '';

    var file = e.dataTransfer.files[0],
        reader = new FileReader();
    reader.onload = function (event) {
//        if (file.type.indexOf('image') < 0) {
//            return;
//        }
        imageSize = file.size;
        console.log(event.target);
        var img = document.getElementById('holderIMG');
        draggedImage = new Image();
        draggedImage.src = event.target.result;
        draggedImage.onload = function() {
            var x,y;
            x = Math.min(dragCanvas.width, draggedImage.width);
            y = Math.min(dragCanvas.height, draggedImage.height);
            //alert('x:' + x + ' , y:' + y);
            ctx.clearRect(0, 0, dragCanvas.width, dragCanvas.height);
            ctx.drawImage(draggedImage, 0, 0, x, y, 0, 0, x, y);
            /*
             img     specifies the image, canvas, or video element to use
             sx 	    Optional. The x coordinate where to start clipping
             sy 	    Optional. The y coordinate where to start clipping
             swidth 	Optional. The width of the clipped image
             sheight Optional. The height of the clipped image
             x 	    The x coordinate where to place the image on the canvas
             y 	    The y coordinate where to place the image on the canvas
             width 	Optional. The width of the image to use (stretch or reduce the image)
             height 	Optional. The height of the image to use (stretch or reduce the image)
             */
            imageLoaded   = true;
            imageMoveable = false;
            //alert('width:' + draggedImage.width + ' , height:' + draggedImage.height);
            if ((draggedImage.width > dragCanvas.width) ||
                (draggedImage.height > dragCanvas.height)) {
                imageMoveable = true;
            }
            if (imageLoaded && (imageSize > 0)) {
                increment = imageSize / 1000;
                progress(increment);
            }
            //alert('imageMoveable:' + imageMoveable);
        };
    };
    console.log(file);
    reader.readAsDataURL(file);

    return false;
};

var previousMousePos;
var imageMoving = false;
function getDragCanvasMousePos(event) {
    var mouseX = event.clientX - dragCanvas.offsetLeft;
    var mouseY = event.clientY - dragCanvas.offsetTop;
    return {
        x:mouseX,
        y:mouseY
    };
}

function mouseDown(event) {
    event.preventDefault();
    if (!imageMoveable) {
        return;
    }
    previousMousePos = getDragCanvasMousePos(event);
    imageMoving = true;
    dragCanvas.style.cursor = 'move';
}

function mouseMove(event) {
    event.preventDefault();
    if (!imageMoving) {
        return;
    }
    var mousePos = getDragCanvasMousePos(event);
    var dx = previousMousePos.x - mousePos.x;
    var dy = previousMousePos.y - mousePos.y;
    var ox = imageOffsetX - dx;
    if (ox < 0) { ox = 0; }
    if (ox + dragCanvas.width > draggedImage.width) {
        ox = draggedImage.width - dragCanvas.width;
    }
    var oy = imageOffsetY - dy;
    if (oy < 0) { oy = 0; }
    if (oy + dragCanvas.height > draggedImage.height) {
        oy = draggedImage.height - dragCanvas.height;
    }
    imageOffsetX = ox;
    imageOffsetY = oy;
    ctx.drawImage(draggedImage, imageOffsetX, imageOffsetY, dragCanvas.width, dragCanvas.height, 0, 0, dragCanvas.width, dragCanvas.height);
    /*
     img     specifies the image, canvas, or video element to use
     sx 	    Optional. The x coordinate where to start clipping
     sy 	    Optional. The y coordinate where to start clipping
     swidth 	Optional. The width of the clipped image
     sheight Optional. The height of the clipped image
     x 	    The x coordinate where to place the image on the canvas
     y 	    The y coordinate where to place the image on the canvas
     width 	Optional. The width of the image to use (stretch or reduce the image)
     height 	Optional. The height of the image to use (stretch or reduce the image)
     */
}

function mouseUp(event) {
    event.preventDefault();
    imageMoving = false;
    dragCanvas.style.cursor = 'default';
}

dragCanvas.addEventListener('mousedown', mouseDown, false);
dragCanvas.addEventListener('mousemove', mouseMove, false);
dragCanvas.addEventListener('mouseup',   mouseUp, false);


var is_mozilla       = false;
var is_webkit        = false;
var video            = document.getElementById('video');
var btnVideoStart    = document.getElementById('videoStart');
var btnVideoStop     = document.getElementById('videoStop');
var btnVideoSnapshot = document.getElementById('videoSnapshot');

function videoStart(event) {
    event.preventDefault();
    video.play();
}

function videoSnapshot(event) {
    event.preventDefault();
    ctx.clearRect(0, 0, dragCanvas.width, dragCanvas.height);
    ctx.drawImage(video, 0, 0, dragCanvas.width, dragCanvas.height);
    imageLoaded   = true;
    imageMoveable = false;
}

function videoStop(event) {
    event.preventDefault();
    video.pause();
}

btnVideoStart.addEventListener('click', videoStart, false);
btnVideoSnapshot.addEventListener('click', videoSnapshot, false);
btnVideoStop.addEventListener('click', videoStop, false);

function onSuccess(stream) {
    var source;

    video.autoplay = false;

    if (!is_webkit) {
        source = stream;
    }
    else {
        source = window.webkitURL.createObjectURL(stream);
    }

    if (is_mozilla) {
        video.mozSrcObject = source;
    } else {
        video.src = source;
    }
}

function onError() {
    // getUserMedia API not supported, or another application is using the webcam !
}


if (navigator.mozGetUserMedia) {
    is_mozilla = true;
    navigator.mozGetUserMedia({video:true, audio:false}, onSuccess, onError);
}
else if (navigator.getUserMedia) {
    navigator.getUserMedia({video:true, audio:false}, onSuccess, onError);
}
else if (navigator.webkitGetUserMedia) {
    is_webkit = true;
    navigator.webkitGetUserMedia({video:true, audio:false}, onSuccess, onError);
}


var uploadProgess = document.getElementById('uploadProgess');
function progress(increment) {
    if (uploadProgess.value >= 1000) {
        uploadProgess.value = 10000;
        return;
    }
    uploadProgess.value += increment;
    window.setTimeout(function() { progress(increment); }, 200);
}

function checkRegisterData() {
    var address = {};
    address.username = username.value;
    address.name     = name.value;
    address.email    = email.value;
    address.website  = website.value;
    address.phone    = phone.value;
    address.city     = city.value;
    address.zip      = zip.value;
    address.street   = street.value;
    address.country  = country.value;

    if (imageLoaded) {
        address.image = dragCanvas.toDataURL();
    } else {
        address.image = '';
    }

    if (localStorage) {
        //alert(JSON.stringify(address));
        localStorage.registerAcmeForm = JSON.stringify(address);
    }

    return true;
}


password1.addEventListener('input', checkPasswords, false);
password2.addEventListener('input', checkPasswords, false);
geo.addEventListener('click', getLocation, false);
formRegister.addEventListener('submit', checkRegisterData, false);

if (localStorage) {
    if (localStorage.registerAcmeForm) {
        if (confirm("Restore last form content?")) {
            //alert(localStorage.registerAcmeForm);
            var address = JSON.parse(localStorage.registerAcmeForm);
            username.value  = address.username;
            password1.value = '';
            password2.value = '';
            name.value      = address.name;
            email.value     = address.email;
            website.value   = address.website;
            phone.value     = address.phone;
            city.value      = address.city;
            zip.value       = address.zip;
            street.value    = address.street;
            country.value   = address.country;

            if (address.image) {
                var img  = new Image();
                img.src = address.image;
                img.onload = function() {
                    ctx.clearRect(0, 0, dragCanvas.width, dragCanvas.height);
                    ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, img.width, img.height);
                };
            }
        } else {
            localStorage.removeItem('registerAcmeForm');
        }
    }
}