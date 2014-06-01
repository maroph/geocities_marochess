/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/
 * Last Update : Sat, 11 May 2013 16:57:00 +0200
 * License     : Creative Commons Attribution 3.0 Unported License
 *               http://creativecommons.org/licenses/by/3.0/
 * =============================================================================
 */
const VERSION = "geoTracking/1.0";

function PositionData(position) {
    this.latitude  = position.coords.latitude;
    this.longitude = position.coords.longitude;
    this.altitude  = position.coords.altitude;
    this.timestamp = new Date().getTime();
}


var startLat   = document.getElementById('startLat');
var startLon   = document.getElementById('startLon');
var currentLat = document.getElementById('currentLat');
var currentLon = document.getElementById('currentLon');
var distance   = document.getElementById('distance');
var btnStart   = document.getElementById('btnStart');
var btnPause   = document.getElementById('btnPause');
var btnStop    = document.getElementById('btnStop');
var status     = document.getElementById('status');

var interval   = 30000; /* get position all 30 seconds */
var intervalId = null;
var startPos   = null;
var oldPos     = null;
var currentPos = null;
var dist       = 0;
var paused     = false;

var minLat  = 1000.01;
var minLon  = 1000.01;
var maxLat  = -1000.01;
var maxLon  = -1000.01;
var posData = [];

function getStartPosition(position) {
    startPos  = new PositionData(position);
    oldPos    = startPos;
    currentPos = startPos;
    updateMinMax(currentPos);
    startLat.innerHTML = startPos.latitude;
    startLon.innerHTML = startPos.longitude;
    status.className = 'success';
    status.innerHTML = '';

    posData = [];
    posData.push(startPos);

    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }
    intervalId = setInterval(fetchCurrentPosition, interval);
}

function getCurrentPosition(position) {
    if (paused) {
        if (intervalId) {
            clearInterval(intervalId);
            intervalId = null;
        }
        return;
    }
    oldPos     = currentPos;
    currentPos = new PositionData(position);
    updateMinMax(currentPos);
    currentLat.innerHTML = position.coords.latitude;
    currentLon.innerHTML = position.coords.longitude;
    dist += calculateDistance(oldPos.latitude, oldPos.longitude,
                              currentPos.latitude, currentPos.longitude);
    distance.innerHTML = dist;
    status.className   = 'success';
    status.innerHTML   = '';

    posData.push(currentPos);
}


function fetchCurrentPosition() {
    navigator.geolocation.getCurrentPosition(getCurrentPosition, errorPosition,
                          { enableHighAccuracy:true, maximumAge:60000, timeout:10000 });
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
    status.className = 'error';
    status.innerHTML = info;
}


function updateMinMax(posData) {
    if (posData.latitude < minLat) {
        minLat = posData.latitude;
    }
    if (posData.longitude < minLon) {
        minLon = posData.longitude;
    }
    if (posData.latitude > maxLat) {
        maxLat = posData.latitude;
    }
    if (posData.longitude > maxLon) {
        maxLon = posData.longitude;
    }
}

function getGpxTimeString(timestamp) {
    //2013-04-28T13:30:06Z
    var d = new Date(timestamp);
    var h;
    var t = '';
    t += d.getUTCFullYear();
    t += '-';
    h = d.getUTCMonth() + 1;
    if (h < 10) {
        t += '0';
    }
    t += h;
    t += '-';
    h = d.getUTCDate();
    if (h < 10) {
        t += '0';
    }
    t += h;
    t += 'T';
    h = d.getUTCHours();
    if (h < 10) {
        t += '0';
    }
    t += h;
    t += ':';
    h = d.getUTCMinutes();
    if (h < 10) {
        t += '0';
    }
    t += h;
    t += ':';
    h = d.getUTCSeconds();
    if (h < 10) {
        t += '0';
    }
    t += h;
    t += 'Z';

    return t;
}


// Reused code - copyright Moveable Type Scripts - retrieved May 4, 2010.
// http://www.movable-type.co.uk/scripts/latlong.html
// Under Creative Commons License http://creativecommons.org/licenses/by/3.0/
function calculateDistance(lat1, lon1, lat2, lon2) {
    var R = 6371; // km
    var dLat = (lat2-lat1).toRad();
    var dLon = (lon2-lon1).toRad();
    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
        Math.cos(lat1.toRad()) * Math.cos(lat2.toRad()) *
            Math.sin(dLon/2) * Math.sin(dLon/2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    var d = R * c;
    return d;
}
Number.prototype.toRad = function() {
    return this * Math.PI / 180;
}


function writeGPX() {
    var gpx_window = window.open("", "GPX Data");
    var gpx = gpx_window.document;
    gpx.open("text/xml", "");
    gpx.write('<?xml version="1.0" encoding="UTF-8"?>\n');
    gpx.write('<gpx xmlns="http://www.topografix.com/GPX/1/1" \n');
    gpx.write('     version="1.1" creator="' + VERSION + '" \n');
    gpx.write('     xsi:schemaLocation="http://www.topografix.com/GPX/1/1 http://www.topografix.com/GPX/1/1/gpx.xsd" \n');
    gpx.write('     xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance">\n');
    gpx.write('  <metadata>\n');
    gpx.write('    <author>\n');
    gpx.write('      <name>Manfred Rosenboom</name>\n');
    gpx.write('      <email id="marochess" domain="geocities.com"/>\n');
    gpx.write('    </author>\n');
    gpx.write('    <link href="http://www.geocities.ws/marochess/">\n');
    gpx.write('       <text>marochess</text>\n');
    gpx.write('    </link>\n');
    gpx.write('    <time>' + getGpxTimeString((new Date()).getTime()) + '</time>\n');
    gpx.write('    <bounds minlat="' + minLat + '" minlon="' + minLon + '" maxlat="' + maxLat + '" maxlon="' + maxLon + '"/>\n');
    gpx.write('  </metadata>\n');
    gpx.write('  <trk>\n');
    gpx.write('    <cmt>Just a little stroll in the winter sun</cmt>\n');
    gpx.write('    <src>http://www.geocities.ws/marochess/</src>\n');
    gpx.write('    <link href="http://www.geocities.ws/marochess/html5/samples/week6/geoTracking.html">\n');
    gpx.write('      <text>marochess</text>\n');
    gpx.write('    </link>\n');
    gpx.write('    <type>WALKING</type>\n');
    gpx.write('    <trkseg>\n');
    var lng = posData.length;
    for (var i = 0; i < lng; i += 1) {
        gpx.write('      <trkpt lat="' + posData[i].latitude + '" lon="' + posData[i].longitude + '">\n');
        gpx.write('        <ele>' + posData[i].altitude + '</ele>\n');
        gpx.write('        <time>' + getGpxTimeString(posData[i].timestamp) + '</time>\n');
        gpx.write('      </trkpt>\n');
    }
    gpx.write('    </trkseg>\n');
    gpx.write('  </trk>\n');
    gpx.write('</gpx>\n');
    gpx.write('');
    gpx.close();
}


function startTracking() {
    btnStart.disabled = true;

    status.className = 'success';
    status.innerHTML = '';

    if (paused === false) {
        navigator.geolocation.getCurrentPosition(getStartPosition, errorPosition,
                              { enableHighAccuracy:true, maximumAge:60000, timeout:10000 });
    } else {
        navigator.geolocation.getCurrentPosition(getCurrentPosition, errorPosition,
                              { enableHighAccuracy:true, maximumAge:60000, timeout:10000 });
    }

    paused = false;
    btnStart.disabled = true;
    btnPause.disabled = false;
    btnStop.disabled  = false;
    }

function pauseTracking() {
    btnPause.disabled = true;

    status.className = 'success';
    status.innerHTML = 'tracking paused';

    paused = true;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    btnStart.disabled = false;
    btnPause.disabled = true;
    btnStop.disabled  = false;
}

function stopTracking() {
    btnStop.disabled  = true;

    status.className = 'success';
    status.innerHTML = '';

    paused = false;
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    btnStart.disabled = false;
    btnPause.disabled = true;
    btnStop.disabled  = true;

    writeGPX();
}

if (navigator.geolocation) {
    btnStart.addEventListener('click', startTracking, false);
    btnPause.addEventListener('click', pauseTracking, false);
    btnStop.addEventListener('click',  stopTracking,  false);

    btnStart.disabled = false;
    btnPause.disabled = true;
    btnStop.disabled  = true;
} else {
    btnStart.disabled = true;
    btnPause.disabled = true;
    btnStop.disabled  = true;
}
