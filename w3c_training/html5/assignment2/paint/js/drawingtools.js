// Array of the available drawing tools
var setOfDrawingTools = new Array();
// Previous position of the mouse
var previousMousePos;

// The Pencil Drawing Tool Object.
setOfDrawingTools.pencil = function () {
    this.mousedown = function (event) {
        paint.started = true;
        previousMousePos = getMousePos(paint.getFrontCanvas(), event);
    };

    this.mousemove = function (event) {
        // we delegate the computation of the mouse position
        // to a utility function as this is not so trivial
        var mousePos = getMousePos(paint.getFrontCanvas(), event);

        // Let's draw some lines that follow the mouse pos
        if (paint.started) {
            paint.getMainContext().beginPath();
            paint.getMainContext().moveTo(previousMousePos.x, previousMousePos.y);
            paint.getMainContext().lineTo(mousePos.x, mousePos.y);
            paint.getMainContext().stroke();
        }
        previousMousePos = mousePos;
    };

    this.mouseup = function (event) {
        paint.started = false;
    }
};

// The Line Drawing Tool Object
setOfDrawingTools.line = function () {
    this.mousedown = function (event) {
        paint.started = true;
        previousMousePos = getMousePos(paint.getFrontCanvas(), event);
    };


    this.mousemove = function (event) {
        var mousePos = getMousePos(paint.getFrontCanvas(), event);
        if (paint.started) {
            paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);

            paint.getFrontContext().beginPath();
            paint.getFrontContext().moveTo(previousMousePos.x, previousMousePos.y);
            paint.getFrontContext().lineTo(mousePos.x, mousePos.y);
            paint.getFrontContext().stroke();
        }
    };

    this.mouseup = function (event) {
        paint.started = false;
        paint.drawFrontCanvasOnMainCanvas();
    }
};

// The Rectangle Drawing Tool Object
setOfDrawingTools.rectangle = function() {
    var mousePos, x, y, width, height;

    this.mousedown = function (event) {
        previousMousePos = getMousePos(paint.getFrontCanvas(), event);
        paint.started = true;
    }

    this.mousemove = function (event) {
        mousePos = getMousePos(paint.getFrontCanvas(), event);
        // Draw only if we clicked somewhere
        if (paint.started) {
            // clear the content of the canvas
            paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);

            width = Math.abs(previousMousePos.x - mousePos.x);
            height = Math.abs(previousMousePos.y - mousePos.y);
            x = Math.min(previousMousePos.x, mousePos.x);
            y = Math.min(previousMousePos.y, mousePos.y);
            if(paint.getFillShapesStatus()) {
                paint.getFrontContext().fillRect(x, y, width, height);
            }
            paint.getFrontContext().strokeRect(x, y, width, height);
        }
    }

    this.mouseup = function (event) {
        paint.drawFrontCanvasOnMainCanvas();
        paint.started = false;
    }
};

// The Circle Drawing Tool Object
setOfDrawingTools.circle = function() {
    var mousePos, x, y, radius;

    this.mousedown = function (event) {
        previousMousePos = getMousePos(paint.getFrontCanvas(), event);
        paint.started = true;
    }

    this.mousemove = function (event) {
        mousePos = getMousePos(paint.getFrontCanvas(), event);
        // Draw only if we clicked somewhere
        if (paint.started) {
            // clear the content of the canvas
            paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);

            // center of the circle is the position that has been clicked
            x = previousMousePos.x;
            y = previousMousePos.y;
            // radius is the distance between the clicked position (center) and current position
            radius = Math.sqrt(Math.pow(previousMousePos.x - mousePos.x, 2) + Math.pow(previousMousePos.y - mousePos.y, 2));
            paint.getFrontContext().beginPath();
            paint.getFrontContext().arc(x, y, radius, 0, 2 * Math.PI, false);

            if(paint.getFillShapesStatus()) {
                paint.getFrontContext().fill();
            }
            paint.getFrontContext().stroke();
        }
    }

    this.mouseup = function (event) {
        paint.drawFrontCanvasOnMainCanvas();
        paint.started = false;
    }
};

// The Ellipse Drawing Tool Object
setOfDrawingTools.ellipse = function() {
    this.mousedown = function (event) {
        previousMousePos = getMousePos(paint.getFrontCanvas(), event);
        paint.started = true;
    }

    this.mousemove = function (event) {
        if (!paint.started) {
            return;
        }

        var mousePos = getMousePos(paint.getFrontCanvas(), event);
        paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);
        paint.getFrontContext().save();
        paint.getFrontContext().beginPath();

        var width  = 2 * Math.abs(previousMousePos.x - mousePos.x);
        if (width == 0) width = 2;
        var height = 2 * Math.abs(previousMousePos.y - mousePos.y);
        if (height == 0) height = 2;
        var radius = Math.sqrt(Math.pow(previousMousePos.x - mousePos.x, 2) + Math.pow(previousMousePos.y - mousePos.y, 2));
        var circumference = Math.max(width, height);
        var scaleX = width / circumference;
        var scaleY = height / circumference;

        paint.getFrontContext().translate(previousMousePos.x, previousMousePos.y);
        paint.getFrontContext().scale(scaleX, scaleY);
        paint.getFrontContext().beginPath();
        paint.getFrontContext().arc(0, 0, radius, 0, 2 * Math.PI, false);

        if(paint.getFillShapesStatus()) {
            paint.getFrontContext().fill();
        }
        paint.getFrontContext().stroke();
        paint.getFrontContext().closePath();
        paint.getFrontContext().restore();
    }

    this.mouseup = function (event) {
        paint.drawFrontCanvasOnMainCanvas();
        paint.started = false;
    }
};

// The Text Drawing Tool Object
setOfDrawingTools.drawText = function() {
    this.text = 'Hello World';

    this.mousedown = function (event) {
        paint.started = true;
    }

    this.mousemove = function (event) {
        if (!paint.started) {
            return;
        }
        var mousePos = getMousePos(paint.getFrontCanvas(), event);
        paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);
        paint.getFrontContext().beginPath();

        paint.getFrontContext().fillText(this.text, mousePos.x, mousePos.y);
        paint.getFrontContext().strokeText(this.text, mousePos.x, mousePos.y);

        var textMetrics = paint.getFrontContext().measureText(this.text);
        var width = textMetrics.width;

        paint.getFrontContext().moveTo(mousePos.x, mousePos.y);
        paint.getFrontContext().lineTo(mousePos.x + width, mousePos.y);

        if(paint.getFillShapesStatus()) {
            paint.getFrontContext().fill();
        }
        paint.getFrontContext().stroke();
    }

    this.mouseup = function (event) {
        paint.drawFrontCanvasOnMainCanvas();
        paint.started = false;
    }
};


// The Triangle Drawing Tool Object
setOfDrawingTools.triangle = function() {
    var previousMousePos2 = null;
    var mousePos;

    paint.started = false;

    this.mousedown = function (event) {
        if (!paint.started) {
            previousMousePos = getMousePos(paint.getFrontCanvas(), event);
            paint.started = true;
            return;
        }
    }

    this.mousemove = function (event) {
        if (!paint.started) {
            return;
        }
        mousePos = getMousePos(paint.getFrontCanvas(), event);
        paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);
        paint.getFrontContext().beginPath();

        if (previousMousePos2 === null) {
            paint.getFrontContext().moveTo(previousMousePos.x,previousMousePos.y);
            paint.getFrontContext().lineTo(mousePos.x, mousePos.y);
        } else {
            paint.getFrontContext().moveTo(previousMousePos.x,previousMousePos.y);
            paint.getFrontContext().lineTo(previousMousePos2.x,previousMousePos2.y);
            paint.getFrontContext().lineTo(mousePos.x, mousePos.y);
            paint.getFrontContext().closePath();
        }

        if(paint.getFillShapesStatus()) {
            paint.getFrontContext().fill();
        }
        paint.getFrontContext().stroke();
    }

    this.mouseup = function (event) {
        if (previousMousePos2 !== null) {
            paint.drawFrontCanvasOnMainCanvas();
            paint.started = false;
            previousMousePos2 = null;
        } else {
            previousMousePos2 = getMousePos(paint.getFrontCanvas(), event);
        }
    }
};

// The Text Drawing Tool Object
setOfDrawingTools.image = function() {
    this.image = null;

    var mousePos;

    this.mousedown = function (event) {
        paint.started = true;
    }

    this.mousemove = function (event) {
        if (!paint.started) {
            return;
        }
        mousePos = getMousePos(paint.getFrontCanvas(), event);

        paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);
        paint.getFrontContext().beginPath();

        paint.getFrontContext().drawImage(this.image, mousePos.x, mousePos.y, this.image.width, this.image.height);

        if(paint.getFillShapesStatus()) {
            paint.getFrontContext().fill();
        }
        paint.getFrontContext().stroke();
    }

    this.mouseup = function (event) {
        if (!paint.started) {
            return;
        }
        mousePos = getMousePos(paint.getFrontCanvas(), event);

        paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);
        paint.getFrontContext().beginPath();

        paint.getFrontContext().drawImage(this.image, mousePos.x, mousePos.y, this.image.width, this.image.height);

        if(paint.getFillShapesStatus()) {
            paint.getFrontContext().fill();
        }
        paint.getFrontContext().stroke();
        paint.drawFrontCanvasOnMainCanvas();
        paint.started = false;
    }
};

// The Rectangle Drawing Tool Object
setOfDrawingTools.gradRectangle = function() {
    var mousePos, x, y, width, height;

    this.mousedown = function (event) {
        previousMousePos = getMousePos(paint.getFrontCanvas(), event);
        paint.started = true;
    }

    this.mousemove = function (event) {
        if (!paint.started) {
            return;
        }

        mousePos = getMousePos(paint.getFrontCanvas(), event);
        paint.getFrontContext().clearRect(0, 0, paint.getFrontCanvas().width, paint.getFrontCanvas().height);

        width = Math.abs(previousMousePos.x - mousePos.x);
        height = Math.abs(previousMousePos.y - mousePos.y);
        x = Math.min(previousMousePos.x, mousePos.x);
        y = Math.min(previousMousePos.y, mousePos.y);

        var my_gradient = paint.getFrontContext().createLinearGradient(x, y, x+width, y);
        my_gradient.addColorStop(0,    "rgba(255, 0, 0, 1)");
        my_gradient.addColorStop(0.15, "rgba(255, 255, 0, 1)");
        my_gradient.addColorStop(0.3,  "rgba(0, 255, 0, 1)");
        my_gradient.addColorStop(0.5,  "rgba(0, 255, 255, 1)");
        my_gradient.addColorStop(0.65, "rgba(0, 0, 255, 1)");
        my_gradient.addColorStop(0.8,  "rgba(255, 0, 255, 1)");
        my_gradient.addColorStop(1,    "rgba(255, 0, 0, 1)");
        var save_fillStyle = paint.getFrontContext().fillStyle;
        paint.getFrontContext().fillStyle = my_gradient;
        paint.getFrontContext().fillRect(x, y, width, height);
        paint.getFrontContext().strokeRect(x, y, width, height);
        paint.getFrontContext().fillStyle = save_fillStyle;

    }

    this.mouseup = function (event) {
        if (!paint.started) {
            return;
        }

        paint.drawFrontCanvasOnMainCanvas();
        paint.started = false;
    }
};
