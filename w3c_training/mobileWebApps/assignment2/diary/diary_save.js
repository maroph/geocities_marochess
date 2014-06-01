/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/w3c_training/mobileWebApps/assignment2/
 * Last Update : Sun, 26 Jan 2014 13:02:00 +0100
 * License     : Creative Commons Attribution 4.0 International License
 *               http://creativecommons.org/licenses/by/4.0/
 * =============================================================================
 */
"JSON" in window || document.write('<script src="./json2.js"><\/script>');

var diaryStoreKey = 'geocities_ws_maroches_MyDiary';
var diaryEntries  = [];
var store         = null;

var defaultTitle     = 'Welcome to MyDiary';
var defaultText      = 'There are currently no entries in this diary. Go ahead and add one';

var nodeNewEntry    = document.getElementById('newEntry');
var nodeTitle       = document.getElementById('title');
var nodeText        = document.getElementById('text');
var nodeBtnOkay     = document.getElementById('btnOkay');
var nodeBtnCancel   = document.getElementById('btnCancel');
var nodeBtnExpand   = document.getElementById('btnExpand');
var nodeBtnCollapse = document.getElementById('btnCollapse');
var nodeAddEntry    = document.getElementById('addEntry');
var nodeEntries     = document.getElementById('entries');

//http://stackoverflow.com/questions/14129953/how-to-encode-a-string-in-javascript-for-displaying-in-html
function htmlEntities(str) {
    return String(str).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function DiaryEntry(title, time, text) {
    this.title = title;
    this.time  = time;
    this.text  = text;
    //this.timestamp = new Date().getTime();
}

function createDiaryEntry(diaryEntry) {
    var post = '';
    post += '<article><hr/><h1>';
    post += diaryEntry.title;
    post += '<span class="time">(<time datetime="';
    post += diaryEntry.time;
    post += '">';
    post += diaryEntry.time;
    post += '</time>)</span></h1>';
    post += '<p>';
    post += diaryEntry.text;
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
}

function storeGet() {
    if (!window.localStorage) {
        return store;
    }
    return window.localStorage.getItem(diaryStoreKey);
}

function storeRemove() {
    if (!window.localStorage) {
        store = null;
        return;
    }
    window.localStorage.removeItem(diaryStoreKey);
}

function storeEmpty() {
    var data = storeGet();
    return !data;
}

function addEntry() {
    nodeNewEntry.style.display = 'block';
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

    var title = htmlEntities(nodeTitle.value);
    var text  = htmlEntities(nodeText.value);
    var entry = new DiaryEntry(title,createTimeString(),text);
    diaryEntries.push(entry);
    if (diaryEntries.length == 1) {
        nodeEntries.innerHTML = createDiaryEntry(entry);
    } else {
        nodeEntries.innerHTML += createDiaryEntry(entry);
    }

    var firstEntryText = document.querySelector("#entries article p");
    var displayValue = firstEntryText.style.display;
    var entryTexts = document.querySelectorAll("#entries article h1");
    [].forEach.call(entryTexts, function(elem) {
        elem.nextSibling.style.display = displayValue;
        this.removeEventListener('click',arguments.callee,false);
        // Add event listener
        elem.addEventListener('click', function(event) {
            event.preventDefault();
            //elem.style.display = 'none';
            if (elem.nextSibling.style.display == 'none') {
                elem.nextSibling.style.display = 'block';
            } else {
                elem.nextSibling.style.display = 'none';
            }
        }, false);

    });

    nodeNewEntry.style.display = 'none';
    nodeTitle.value = '';
    nodeText.value  = '';

    var jsonData = JSON.stringify(diaryEntries);
    storeSet(jsonData);
}

function rejectEntry() {
    nodeNewEntry.style.display = 'none';
    nodeTitle.value = '';
    nodeText.value  = '';
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

function showEntries () {
    if (!window.localStorage) {
        alert("Your browser doesn't support the localStorage API\nAll data will be stored locally only!");
    }
    var jsonData = storeGet();
    var noPosts = true;
    if (!jsonData) {
        var entry = new DiaryEntry(defaultTitle,createTimeString(),defaultText);
        diaryEntries = [];
        diaryEntries.push(entry);
    }
    else {
        diaryEntries = JSON.parse(jsonData);
        noPosts = false;
    }

    var posts = '';
    for (var idx = 0; idx < diaryEntries.length; idx++) {
        posts += createDiaryEntry(diaryEntries[idx]);
    }
    nodeEntries.innerHTML = posts;
    if (noPosts) {
        diaryEntries = [];
    }

    var firstEntryText = document.querySelector("#entries article p");
    var displayValue = firstEntryText.style.display;
    var entryTexts = document.querySelectorAll("#entries article h1");
    [].forEach.call(entryTexts, function(elem) {
        elem.nextSibling.style.display = displayValue;
        this.removeEventListener('click',arguments.callee,false);
        // Add event listener
        elem.addEventListener('click', function(event) {
            event.preventDefault();
            //elem.style.display = 'none';
            if (elem.nextSibling.style.display == 'none') {
                elem.nextSibling.style.display = 'block';
            } else {
                elem.nextSibling.style.display = 'none';
            }
        }, false);

    });
}

nodeBtnOkay.addEventListener('click',saveEntry,false);
nodeBtnCancel.addEventListener('click',rejectEntry,false);
nodeAddEntry.addEventListener('click',addEntry,false);

if (location.search == '?clear') {
    removeEntries();
}
showEntries();
