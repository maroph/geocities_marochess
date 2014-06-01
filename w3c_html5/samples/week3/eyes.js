/**
 * http://eminkura.com/eyes/eyes.js
 */
function Eye( x1, y1, r, c ){
    this.radius = r;
    this.x = x1;
    this.y = y1;
    this.color = c;
}

function Eyeball( x1, y1, r, m, c ){
    this.radius = r;
    this.x = x1;
    this.y = y1;
    this.startX = x1;
    this.startY = y1;
    this.canvasX = 0;
    this.canvasY = 0;
    this.max = m;
    this.color = c;
}

function Head( x1, y1, r, c ){
    this.radius = r;
    this.x = x1;
    this.y = y1;
    this.color = c;
}

function Mouth( x1, y1, r, h, c ){
    this.radius = r;
    this.x = x1;
    this.y = y1;
    this.headH = h;
    this.canvasY = 0;
    this.happy = true;
    this.normal = false;
    this.color = c;
}

Mouth.prototype = {

    paint: function( g ){

        g.beginPath();

        if( this.happy ){
            g.arc( this.x, this.y, this.radius, Math.PI / 4,  3 * Math.PI / 4, false );
        }else if( this.normal ){
            g.moveTo( this.x - this.radius, this.y + this.radius );
            g.lineTo( this.x + this.radius, this.y + this.radius );
        }else{
            g.arc( this.x, this.y + this.radius * 2, this.radius, -Math.PI / 4,  -3 * Math.PI / 4, true );
        }
        g.strokeStyle = this.color;
        g.stroke();
        g.closePath();

    },

    follow: function(x, y){

        if( Math.abs( ( this.y + this.canvasY ) - y ) <= this.headH ){
            this.normal = true;
            this.happy = false;
        }else{
            this.normal = false;
            if( this.y + this.canvasY > y ){
                this.happy = false;
            }else{
                this.happy = true;
            }
        }

    }
};

Head.prototype = {

    paint: function( g ){

        g.beginPath();

        g.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );

        g.strokeStyle = this.color;

        g.stroke();

        g.closePath();

    }

};

Eye.prototype = {

    paint: function( g ){

        g.beginPath();

        g.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );

        g.strokeStyle = this.color;

        g.stroke();

        g.closePath();

    }


};

Eyeball.prototype = {

    follow: function( x1, y1 ){

        if( Math.abs( x1 - this.startX ) > this.max ||  Math.abs( y1 - this.startY ) > this.max ){

            var angle = Math.atan2( y1 - ( this.startY + this.canvasY ) , x1 - ( this.startX + this.canvasX ) );

            var movX = Math.cos( angle ) * this.max;
            var movY = Math.sin( angle ) * this.max;

            this.x = this.startX + movX;
            this.y = this.startY + movY;

        }


    },

    paint: function( g ){

        g.beginPath();
        g.arc( this.x, this.y, this.radius, 0, 2 * Math.PI, true );
        g.fillStyle = this.color;
        g.fill();
        g.closePath();

    }
};






function Guy( options ){

    this.options = options || {};

    if( !window.HTMLCanvasElement ){
        console.log( 'HTML5 Canvas Element is not supported!' );
        return;
    }

    options = options || {};

    if (options.id) {
        var node = document.getElementById(options.id);
        if (node) {
            this.appendElement = node;
        } else {
            this.appendElement = document.body;
        }
    } else {
        this.appendElement = document.body;
    }
    //this.appendElement = options.appendElement || document.body;

    var scale = options.scale || 1;

    this.domElement = document.createElement( 'canvas' );
    if( options.position ){
        this.domElement.style.position = options.position;
    }
    this.domElement.style.left =  ( options.x || 0 ) + 'px';
    this.domElement.style.top =  ( options.y || 0 ) + 'px';
    this.domElement.style.zIndex = '999';
    this.domElement.width = 120 * scale;
    this.domElement.height = 120 * scale;
    this.color = options.color || '#1B1918';

    var	g = this.domElement.getContext('2d'),
    that = this;


    var head = new Head( 60 * scale, 60 * scale, 50 * scale, this.color ),
        eyeL = new Eye( 43 * scale, 60 * scale, 15 * scale, this.color ),
        eyeR = new Eye( 77 * scale, 60 * scale, 15 * scale, this.color ),
        eyeballL = new Eyeball( 43 * scale, 60 * scale, 6 * scale, eyeL.radius - 7 * scale, this.color ),
        eyeballR = new Eyeball( 77 * scale, 60 * scale, 6 * scale, eyeR.radius - 7 * scale, this.color ),
        mouth = new Mouth( 60 * scale, 70 * scale, 20 * scale, 50 * scale, this.color );


    // find Element Position
    var findPos = function( el ){
        var left = 0, top = 0;

        do{
            left += el.offsetLeft;
            top += el.offsetTop;
        }while( el = el.offsetParent );

        return { 'x': left, 'y': top };
    };

    this.appendElement.appendChild( this.domElement );

    var canvasPos = findPos( this.domElement );

    eyeballL.canvasX = canvasPos.x;
    eyeballR.canvasX = canvasPos.x;

    eyeballL.canvasY = canvasPos.y;
    eyeballR.canvasY = canvasPos.y;

    mouth.canvasY = canvasPos.y;



    g.lineWidth = 3 * scale;
    g.lineCap = 'round';


    window.addEventListener( 'mousemove', function( ev ){

        var x = ev.pageX,
            y = ev.pageY;

        if( that.options.position !== undefined && that.options.position === 'fixed' ){
            x = ev.pageX - (window.scrollX || 0);
            y = ev.pageY - (window.scrollY || 0);
        }



        canvasPos = findPos( that.domElement );

        eyeballL.canvasX = canvasPos.x;
        eyeballR.canvasX = canvasPos.x;

        eyeballL.canvasY = canvasPos.y;
        eyeballR.canvasY = canvasPos.y;

        mouth.canvasY = canvasPos.y;


        eyeballL.follow( x, y );
        eyeballR.follow( x, y );

        mouth.follow( x, y );

        g.clearRect( 0, 0, 120 * scale, 120 * scale );

        head.paint(g);

        eyeL.paint(g);
        eyeR.paint(g);

        eyeballL.paint(g);
        eyeballR.paint(g);

        mouth.paint(g);

    }, false );

    head.paint(g);

    eyeL.paint(g);
    eyeR.paint(g);

    eyeballL.paint(g);
    eyeballR.paint(g);

    mouth.paint(g);
}
