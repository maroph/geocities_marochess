var nodeWarning = document.getElementById('warning');
var nodeHistory = document.getElementById('history');
var maxHistSize = 5;

/** PART II **/
function createBlock(obj) {
    //1) create a div with document.createElement
    //var block = ...
    //2) set the class to "block" for example, 
    //set id to the object name and set style attribute of the newly-created div element (block):
    //(HINT: className, id and style.backgroundColor) 
    //3) creates a new p element:
    //// creates a new text-node with the value of the key.letter object property.
    // appends the text-node to the newly-created p element:
    // appends the p element to the block 
    //(HINT: appendChild)

    //4) instantiate a new Audio object
    //var audio = ...
    //5) check if the browser can play mp3 file ('audio/mpeg') with the canPlayType function
        //yes: sets the src attribute of the audio object: path + the first filenames (mp3)
        //no:  sets the src attribute of the audio object: path + the second filenames (ogg)
    //6)  sets the controls attribute of the audio object to false (we do not want to see the controls)
    //7) append the audio to the block
    //8) returns the block
    var block;
    block = document.createElement('div');
    block.setAttribute('id', obj.id);
    block.className = 'block';
    block.style.backgroundColor = obj.color;

    var p = document.createElement('p');
    p.appendChild(document.createTextNode(obj.key.letter));
    block.appendChild(p);

    var audio = document.createElement('audio');
    if (audio.canPlayType('audio/mpeg')) {
        audio.setAttribute('src', obj.url.path + obj.url.filenames[0]);
    } else {
        audio.setAttribute('src', obj.url.path + obj.url.filenames[1]);
    }
    block.appendChild(audio);

    return block;
}

/** PART III **/

//1) Click event
//the listener for click events 
function clickBlock() {
    //1) get the audioElement with the keyword this and a querySelector
    //console.log(this); //may help
    //2) set the currentTime of the audioElement properties to 0
    //(by this way we can play the sound quickly several times in a row. )
    //3) then call the play method of the audioElement
    var audio = this.querySelector('audio');
    audio.currentTime = 0;
    audio.play();
    appendToHistory(soundsKit[this.id]);
}

//2) optional key event

function keyPressed(event) {
    console.log(event.which || event.keyCode);
    //1)get the keyCode or the which
    //alert('which    : ' + event.which + '\nkey code : ' + event.keyCode);
    //2)loop over the soundsKit
    //3)check if the key pressed correspond to the keyCode of an object
    //4) if yes: get the corresponding htmlAudioElement 
    //(by finding the corresponding id - or if you have add to each object the reference to each Html elements ...  )
    //5) set the currentTime of the audioElement properties to 0  
    //5) then call the play method of the audioElement
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    console.log('keyCode: ' + keyCode);
    var modifiers = (event.altKey || event.ctrlKey || event.shiftKey);
    if (modifiers) {
        return;
    }
    for (var i = 0; i < soundsKit.length; i++) {
        if (soundsKit[i].key.keyCode === keyCode) {
            var block = document.getElementById(soundsKit[i].id);
            var audio = block.querySelector('audio');
            audio.currentTime = 0;
            audio.play();
            appendToHistory(soundsKit[i]);
            return;
        }
    }
}


// the history part (part III 3)  
//An idea is to factorize the code keyPressed and clickBlock (create a new function playSound) 
//or you can just create a new function appendToHistory and call it each time a sound is played

function appendToHistory(sound) {
    var h = '';
    if (nodeHistory.innerHTML) {
        h = nodeHistory.innerHTML;
    }
    if (h.length >= maxHistSize) {
        h = h.substr(1);
    }
    h += sound.key.letter;
    nodeHistory.innerHTML = h;
}


/** PART IV **/

function checkAudioSupport() {
    //create a new Audio object
    //then check if for example the function play exist
    //if it raise an error: catch it, display a message (in a alert window or in the warning div) and return false
    //else return true
    var audio = document.createElement('audio');
    if (!audio.play) {
        return false;
    }
    return true;
}



function init() {
    if (maxHistSize < 1) {
        maxHistSize = 1;
    }
    var container = document.getElementById('container');
    console.log('--- Assignment 2 --- ');
    console.log('the soundsKit: ', soundsKit);

    //PART IV checkaudioSupport
    //call checkaudioSupport if it returns false break else continue
    if (!checkAudioSupport()) {
        //alert('HTML5 audio tag not supported!');
        nodeWarning.innerHTML = '<b>Warning: </b>HTML5 audio tag not supported!';
        return;
    }

    // PART II 
    // iterate over the soundsKit Array
    // for each object:
        // appends the result of the createBlock function to the container
        //PART II 1) bind the click event on the result of the createBlock 
        //end of the loop
    var block;
    for (var i = 0; i < soundsKit.length; i++) {
        block = createBlock(soundsKit[i]);
        block.addEventListener('click', clickBlock, true);
        container.appendChild(block);
    }

    //PART III 2) bind the keydown on document
    document.addEventListener('keydown', keyPressed, true);
}

init();
