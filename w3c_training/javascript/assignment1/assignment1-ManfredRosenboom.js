/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/w3c_training/javascript/assignment1/
 * Last Update : Sat, 29 Mar 2014 15:55:00 +0100
 * License     : Creative Commons Attribution 4.0 International License
 *               http://creativecommons.org/licenses/by/4.0/
 * =============================================================================
 */

/*
 * Assignment 1: Array manipulation
 * --
 * Code tested in the node.js console
 */

/*
 * Sample Data for the assignment
 */
var drumsKit = [{
    id: 0,
    name:'drum1',
    sources: ['/local/sounds/a.wav','/local/sounds/a.mp3'],
    color: '#1478AA',
    key: 'Q'
},{
    id: 1,
    name:'drum2',
    sources: ['http://www.w3c.com/demo/sample.mp3'],
    color: 'blue',
    key: 'W'
},{
    id: 6,
    name:'drum7',
    sources: ['/local/sounds/drum/d3.ogg'],
    color: 'red',
    key: 'E'
},{
    id: 3,
    name:'drum4',
    sources: ['http://www.w3c.com/demo/d4.ogg','http://www.w3c.com/demo/d4.mp3'],
    color: 'blue',
    key: 'R'
}];


var findByResult;
var drumsKitCopy;
var myObject;
var myDrum;


function drumsKitCopyData() {
    var copyArray = [];
    for (var i = 0; i < drumsKit.length; i++) {
        copyArray.push(drumsKit[i]);
    }
    return copyArray;
}


console.log("");
console.log("");
console.log("=================================================");
console.log("PART 1: Find & Sort");
console.log("=================================================");
console.log("");

console.log("PART 1: A) findBy");
/*
 * @function findBy
 * @param data  : the data array
 * @param key   : the key we are looking for
 * @param value : the value of the key
 * --
 * If  data and/or key is missing and empty array is returned.
 * If value is missing all data array entries which contain the given key as
 * property are returned.
 */
function findBy(data, key, value) {
    var foundData = [];

    if (!data) {
        return foundData;
    }
    if (!(data instanceof Array)) {
        return foundData;
    }
    if (data.length === 0) {
        return foundData;
    }
    if (!(data[0] instanceof Object)) {
        return foundData;
    }
    if (!key) {
        return foundData;
    }

    for (var i = 0; i < data.length; i++) {
        if (key in data[i]) {
            if (!value) {
                foundData.push(data[i]);
            } else {
                if ((data[i])[key] === value) {
                    foundData.push(data[i]);
                }
            }
        }

    }
    return foundData;
}

/*
 * Examples of results we expect by calling the findBy function:
 */
console.log("");
console.log("findBy(drumsKit, 'id', 1): expect one item");
findByResult = findBy(drumsKit, 'id', 1);
console.log(findByResult);

console.log("");
console.log("findBy(drumsKit, 'color', 'blue'): expect 2 items");
findByResult = findBy(drumsKit, 'color', 'blue');
console.log(findByResult);

console.log("");
console.log("findBy(drumsKit, 'color', 'pink'): expect an empty array");
findByResult = findBy(drumsKit, 'color', 'pink');
console.log(findByResult);

console.log("");
console.log("findBy(drumsKit, 'id'): expect all (4) items");
findByResult = findBy(drumsKit, 'id');
console.log(findByResult);


console.log("");
console.log("");
console.log("PART 1: B) sort");

console.log("");
console.log("");
console.log("PART 1: B) sort: 1) compareById");
/*
 *  @function comparById
 *  @param item1
 *  @param item2
 *  Assumption: both items are objects with a property id.
 */
function compareById(item1, item2) {
    if (item1.id > item2.id) {
        return 1;
    }
    else if (item1.id < item2.id) {
        return -1;
    }
    return 0;
}


console.log("");
console.log("drumsKit.sort(compareById): expect array is sorted by id");
drumsKitCopy = drumsKitCopyData();
drumsKitCopy.sort(compareById);
console.log(drumsKitCopy);


console.log("");
console.log("");
console.log("PART 1: B) sort: 2) compareByProperty");
/**
 * @function compareByProperty
 * @param prop1
 * @param prop2
 * Compare prop1 and prop2
 */
function compareByProperty(prop1, prop2) {
    if (prop1 > prop2) {
        return 1;
    }
    else if (prop1< prop2) {
        return -1;
    }
    return 0;
}


/*
 * @function getComparator
 * @param propertyName
 * @returns {comparator}
 */
function getComparator(propertyName){
    var comparator = function (item1, item2) {
        return compareByProperty(item1[propertyName], item2[propertyName]);
    };
    return comparator;
}
/*
 -- Step 5: Create a "compareByName" variable and assign to it the result
 of calling the getComparator function with 'name' as argument
 -- Step 6: Call the drumsKit array sort method with the compareByName function
 as argument.
 -- Step 7: Repeat the two previous steps in a single line in order to sort
 the array by color.
 */

console.log("create a by name comparator: compareByName");
var compareByName = getComparator('name');

console.log("drumsKit.sort(compareByName): expect: array is sorted by the name property");
drumsKitCopy = drumsKitCopyData();
drumsKitCopy.sort(compareByName);
console.log(drumsKitCopy);

console.log("");
console.log("");
console.log("create a by name comparator: compareByColor");
var compareByColor = getComparator('color');

console.log("drumsKit.sort(compareByColor): expect: array is sorted by the color property");
drumsKitCopy = drumsKitCopyData();
drumsKitCopy.sort(compareByColor);
console.log(drumsKitCopy);


console.log("");
console.log("");
console.log("=================================================");
console.log("PART 2: Create, Add and Remove item");
console.log("=================================================");
console.log("");


console.log("PART 2: A) Constructor");
/**
 * Create a constructor function called Drum to create an object with the following properties:
 *  @param name
 *  @param sources
 *  @param color
 *  @param key
 */
function Drum(name, sources, color, key) {
    this.name    = name;
    this.sources = sources;
    this.color   = color;
    this.key     = key;
}


console.log("");
console.log("");
console.log("PART 2: B) Add an object to the drumsKit array");

/*
 * @function addItem
 * @param data the data object array
 * @param item the item object to add to the end of the array
 */
function addItem(data, item) {
    data.push(item);
}


console.log("");
console.log("");
console.log("create a new object item");
console.log("myDrum = new Drum('myDrum', ['/local/path/d1.ogg'], 'purple', 'l')");
myDrum = new Drum('myDrum', ['/local/path/d1.ogg'], 'purple', 'l');

console.log("");
console.log("");
console.log("addItem(drumsKitCopy, myDrum)");
drumsKitCopy = drumsKitCopyData();
addItem(drumsKitCopy, myDrum);
console.log("console.log(drumsKitCopy): expect the new item at the end of the data");
console.log(drumsKitCopy);


console.log("");
console.log("");
console.log("PART 2: B) 2) Add an object with an auto generated id to the drumsKit array");

/*
 * @function addItemWithId
 * @param data the data object array
 * @param item the item object to add to the end of the array
 * The id property value is generated during the add process.
 */
function addItemWithId(data, item) {
    var sortedArray = [];
    var maxId       = 0;

    if (data) {
        /*
         * The order or the copy array for sorting shouldn't be changed.
         * Therefore I copy the array for sorting.
         * Alternative: simply traverse the array and remember the max id value
         */
        for (var i = 0; i < data.length; i++) {
            sortedArray.push(data[i]);
        }
        /* get the highest id in use */
        sortedArray.sort(compareById);
        if (sortedArray.length > 0) {
            maxId = sortedArray[sortedArray.length - 1].id;
        }
    }
    item.id = maxId + 1;
    data.push(item);
}


console.log("");
console.log("");
console.log("drumsKitCopy = drumsKitCopyData()");
drumsKitCopy = drumsKitCopyData();
console.log("myDrum = new Drum('myDrum', ['/local/path/d1.ogg'], 'purple', 'l')");
myDrum = new Drum('myDrum', ['/local/path/d1.ogg'], 'purple', 'l');
console.log("addItemWithId(data, myDrum): expect item with auto added highest id at the end of the data");
addItemWithId(drumsKitCopy, myDrum);
console.log(drumsKitCopy);


console.log("");
console.log("");
console.log("PART 2: C) Remove an object from the array");

/*
 * @function removeByObject
 * @param data the data arrary
 * @param item the object item to remove from the array
 */
function removeByObject(data, item) {
    if (!data) {
        return;
    }
    if (!item) {
        return;
    }
    var idx = -1;
    for (var i = 0; i < data.length; i++) {
        if (data[i] == item) {
            idx = i;
            break;
        }
    }
    if (idx > -1) {
        /* found item in array - now remove this item */
        data.splice(idx,1);
    }
}

console.log("");
console.log("");
console.log("drumsKitCopy = drumsKitCopyData()");
drumsKitCopy = drumsKitCopyData();
console.log("get item with name 'drum2'");
console.log("myObject = drumsKitCopy[1]");
myObject = drumsKitCopy[1];
console.log("removeByObject(drumsKitCopy, myObject)");
removeByObject(drumsKitCopy, myObject);
console.log("console.log(drumsKitCopy): expect item with name 'drum2' is removed from data");
console.log(drumsKitCopy);


console.log("");
console.log("");
console.log("PART 2: C) Remove an object by id from the array");
/*
 * @function removebyId
 * @param data the data array
 * @param id remove item with given id from data array
 */
function removeById(data, id) {
    if (!data) {
        return;
    }
    if (!id) {
        return;
    }
    var idx = -1;
    for (var i = 0; i < data.length; i++) {
        if (data[i].id === id) {
            idx = i;
            break;
        }
    }
    if (idx > -1) {
        data.splice(idx,1);
    }
}

console.log("");
console.log("");
console.log("drumsKitCopy = drumsKitCopyData()");
drumsKitCopy = drumsKitCopyData();
/* remove item with id 6 (name: 'drum7') */
console.log("removeById(drumsKitCopy, 6)");
removeById(drumsKitCopy, 6);
console.log("console.log(drumsKitCopy): expect that item with id 6 ('drum7') is removed from data");
console.log(drumsKitCopy);


console.log("");
console.log("");
console.log("PART 2: C) [ADVANCED] Create a remove function which removes an object from the array");

/*
 * @function remove
 * @param data the data array
 * @param item object item or the item's id to remove
 */
function remove(data, item) {
    if (!data) {
        return;
    }
    if (!item) {
        return;
    }
    var idx = -1;
    var i;
    if (typeof item === 'number') {
        for (i = 0; i < data.length; i++) {
            if (data[i].id == item) {
                idx = i;
                break;
            }
        }
    } else {
        for (i = 0; i < data.length; i++) {
            if (data[i] == item) {
                idx = i;
                break;
            }
        }
    }
    if (idx > -1) {
        data.splice(idx,1);
    }
}

console.log("");
console.log("");
console.log("drumsKitCopy = drumsKitCopyData()");
drumsKitCopy = drumsKitCopyData();
console.log("myObject = drumsKitCopy[1] //get item with id 1 and name 'drum2' ");
myObject = drumsKitCopy[1];
console.log("remove(drumsKitCopy, myObject)");
remove(drumsKitCopy, myObject);
console.log("console.log(drumsKitCopy): expect item with id 1 ('drum2') is removed from data");
console.log(drumsKitCopy);

console.log("");
console.log("");
console.log("drumsKitCopy = drumsKitCopyData()");
drumsKitCopy = drumsKitCopyData();
console.log("remove(drumsKitCopy, 1) // remove item with id 1 and name 'drum2'");
remove(drumsKitCopy, 1);
console.log("console.log(drumsKitCopy): expect item with id 1 ('drum2') removed from data");
console.log(drumsKitCopy);


console.log("");
console.log("");
console.log("=================================================");
console.log("PART 3: [ADVANCED] Manipulate");
console.log("=================================================");

/*
 * @function getDirectory
 * @param path file path name
 * @returns the directory part of the path
 */
function getDirectory(path) {
    if (!path) {
        return "";
    }
    var idx = path.lastIndexOf('/');
    var dir = path.substr(0,idx);
    //console.log('dir  : ' + dir);
    return dir;
}

/*
 * @function getFilename
 * @param path file path name
 * @returns the file name part of the path
 */
function getFilename(path) {
    if (!path) {
        return "";
    }
    var idx = path.lastIndexOf('/');
    var file = path.substr(idx+1);
    //console.log('file : ' + file);
    return file;
}

/*
 * @function formatObject
 * @param item the item to format
 * @returns the new formatted item
 */
function formatObject(item) {
    var url = {};
    url.path = '';
    url.filenames = [];
    if (item.sources && (item.sources.length > 0)) {
        url.path = getDirectory(item.sources[0]);
        for (var i = 0; i < item.sources.length; i++) {
            url.filenames.push(getFilename(item.sources[i]));
        }
    }
    item.url = url;
    delete item.sources;
    return item;
}

console.log("");
console.log("myDrum = new Drum('myDrum', ['/local/path/d1.ogg'], 'purple', 'l')");
myDrum = new Drum('myDrum', ['/local/path/d1.ogg'], 'purple', 'l');
console.log("console.log(myDrum)");
console.log(myDrum);
console.log("----");
console.log("myObject = formatObject(myDrum)");
myObject = formatObject(myDrum);
console.log("console.log(myObject)");
console.log(myObject);


/*
 * @function formatArray
 * @param data the data array to be formatted
 * @returns the (by the function formatObject) new formatted data
 */
function formatArray(data) {
    if (!data) {
        return {};
    }
    for (var i = 0; i < data.length; i++) {
        data[i] = formatObject(data[i]);
    }
    return data;
}

console.log("");
console.log("");
console.log("drumsKitCopy = drumsKitCopyData()");
drumsKitCopy = drumsKitCopyData();
console.log("console.log(drumsKitCopy)");
console.log(drumsKitCopy);
console.log("----");
console.log("data = formatArray(drumsKitCopy)");
var data = formatArray(drumsKitCopy);
console.log("console.log(data)");
console.log("----");
console.log("now also iterate the data items");
for (var i = 0; i < data.length; i++) {
    console.log("console.log(data[" + i + "])");
    console.log(data[i]);
    console.log("----");
}
