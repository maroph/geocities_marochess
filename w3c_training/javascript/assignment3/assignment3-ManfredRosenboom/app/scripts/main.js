var maxHistSize = 10;

/* UTILITY */

// Small utility function, for printing an array 
function printArrayLabel(label, arrayObj) {
    console.log(label);
    printArray(arrayObj);
}
function printArray(arrayObj) {
    arrayObj.forEach(function(o) {
       console.log('\t' , o);
    });
}

//the findBy to get the obj from a property 
function findBy(list, property, value) {
    for(var i =0 ; i< list.length; i++) {
        var obj = list[i];
        if(obj[property] == value) {
            return obj;
        }
    }
}

/** PART I **/
//complete
function createBlock(obj) {
    //1) create a div with the p inside. And within the p the obj.key.letter
    //complete:
    //var block = $(// ...);
    var $block = $('<div></div>').append($('<p></p>').text(obj.key.letter));
    //2) set the class to "block" for example,
    //set id to the object name and set style attribute of the newly-created div element (block):
    //(HINT: use the following methods of jQuery
        //.addClass, .attr  and .css) 
    /*
    http://api.jquery.com/addClass/
    http://api.jquery.com/attr/
    http://api.jquery.com/css/
    */
    $block.addClass('block').attr('id',obj.id).css('background-color', obj.color);

    //the audio part does not change 
    var audio = new Audio();
    if(audio.canPlayType('audio/mpeg')) {
        audio.src =  obj.url.path + obj.url.filenames[0];
    }
    else {
        audio.src = obj.url.path + obj.url.filenames[1];
    }
    audio.controls = false;

    //7) append the audio to the block with the jquery method: append
    //http://api.jquery.com/append/
    //8) returns the block
    $block.append($(audio));
    return $block;
}


//PART I ) Click event

//the callback for click event (nothing to complete here)
function clickBlock() {
    //Here some changes first we get the object
    var obj = findBy(soundsKit,'id',this.id);
    //then we call the function playSound with the object as parameter
    playSound(obj);
}

//complete
function playSound(obj) {
    //we get the HTML element
    var $el = $(obj.el);
    //now from this HTML element we need to get (.find) the audioElem
    //http://api.jquery.com/find/
    var audioElem = $el.find('audio')[0];
    audioElem.currentTime = 0;
    audioElem.play();

    //call addToHistory with obj as parameter
    addToHistory(obj);

    //PART II: call the makeAnim function with obj as parameter
    makeAnim(obj);
}

//the add history function 
function addToHistory(obj) {
    var letter = obj.key.letter;
    var historySize = $history.text().length;
    if (historySize >= maxHistSize) {
        var text = $history.text();
        $history.text(text.substr(1,maxHistSize));
    }
    $history.append(letter);
}


/* OPTIONAL PART: KEYDOWN*/
function keyPressed(event) {
    //console.log(event.which || event.keyCode);
    //1)get the keyCode or the which 
    //2)loop over the soundsKit
    //3)check if the key pressed correspond to the keyCode of an object
    //4) if yes: get the corresponding object
    //then call playSound
    var keyCode = ('which' in event) ? event.which : event.keyCode;
    console.log('keyCode: ' + keyCode);
    var modifiers = (event.altKey || event.ctrlKey || event.shiftKey);
    if (modifiers) {
        return;
    }
    $(soundsKit).each(function() {
            if (this.key.keyCode == keyCode) {
                playSound(this);
                return;
            }
        }
    );
    /*
    for (var i = 0; i < soundsKit.length; i++) {
        if (soundsKit[i].key.keyCode == keyCode) {
            playSound(soundsKit[i]);
            return;
        }
    }
    */
}


/* PART II - ANIMATION */

//complete
function makeAnim(obj) {
    // start the simple global animation
    $anim.css('background-color', obj.color);
    $anim.fadeIn(500);
    $anim.fadeOut(500);

    // start the simple per sound animation
    var a = 50;
    obj.fx.animate({height:a+"px",backgroundColor:obj.color},50,function(){
        $(this).animate({height:"10px",backgroundColor:"#8E8E8E"},{duration:600,queue:false})
    });
}

function checkAudioSupport() {
    //create a new Audio object
    //then check if for example the function play exist
    //if it raise an error: catch it, display a message (in a alert window or in the warning div) and return false
    //else return true
    var audio = new Audio();
    if (!audio.play) {
        return false;
    }
    return true;
}




var $container = $('#container');
var $anim      = $('#anim');
var $history   = $('#history');

$(document).ready(function() {
    console.log('--- Assignment 3 --- ');
    if (!checkAudioSupport()) {
        $('#warning').append($('<b>Warning: </b>')).append($('<span>HTML5 audio tag not supported!</span>'));
        return;
    }

    console.log('the soundsKit: ', soundsKit);
    //PART I 
    //iterate over the soundsKit Array
    for (var i=0; i<soundsKit.length; i++) {
        var obj = soundsKit[i];
        //1) add a property el to the object and set it to the result of the createBlock function
        obj.el = createBlock(obj);
        //2) append the obj.el to the $container (use append)
        //obj.append(//...)
        $container.append(obj.el);
        //3) bind the click event on the obj.el (and pass the clickBlock function)
        //obj.el.click(//...)
        //http://api.jquery.com/click/
        //end of the loop
        obj.el.click(clickBlock);

        // add the per sound animation data
        var $a = $("<span></span>");
        var w = 50;
        obj.fx = $a;
        obj.fx.css("width", w);
        obj.fx.css("left", i * (w + 20));
        $(".fx").append($a);
    }

    //PART II 2) bind the keydown on body with jQuery
    //http://api.jquery.com/keydown/
    //http://api.jquery.com/on/
    $(document).keydown(keyPressed);
});