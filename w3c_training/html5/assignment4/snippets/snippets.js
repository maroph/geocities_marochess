/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/w3c_html5/
 * Last Update : Sun, 28 Apr 2013 13:24:00 +0200
 * License     : Creative Commons Attribution 3.0 Unported License
 *               http://creativecommons.org/licenses/by/3.0/
 * =============================================================================
 */
// snippet object
function Snippet() {
    this.week        = 0;
    this.weekName    = '';
    this.chapter     = 0;
    this.chapterName = '';
    this.description = ''; //description
    this.url         = ''; // URL
    this.screenshot  = '';
}

var dbname = '"SnippetsDB';

var allSnippets = [
    {
        week: 1, weekName: 'HTML5 introduction, new structuring and semantic elements',
        chapter: 1, chapterName: 'Introduction to HTML5',
        description: 'Simple HTML5 blog',
        url: 'http://jsbin.com/agoyoj/7/edit',
        screenshot: ''
    },
    {
        week: 1, weekName: 'HTML5 introduction, new structuring and semantic elements',
        chapter: 2, chapterName: 'Other HTML5 elements',
        description: 'details/summary elements sample',
        url: 'http://jsbin.com/ifofib/3/edit',
        screenshot: ''
    },
    {
        week: 1, weekName: 'HTML5 introduction, new structuring and semantic elements',
        chapter: 2, chapterName: 'Other HTML5 elements',
        description: 'mark element sample',
        url: 'http://jsbin.com/otekov/3/edit',
        screenshot: ''
    },
    {
        week: 1, weekName: 'HTML5 introduction, new structuring and semantic elements',
        chapter: 3, chapterName: 'HTML5 attributes',
        description: 'dataset sample',
        url: 'http://jsbin.com/ulixov/8/edit',
        screenshot: ''
    },
    {
        week: 1, weekName: 'HTML5 introduction, new structuring and semantic elements',
        chapter: 3, chapterName: 'HTML5 attributes',
        description: 'input range sample',
        url: 'http://jsbin.com/alunuk/6/edit',
        screenshot: ''
    },
    {
        week: 1, weekName: 'HTML5 introduction, new structuring and semantic elements',
        chapter: 4, chapterName: 'Microdata',
        description: 'Microdata usage sample',
        url: 'http://jsbin.com/uquboc/18/edit',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 1, chapterName: 'The &lt;video&gt; element, part 1, basics and JavaScript API',
        description: 'Simple video element usage',
        url: 'http://jsbin.com/irofib/6/edit',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 1, chapterName: 'The &lt;video&gt; element, part 1, basics and JavaScript API',
        description: 'HTML5 video API demo',
        url: 'http://www.w3.org/2010/Talks/0430-www2010-plh/video.html',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 2, chapterName: 'Add closed caption, subtitles, chapters, etc. to your videos',
        description: 'Video track sample',
        url: 'http://www.longtailvideo.com/html5/track/',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 3, chapterName: 'The &lt;video&gt; element, part 2: CSS3 and interactions with the &lt;canvas&gt; element.',
        description: 'Changing the size on the fly, using CSS3 transforms',
        url: 'http://jsbin.com/ahunon/4/edit',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 3, chapterName: 'The &lt;video&gt; element, part 2: CSS3 and interactions with the &lt;canvas&gt; element.',
        description: 'Transforming HTML5 video with CSS3',
        url: 'http://jsbin.com/axonek/3/edit',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 3, chapterName: 'The &lt;video&gt; element, part 2: CSS3 and interactions with the &lt;canvas&gt; element.',
        description: 'copy real time video content to a canvas',
        url: 'http://jsbin.com/ugolip/2/edit',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 3, chapterName: 'The &lt;video&gt; element, part 2: CSS3 and interactions with the &lt;canvas&gt; element.',
        description: 'rotating a video in real time using two canvases for double buffering',
        url: 'http://jsbin.com/etibaz/2/edit',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 4, chapterName: 'Live video stream: the getUserMedia API',
        description: 'Simple web camera display',
        url: 'http://jsbin.com/ipeyal/188/edit',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 5, chapterName: 'HTML5 audio: introduction, the &lt;audio&gt; element',
        description: 'Typical example',
        url: 'http://jsbin.com/itaros/4/edit',
        screenshot: ''
    },
    {
        week: 2, weekName: 'HTML5 Multimedia video and audio',
        chapter: 5, chapterName: 'HTML5 audio: introduction, the &lt;audio&gt; element',
        description: 'Another example that uses custom controls through the JavaScript API',
        url: 'http://jsbin.com/uvusob/4/edit',
        screenshot: ''
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 2, chapterName: 'The Basics',
        description: 'A basic example',
        url: 'http://jsbin.com/utihaq/2/edit',
        screenshot: ''
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 3, chapterName: 'Drawing principles',
        description: 'Filled and wireframed rectangle',
        url: 'http://jsbin.com/ikihew/3/edit',
        screenshot: ''
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 3, chapterName: 'Drawing principles: Path drawing, lines, arcs, curves, text, images',
        description: 'Really drawing two different paths, using the ctx.beginPath() method',
        url: 'http://jsbin.com/oyunuj/15/edit',
        screenshot: ''
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 3, chapterName: 'Drawing principles: Colors, styles, shadows, patterns etc.',
        description: 'Linear gradient',
        url: 'http://jsbin.com/urucem/16/edit',
        screenshot: 'data:image/jpeg;base64,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'
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 3, chapterName: 'Drawing principles: Colors, styles, shadows, patterns etc.',
        description: 'Radial gradient',
        url: 'http://jsbin.com/urucem/9/edit',
        screenshot: ''
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 3, chapterName: 'Drawing principles: Images, videos and advanced techniques',
        description: 'Saving the canvas content by displaying it in new window in Base64/PNG',
        url: 'http://jsbin.com/etirop/2/edit',
        screenshot: ''
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 3, chapterName: 'Drawing principles: Images, videos and advanced techniques',
        description: 'Canvas drawing modes',
        url: 'http://jsbin.com/inuwav/5/edit',
        screenshot: ''
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 4, chapterName: 'Canvas events, animation',
        description: 'Tracking mouse position',
        url: 'http://jsbin.com/opuhiy/2/edit',
        screenshot: ''
    },
    {
        week: 3, weekName: 'The HTML5 Canvas',
        chapter: 4, chapterName: 'Canvas events, animation',
        description: 'Draw with the mouse',
        url: 'http://jsbin.com/idegay/3/edit',
        screenshot: ''
    },
    {
        week: 4, weekName: 'HTML5 Forms',
        chapter: 2, chapterName: 'New &lt;input&gt; types',
        description: 'Example of &lt;input type=&quote;color&quote;/&gt;',
        url: 'http://jsbin.com/itufey/2/edit',
        screenshot: ''
    },
    {
        week: 4, weekName: 'HTML5 Forms',
        chapter: 2, chapterName: 'New &lt;input&gt; types',
        description: 'Example of &lt;input type=&quote;date&quote;/&gt; and variants',
        url: 'http://jsbin.com/otovut/2/edit',
        screenshot: ''
    },
    {
        week: 4, weekName: 'HTML5 Forms',
        chapter: 3, chapterName: 'New attributes',
        description: 'Form sample',
        url: 'http://jsbin.com/oyucib/2/edit',
        screenshot: ''
    },
    {
        week: 4, weekName: 'HTML5 Forms',
        chapter: 3, chapterName: 'New attributes',
        description: 'formnovalidate attribute',
        url: 'http://jsbin.com/aqifuz/2/edit',
        screenshot: ''
    },
    {
        week: 4, weekName: 'HTML5 Forms',
        chapter: 4, chapterName: 'New elements',
        description: '&lt;datalist&gt;',
        url: 'http://jsbin.com/uwozih/5/edit',
        screenshot: ''
    },
    {
        week: 4, weekName: 'HTML5 Forms',
        chapter: 4, chapterName: 'New elements',
        description: '&lt;progress&gt;',
        url: 'http://jsbin.com/aqejis/3/edit',
        screenshot: ''
    },
    {
        week: 4, weekName: 'HTML5 Forms',
        chapter: 5, chapterName: 'Form validation',
        description: 'Password validation sample',
        url: 'http://jsbin.com/otidav/7/edit',
        screenshot: ''
    },
    {
        week: 4, weekName: 'HTML5 Forms',
        chapter: 5, chapterName: 'Form validation',
        description: 'Validation API sample',
        url: 'http://jsbin.com/ociguc/4/edit',
        screenshot: ''
    },
    {
        week: 5, weekName: 'HTML5 New APIs (geolocation, ...)',
        chapter: 2, chapterName: 'The geolocation API',
        description: 'Typical ussage sample',
        url: 'http://jsbin.com/ezivih/2/edit',
        screenshot: ''
    },
    {
        week: 5, weekName: 'HTML5 New APIs (geolocation, ...)',
        chapter: 2, chapterName: 'The geolocation API',
        description: 'Get an image map centered on your longitude and latitude',
        url: 'http://jsbin.com/etayim/2/edit',
        screenshot: ''
    },
    {
        week: 5, weekName: 'HTML5 New APIs (geolocation, ...)',
        chapter: 2, chapterName: 'The geolocation API',
        description: 'Example with the Google reverse geocoder',
        url: 'http://jsbin.com/ukogoq/2/edit',
        screenshot: ''
    },
    {
        week: 6, weekName: "Drag'n'Drop, Persistence",
        chapter: 1, chapterName: 'Introduction',
        description: 'Checking that the browser is online/offline',
        url: 'http://jsbin.com/ebotog/4/edit',
        screenshot: ''
    },
    {
        week: 6, weekName: "Drag'n'Drop, Persistence",
        chapter: 2, chapterName: 'HTML5 cache / Offline applications',
        description: 'Clock offline example',
        url: 'http://www.whatwg.org/demos/offline/clock/live-demo/clock.html',
        screenshot: ''
    },
    {
        week: 6, weekName: "Drag'n'Drop, Persistence",
        chapter: 3, chapterName: 'The Web Storage API (LocalStorage, SessionStorage)',
        description: 'First example that uses localStorage',
        url: 'http://jsbin.com/oyafiv/3/edit',
        screenshot: ''
    },
    {
        week: 6, weekName: "Drag'n'Drop, Persistence",
        chapter: 4, chapterName: 'The File API',
        description: 'Get file data',
        url: 'http://jsbin.com/axuyin/4/edit',
        screenshot: ''
    },
    {
        week: 6, weekName: "Drag'n'Drop, Persistence",
        chapter: 6, chapterName: "Drag'n'drop API part 2: files",
        description: 'File drag &amp; drop example',
        url: 'http://jsbin.com/itiriv/2/edit',
        screenshot: ''
    },
    {
        week: 6, weekName: "Drag'n'Drop, Persistence",
        chapter: 11, chapterName: 'Using IndexedDB',
        description: 'IndexedDB example 1',
        url: 'http://jsbin.com/ocaxeh/11/edit',
        screenshot: ''
    }
];

var db = null;
function createAndPopulateDatabase() {
    if(!window.indexedDB) {
        alert("Your browser does not support a stable version of IndexedDB");
        return;
    }

    var request = indexedDB.open(dbname, 1);

    request.onerror = function(event) {
        alert("request.onerror" + event.target.errorCode);
    };

    request.onupgradeneeded = function(event) {
        console.log("request.onupgradeneeded, we are creating a new version of the dataBase");

        db = event.target.result;

        var objectStore = db.createObjectStore("snippets", { keyPath: "url" });

        objectStore.createIndex("week",        "week",        { unique: false });
        objectStore.createIndex("chapter",     "chapter",     { unique: false });
        objectStore.createIndex("chapterName", "chapterName", { unique: false });
        objectStore.createIndex("description", "description", { unique: false });

        // Store values in the newly created objectStore.
        for (var i in allSnippets) {
            console.log("add snippet: " + allSnippets[i].description);
            objectStore.add(allSnippets[i]);
        }
        alert('database populated');
        console.log('database populated');
    }; // end of request.onupgradeneeded

    request.onsuccess = function(event) {
        // Handle errors.
        console.log("request.onsuccess, database opened, now we can add / remove / look for data in it!");

        // The result is the database itself
        db = event.target.result;
    };
}

function deleteDatabase() {
    if(!window.indexedDB) {
        alert("Your browser does not support a stable version of IndexedDB");
        return;
    }

    var divShowSnippets = document.getElementById('showSnippets');
    if (divShowSnippets) {
        divShowSnippets.innerHTML = '';
    }

    if (window.mozIndexedDB) {
        if (window.mozIndexedDB.deleteDatabase) {
            window.mozIndexedDB.deleteDatabase(dbname).onsuccess = function(e) {
                alert('moz: Database deleted');
                console.log('moz: Database deleted');
            };
        }
    } else if (window.webkitIndexedDB) {
        if (window.webkitIndexedDB.deleteDatabase) {
            window.webkitIndexedDB.deleteDatabase(dbname).onsuccess = function(e) {
                alert('webkit: Database deleted');
                console.log('webkit: Database deleted');
            };
        }
    } else if (window.indexedDB.deleteDatabase) {
        window.indexedDB.deleteDatabase(dbname).onsuccess = function(e) {
            alert('html5: Database deleted');
            console.log('html5: Database deleted');
        };
    }
    else {
        alert("can't delete database");
    }
}

function showSnippets() {
    console.log("showSnippets()");
    if (db == null) {
        createAndPopulateDatabase();
        console.log('setTimeout("showSnippets", 500)');
        setTimeout(showSnippets, 500);
        return;
    }
    if (db == null) {
        alert("can't access IndexedDB");
        return;
    }

    var divShowSnippets = document.getElementById('showSnippets');
    if (!divShowSnippets) {
        alert("can't get element with id showSnippets");
        return;
    }

    var transaction = db.transaction(["snippets"], "readwrite");
    var objectStore = transaction.objectStore("snippets");
    console.log("objectStore");

    var snippets = [];

    console.log("objectStore.openCursor()");
    objectStore.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            console.log("Snippet Description " + cursor.key + " is " + cursor.value.description);
            snippets.push(cursor.value);
            cursor.continue();
        }
        else {
            console.log("No more entries!");
        }

        divShowSnippets.innerHTML = '';
        var lng = snippets.length;
        var i;
        var line;
        var lng = snippets.length;
        var i;
        var line;
        var html = '';
        html += '<table>';
        html += '<tr><th>week</th><th>week name</th><th>chapter</th><th>chapter name</th><th>description</th><th>URL</th><th>screenshot</th></tr>'
        for (i = 0; i < lng; i += 1) {
            line  = '<tr><td>';
            line += snippets[i].week;
            line += '</td><td>';
            line += snippets[i].weekName;
            line += '</td><td>';
            line += snippets[i].chapter;
            line += '</td><td>';
            line += snippets[i].chapterName;
            line += '</td><td>';
            line += snippets[i].description;
            line += '</td><td>';
            line += '<a href="' + snippets[i].url + '" target="_blank">' + snippets[i].url + '</a>';
            if (snippets[i].screenshot != '') {
                line += '</td><td>';
                line += '<a href="' + snippets[i].screenshot + '">screenshot</a>';
            } else {
                line += '</td><td>&nbsp;';
            }
            line += '</td></tr>';
            html += line;
        }
        html += '</table>';
        divShowSnippets.innerHTML += html;
    };
}

function showWeekSnippets() {
    console.log("showWeekSnippets()");
    if (db == null) {
        createAndPopulateDatabase();
        console.log('setTimeout("showWeekSnippets", 500)');
        setTimeout(showSnippets, 500);
        return;
    }
    if (db == null) {
        alert("can't access IndexedDB");
        return;
    }

    var divShowSnippets = document.getElementById('showSnippets');
    if (!divShowSnippets) {
        alert("can't get element with id showSnippets");
        return;
    }

    var weekToShow = prompt("Please enter the week to show (1-6): ", '1');

    var transaction = db.transaction(["snippets"], "readwrite");
    var objectStore = transaction.objectStore("snippets");
    console.log("objectStore");

    var snippets = [];

    var index = objectStore.index('week');
    console.log("index.openCursor)");
    index.openCursor().onsuccess = function(event) {
        var cursor = event.target.result;
        if (cursor) {
            if (cursor.value.week == weekToShow) {
                console.log("Snippet Description " + cursor.key + " is " + cursor.value.description);
                snippets.push(cursor.value);
            }
            cursor.continue();
        }
        else {
            console.log("No more entries!");
        }

        divShowSnippets.innerHTML = '';
        var lng = snippets.length;
        var i;
        var line;
        var html = '';
        html += '<table>';
        html += '<tr><th>week</th><th>week name</th><th>chapter</th><th>chapter name</th><th>description</th><th>URL</th><th>screenshot</th></tr>'
        for (i = 0; i < lng; i += 1) {
            line  = '<tr><td>';
            line += snippets[i].week;
            line += '</td><td>';
            line += snippets[i].weekName;
            line += '</td><td>';
            line += snippets[i].chapter;
            line += '</td><td>';
            line += snippets[i].chapterName;
            line += '</td><td>';
            line += snippets[i].description;
            line += '</td><td>';
            line += '<a href="' + snippets[i].url + '" target="_blank">' + snippets[i].url + '</a>';
            if (snippets[i].screenshot != '') {
                line += '</td><td>';
                line += '<a href="' + snippets[i].screenshot + '">screenshot</a>';
            } else {
                line += '</td><td>&nbsp;';
            }
            line += '</td></tr>';
            html += line;
        }
        html += '</table>';
        divShowSnippets.innerHTML += html;
    };
}