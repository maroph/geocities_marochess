/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/w3c_training/mobileWebApps/assignment2/
 * Last Update : Sun, 16 Feb 2014 13:11:00 +0100
 * License     : Creative Commons Attribution 4.0 International License
 *               http://creativecommons.org/licenses/by/4.0/
 * =============================================================================
 */
/*
"JSON" in window || document.write('<script src="./json2.js"><\/script>');
*/

var diaryStorePhotoKey = 'www_geocities_ws_marochess_MyDiary_Photo';
var diaryStoreKey = 'www_geocities_ws_marochess_MyDiary';
var diaryEntries  = [];
var store         = null;
var curLatitude   = '';
var curLongitude  = '';
var editMode      = '';
var editIndex     = -1;
var editPhoto     = '';

var defaultTitle     = 'Welcome to MyDiary';
var defaultText      = 'There are currently no entries in this diary. Go ahead and add one';

var nodeNewEntry    = document.getElementById('newEntry');
var nodeTitle       = document.getElementById('title');
var nodeText        = document.getElementById('text');
var nodeLocation    = document.getElementById('location');
var nodeBtnOkay     = document.getElementById('btnOkay');
var nodeBtnCancel   = document.getElementById('btnCancel');
var nodeBtnLocation = document.getElementById('btnLocation');
var nodeBtnSnapshot = document.getElementById('btnSnapshot');
var nodeBtnUpload   = document.getElementById('btnUpload');
var nodeExpandCollapse = document.getElementById('expandCollapse');
var nodeBtnExpandCollapse = document.getElementById('btnExpandCollapse');
var nodeAddEntry    = document.getElementById('addEntry');
var nodeEntries     = document.getElementById('entries');

//http://stackoverflow.com/questions/14129953/how-to-encode-a-string-in-javascript-for-displaying-in-html
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function DiaryEntry(title, time, text, latitude, longitude, photo) {
    this.title     = title;
    this.time      = time;
    this.text      = text;
    this.latitude  = latitude;
    this.longitude = longitude;
    this.photo     = photo;
}

function createDiaryEntry(idx, diaryEntry, defaultEntry) {
    var isDefaultEntry = false;
    if (arguments.length == 3) {
        isDefaultEntry = defaultEntry;
    }
    var post = '';
    post += '<article><hr/><h1 id="' + idx + '" title="Click will show/hide the entry text">';
    post += diaryEntry.title;
    post += '<span class="time">(<time datetime="';
    post += diaryEntry.time;
    post += '">';
    post += diaryEntry.time;
    post += '</time>)</span></h1>';
    post += '<p class="hide">';
    post += diaryEntry.text;
    if (isDefaultEntry == false) {
        post += '<br/><button class="editButton" title="edit entry"></button>';
        post += '<button class="deleteButton" title="delete entry"></button>';
        if ((diaryEntry.latitude != '') && (diaryEntry.longitude != '')) {
            post += '<a href="./map.html?lat=' + diaryEntry.latitude + '&lon=' + diaryEntry.longitude + '" title="show the location on a Google map" target="_blank"><button class="showLocationButton" title="show location"></button></a>';
        }
        if (diaryEntry.photo != '') {
            post += '<a href="' + diaryEntry.photo + '" target="_blank"><button class="showPhotoButton" title="show photo"></button></a>';
            //post += '<a href="./imageViewer.html" onclick="fetchImage(' + idx + ');" target="_blank"><button class="showPhotoButton" title="show photo"></button></a>';
        }
    }
    post += '</p></article>\n';
   return post;
}

function createTimeString() {
    var ts = new Date();
    return ts.toISOString();
}

function storeSet(data) {
    if (!window.localStorage) {
        store = data;
        return;
    }
    window.localStorage.setItem(diaryStoreKey, data);
    window.localStorage.removeItem(diaryStorePhotoKey);
}

function storeGet() {
    if (!window.localStorage) {
        return store;
    }
    window.localStorage.removeItem(diaryStorePhotoKey);
    return window.localStorage.getItem(diaryStoreKey);
}

function storeRemove() {
    if (!window.localStorage) {
        store = null;
        return;
    }
    window.localStorage.removeItem(diaryStoreKey);
    window.localStorage.removeItem(diaryStorePhotoKey);
    // to be on the safe side: remove also the old, misspelled key name store
    window.localStorage.removeItem('geocities_ws_maroches_MyDiary');
}

function storeEmpty() {
    var data = storeGet();
    return !data;
}

function entriesExpandCollapse() {
    var classValue;
    var newButtonName;
    if (nodeBtnExpandCollapse.innerHTML == 'Expand Entries') {
        classValue   = 'show';
        newButtonName = 'Collapse Entries';
    } else {
        classValue   = 'hide';
        newButtonName = 'Expand Entries';
    }
    var entryTexts = document.querySelectorAll("#entries article p");
    [].forEach.call(entryTexts, function(elem) {
        elem.className = classValue;
    });
    nodeBtnExpandCollapse.innerHTML = newButtonName;
}

function addEntry() {
    editMode = 'new';
    nodeNewEntry.style.display       = 'block';
    nodeAddEntry.style.display       = 'none';
    nodeExpandCollapse.style.display = 'none';
    window.localStorage.setItem(diaryStorePhotoKey, diaryStorePhotoKey);
}

function editEntry(idx) {
    if (idx < 0) {
        return;
    }
    if (idx > (diaryEntries.length - 1)) {
        alert('index out of range: ' + idx);
        return;
    }

    var entry = diaryEntries[idx];
    editMode  = 'edit';
    editIndex = idx;
    editPhoto = diaryEntries[idx].photo;

    nodeTitle.value = entry.title;
    nodeText.value  = entry.text;
    if ((entry.latitude != '') && (entry.longitude != '')) {
        nodeLocation.value = 'lat: ' + entry.latitude + ' / lon:' + entry.longitude;
    } else {
        nodeLocation.value = '';
    }

    nodeNewEntry.style.display       = 'block';
    nodeAddEntry.style.display       = 'none';
    nodeExpandCollapse.style.display = 'none';
    window.localStorage.setItem(diaryStorePhotoKey, diaryStorePhotoKey);
}

function saveEntry() {
    if (nodeTitle.value == '') {
        alert('Entry title missing');
        nodeTitle.focus();
        return;
    }
    if (nodeText.value == '') {
        alert('Entry text missing');
        nodeText.focus();
        return;
    }

    var photo = '';
    if (window.localStorage) {
        photo = window.localStorage.getItem(diaryStorePhotoKey);
        if (!photo || photo == '' || photo == diaryStorePhotoKey) {
            photo = '';
        }
    }

    var title = htmlEntities(nodeTitle.value);
    var text  = htmlEntities(nodeText.value);
    var entry = new DiaryEntry(title,createTimeString(),text,curLatitude,curLongitude,photo);
    if (editIndex > -1) {
        diaryEntries[editIndex] = entry;
    } else {
        diaryEntries.push(entry);
    }
    if (diaryEntries.length == 1) {
        nodeEntries.innerHTML = createDiaryEntry(0, entry);
    } else {
        nodeEntries.innerHTML = createDiaryEntry((diaryEntries.length-1),entry) + nodeEntries.innerHTML;
    }
    createEntryListeners();

    editMode  = '';
    editIndex = -1;
    editPhoto = '';

    nodeAddEntry.style.display       = 'block';
    nodeExpandCollapse.style.display = 'block';
    nodeNewEntry.style.display       = 'none';
    nodeTitle.value = '';
    nodeText.value  = '';
    nodeLocation.value = '';
    curLatitude        = '';
    curLongitude       = '';

    var jsonData = JSON.stringify(diaryEntries);
    storeSet(jsonData);
}

function rejectEntry() {
    editMode  = '';
    editIndex = -1;
    editPhoto = '';
    nodeAddEntry.style.display       = 'block';
    nodeExpandCollapse.style.display = 'block';
    nodeNewEntry.style.display       = 'none';
    nodeTitle.value    = '';
    nodeText.value     = '';
    nodeLocation.value = '';
    curLatitude        = '';
    curLongitude       = '';

    if (window.localStorage) {
        window.localStorage.removeItem(diaryStorePhotoKey);
    }
}

function openCamera(event) {
    event.preventDefault();
    window.open('./camera.html');
}

function openUpload(event) {
    event.preventDefault();
    window.open('./imageLoader.html');
}

function addLocationData() {
    if (!navigator.geolocation) {
        alert("Geolocation API not supported by your browser.");
        return;
    }

    navigator.geolocation.getCurrentPosition(getPosition, errorPosition);
}

function getPosition(position) {
    nodeLocation.value = 'lat: ' + position.coords.latitude + ' / lon:' + position.coords.longitude;
    curLatitude  = position.coords.latitude;
    curLongitude = position.coords.longitude;
}

function errorPosition(error) {
    // ignore any geo location fetch errors
    nodeLocation.value = 'error';
}

function removeEntries() {
    if (storeEmpty() == true) {
        return;
    }
    var resp = confirm("remove all diary entries ?");
    if (resp == true) {
        storeRemove();
    }
}

function createEntryListeners() {
    var nodeListH2 = document.querySelectorAll("#entries article h1");
    [].forEach.call(nodeListH2, function(elem) {
        this.removeEventListener('click',arguments.callee,false);
        elem.addEventListener('click', function(event) {
            //event.preventDefault();
            var node = elem.nextSibling;
            if (!node.tagName) {
                node = node.nextSibling;
            }
            if (node.className == 'hide') {
                node.className = 'show';
            } else {
                node.className = 'hide';
            }
        }, false);
    });

    var nodeListButton = document.querySelectorAll("#entries article p button");
    var counter = 0;
    [].forEach.call(nodeListButton, function(elem) {
        counter++;
        this.removeEventListener('click',arguments.callee,false);
        if (counter == 1) {
            elem.addEventListener('click', function(event) {
                var idx = this.parentNode.parentNode.firstChild.nextSibling.getAttribute("id");
                editEntry(idx);
            }, false);
        } else if (counter == 2) {
            elem.addEventListener('click', function(event) {
                var idx = this.parentNode.parentNode.firstChild.nextSibling.getAttribute("id");
                diaryEntries.splice(idx,1);
                if (diaryEntries.length > 0) {
                    var jsonData = JSON.stringify(diaryEntries);
                    storeSet(jsonData);
                } else {
                    storeRemove();
                }
                showEntries();
            }, false);
        }
    });
}

function showEntries () {
    if (!window.localStorage) {
        alert("Your browser doesn't support the localStorage API\nAll data will be stored locally only!");
    }
    var jsonData = storeGet();
    var noPosts = true;
    if (!jsonData) {
        var entry = new DiaryEntry(defaultTitle,createTimeString(),defaultText, '', '', '');
        diaryEntries = [];
        diaryEntries.push(entry);
    }
    else {
        diaryEntries = JSON.parse(jsonData);
        if (diaryEntries.length > 0) {
            noPosts = false;
        } else {
            var entry = new DiaryEntry(defaultTitle,createTimeString(),defaultText, '', '', '');
            diaryEntries = [];
            diaryEntries.push(entry);
        }
    }

    var posts = '';
    if (noPosts) {
        posts = createDiaryEntry(-1, diaryEntries[0], true);
    } else {
        for (var idx = diaryEntries.length - 1; idx >= 0; idx--) {
            posts += createDiaryEntry(idx, diaryEntries[idx]);
        }
    }
    nodeEntries.innerHTML = posts;
    if (noPosts) {
        diaryEntries = [];
    }
    createEntryListeners();
}

nodeBtnOkay.addEventListener('click',saveEntry,false);
nodeBtnCancel.addEventListener('click',rejectEntry,false);
nodeBtnLocation.addEventListener('click',addLocationData,false);
nodeBtnSnapshot.addEventListener('click',openCamera,false);
nodeBtnUpload.addEventListener('click',openUpload,false);
nodeAddEntry.addEventListener('click',addEntry,false);
nodeBtnExpandCollapse.addEventListener('click',entriesExpandCollapse,false);

if (location.search == '?clear') {
    removeEntries();
}
showEntries();
