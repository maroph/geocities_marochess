// Global variables
var paint;
// By default, draw with pencil, it is also the first (defaulted) entry in the drawing tools menu
var DEFAULT_TOOL = 'pencil';

// Object which will handle the main canvas
function PaintObject(maincvs) {

    this.started = false;

    // get handle of the main canvas, as a DOM object, not as a jQuery Object. Context is unfortunately not yet
    // available in jquery canvas wrapper object.
    var mainCanvas = $("#" + maincvs).get(0);

    // Check if everything is ok
    if (!mainCanvas) {alert("canvas undefined, does not seem to be supported by your browser");}
    if (!mainCanvas.getContext) {alert('Error: canvas.getContext() undefined !');}

    // Get the context for drawing in the canvas
    var mainContext = mainCanvas.getContext('2d');
    if (!mainContext) {alert("could not get the context for the main canvas");}

    this.getMainCanvas = function () {
        return mainCanvas;
    }
    this.getMainContext = function () {
        return mainContext;
    }

    // Prepare a second canvas on top of the previous one, kind of second "layer" that we will use
    // in order to draw elastic objects like a line, a rectangle or an ellipse we adjust using the mouse
    // and that follows mouse movements
    var frontCanvas = document.createElement('canvas');
    frontCanvas.id = 'canvasFront';
    // Add the temporary canvas as a second child of the mainCanvas parent.
    mainCanvas.parentNode.appendChild(frontCanvas);

    // Check if everything is ok
    if (!frontCanvas) {alert("frontCanvas undefined, does not seem to be supported by your browser");}
    if (!frontCanvas.getContext) {alert('Error: frontCanvas.getContext() undefined !');}

    // Get the context for drawing in the canvas
    var frontContext = frontCanvas.getContext('2d');
    if (!frontContext) {alert("could not get the context for the front canvas");}

    this.getFrontCanvas = function () {
        return frontCanvas;
    }
    this.getFrontContext = function () {
        return frontContext;
    }

    // Canvas doesnt scale well with '%' dimension so we use a little trick.
    // We give them the size of one of their parent node which can be scalable.
    frontCanvas.height = mainCanvas.height = $("#content")[0].clientHeight;
    frontCanvas.width = mainCanvas.width = $("#content")[0].clientWidth;

    // Create the drawing tool
    var drawingTool = new setOfDrawingTools[DEFAULT_TOOL]();

    // bind events. We use a function multiplexEvent that will call the proper listeners
    // methods of the currentTool.
    this.bindMultiplexEvents = function () {
        $("#canvasFront").mousedown(this.multiplexEvents);
        $("#canvasFront").mousemove(this.multiplexEvents);
        $("#canvasFront").mouseup(this.multiplexEvents);
    }

    // if currentTool is pencil, and event.type is mousemove, will
    // call pencil.mousemouve(event), if currentTool is line and
    // event.type is mouseup, will call line.mouseup(event) etc.
    this.multiplexEvents = function (event) {
        drawingTool[event.type](event);
    }

    var lastDrawText = 'Hello World';
    var lastImage = new Image();
    lastImage.src = './html5-badge-h-css3-multimedia-semantics.png';
    // Handle the drawing tools menu. The selected entry value can be 'Pencil',
    // 'Line' etc.
    var lastId = 'pencil';
    this.changeDrawingTool = function () {
        if (!this.id) {
            return;
        }
        // this.id is the id of the selected menu item
        drawingTool = new setOfDrawingTools[this.id]();
        if (this.id != lastId) {
            this.className = 'toolSelected';
            document.getElementById(lastId).className = 'toolNotSelected';
            lastId = this.id;
        }
        if (this.id == 'drawText') {
            drawingTool.text = lastDrawText;
            var drawText = prompt("Please enter text to draw", drawingTool.text);
            if (drawText !== '') {
                drawingTool.text = drawText;
                lastDrawText = drawText;
            }
            return;
        }
        if (this.id == 'image') {
            drawingTool.image = lastImage;
            var drawImage = prompt("Please enter image URL", drawingTool.image.src);
            if (drawImage !== '') {
                lastImage.src = drawImage;
                drawingTool.image = lastImage;
            }
            return;
        }
    }
    // Bind the changeDrawingTool function onClick to every menu items.
    $("#drawCommands").find("span").click(this.changeDrawingTool);

    // Handle the color menus
    mainContext.strokeStyle = frontContext.strokeStyle = "#" + $("#strokeColor").val();
    $("#strokeColor").change(function() {
        mainContext.strokeStyle = frontContext.strokeStyle = "#" + $("#strokeColor").val();
    });

    mainContext.fillStyle = frontContext.fillStyle = "#" + $("#fillColor").val();
    $("#fillColor").change(function() {
        mainContext.fillStyle = frontContext.fillStyle = "#" + $("#fillColor").val();
    });

    // handle the stroke size
    mainContext.lineWidth = frontContext.lineWidth = $("#strokeSize").val();
    $("#strokeSize").change(function() {
        mainContext.lineWidth = frontContext.lineWidth = $("#strokeSize").val();
    });

    mainContext.font = frontContext.font = "20pt Arial";

    var fillShapes = true;
    // handle the check box that specifies if we fill shapes
    //this.fillShapes = $("#fillShapes").attr('checked');
    $("#fillShapes").change(function(){
        fillShapes = $(this).attr("checked");
    });

    this.getFillShapesStatus = function(){
        return fillShapes;
    }

     // Draws the front canvas on the main canvas
    this.drawFrontCanvasOnMainCanvas = function () {
        mainContext.drawImage(frontCanvas, 0, 0);
        frontContext.clearRect(0, 0, frontCanvas.width, frontCanvas.height);
    }

    // Draws the front canvas on the main canvas
    this.clearMainCanvas = function () {
        mainContext.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
    }

    this.createImageDataForDownload = function(atag) {
        atag.href = mainCanvas.toDataURL();
    }
};