/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/
 * Last Update : Sat, 30 Mar 2013 15:53:00 +0100
 * License     : Creative Commons Attribution 3.0 Unported License
 *               http://creativecommons.org/licenses/by/3.0/
 * =============================================================================
 */
function ChessBoard() {
    var cbDiv = document.getElementById('chessboardCanvas');
    if (cbDiv === null) {
        return;
    }
    var colorBackground  = '#c0c0c0';
    var colorLightFields = '#ffffff';
    var colorDarkFields  = '#669966';

    var that = this;

    var imgSize = 38;
    var imgBB     = new Image(imgSize,imgSize);
    imgBB.src = "./chesspieces/bb.gif";

    var imgBK     = new Image(imgSize,imgSize);
    imgBK.src = "./chesspieces/bk.gif";

    var imgBN     = new Image(imgSize,imgSize);
    imgBN.src = "./chesspieces/bn.gif";

    var imgBP     = new Image(imgSize,imgSize);
    imgBP.src = "./chesspieces/bp.gif";

    var imgBQ     = new Image(imgSize,imgSize);
    imgBQ.src = "./chesspieces/bq.gif";

    var imgBR     = new Image(imgSize,imgSize);
    imgBR.src = "./chesspieces/br.gif";

    var imgWB     = new Image(imgSize,imgSize);
    imgWB.src = "./chesspieces/wb.gif";

    var imgWK     = new Image(imgSize,imgSize);
    imgWK.src = "./chesspieces/wk.gif";

    var imgWN     = new Image(imgSize,imgSize);
    imgWN.src = "./chesspieces/wn.gif";

    var imgWP     = new Image(imgSize,imgSize);
    imgWP.src = "./chesspieces/wp.gif";

    var imgWQ     = new Image(imgSize,imgSize);
    imgWQ.src = "./chesspieces/wq.gif";

    var imgWR     = new Image(imgSize,imgSize);
    imgWR.src = "./chesspieces/wr.gif";

    var pieceNone        = 0;
    var pieceWhiteKing   = 1;
    var pieceWhiteQueen  = 2;
    var pieceWhiteRook   = 3;
    var pieceWhiteBishop = 4;
    var pieceWhiteKnight = 5;
    var pieceWhitePawn   = 6;
    var pieceBlackKing   = 7;
    var pieceBlackQueen  = 8;
    var pieceBlackRook   = 9;
    var pieceBlackBishop = 10;
    var pieceBlackKnight = 11;
    var pieceBlackPawn   = 12;

    var pieces = [
          { piece: pieceNone,        img: null },
          { piece: pieceWhiteKing,   img: imgWK },
          { piece: pieceWhiteQueen,  img: imgWQ },
          { piece: pieceWhiteRook,   img: imgWR },
          { piece: pieceWhiteBishop, img: imgWB },
          { piece: pieceWhiteKnight, img: imgWN },
          { piece: pieceWhitePawn,   img: imgWP },
          { piece: pieceBlackKing,   img: imgBK },
          { piece: pieceBlackQueen,  img: imgBQ },
          { piece: pieceBlackRook,   img: imgBR },
          { piece: pieceBlackBishop, img: imgBB },
          { piece: pieceBlackKnight, img: imgBN },
          { piece: pieceBlackPawn,   img: imgBP }
        ];

    var fieldSize = imgSize + 2*5;
    var cbWidth  = 8 * fieldSize + 2 * 30;
    var cbHeight = 8 * fieldSize + 2 * 30;
    var boardOffsetX = 30;
    var boardOffsetY = 30;

    var canvas = document.createElement("canvas");
    canvas.id     = "cbCanvas";
    canvas.width  = cbWidth;
    canvas.height = cbHeight;
    canvas.style.border = "1px solid black";
    var ctx = canvas.getContext("2d");

    ctx.fillStyle = colorBackground;
    ctx.fillRect(0, 0, cbWidth, cbHeight);
    ctx.beginPath();

    // draw a border around the chess board
    ctx.rect(boardOffsetX, boardOffsetY, 8 * fieldSize, 8 * fieldSize);
    ctx.lineWidth = 1;
    ctx.strokeStyle = '#000000';
    ctx.stroke();
    ctx.beginPath();

    // draw the light/dark squares
    var i, j;
    for (i = 0; i < 8; i += 1) {
        for (j = 0; j < 8; j += 1) {
            clearField(i,j);
        }
    }
    ctx.beginPath();

    // label the chessboard on the boarder
    ctx.fillStyle="#000000";
    ctx.font = 'italic 18px Calibri';
    var alpha = ['a','b','c','d','e','f','g','h'];
    var xx = boardOffsetX + 8 * fieldSize;
    var yy = boardOffsetY + 8 * fieldSize;
    for(i = 0; i < 8; i += 1) {
        ctx.fillText(alpha[i], boardOffsetX + (i * fieldSize + 15),  boardOffsetY - 8);
        ctx.fillText(alpha[i], boardOffsetX + (i * fieldSize + 15),  yy + 20);
    }
    var num = 8;
    for (i = 0; i < 8; i += 1) {
        ctx.fillText(num, boardOffsetX - 20, 10 + fieldSize + (i * fieldSize));
        ctx.fillText(num, xx + 10, 10 + fieldSize + (i * fieldSize));
        num--;
    }
    ctx.beginPath();


    function clearField(posX, posY) {
        if (posX < 0) posX = 0;
        if (posY < 0) posY = 0;
        if (posX > 7) posX = 7;
        if (posY > 7) posY = 7;

        var isLightField = true;
        if ((posX % 2) == 0) {
            if ((posY % 2) == 0) {
                isLightField = true;
            } else {
                isLightField = false;
            }
        } else {
            if ((posY % 2) == 0) {
                isLightField = false;
            } else {
                isLightField = true;
            }
        }
        if (isLightField) {
            ctx.fillStyle = colorLightFields;
        } else {
            ctx.fillStyle = colorDarkFields;
        }
        ctx.fillRect(posX * fieldSize + boardOffsetX, boardOffsetY + (posY*fieldSize), fieldSize, fieldSize);
        ctx.beginPath();
    }

    function setPiece(piece, posX, posY) {
        if (piece < 0)  piece = 0;
        if (piece > 12) piece = 0;
        if (posX < 0) posX = 0;
        if (posY < 0) posY = 0;
        if (posX > 7) posX = 7;
        if (posY > 7) posY = 7;

        if (piece == 0) {
            clearField(posX, posY);
            return;
        }

        ctx.drawImage(pieces[piece].img, 5 + posX * fieldSize + boardOffsetX, boardOffsetY + 5 + (posY*fieldSize));
        ctx.beginPath();
    }


    function initPosition() {
        setPiece(pieceBlackRook,   0, 0);
        setPiece(pieceBlackKnight, 1, 0);
        setPiece(pieceBlackBishop, 2, 0);
        setPiece(pieceBlackQueen,  3, 0);
        setPiece(pieceBlackKing,   4, 0);
        setPiece(pieceBlackBishop, 5, 0);
        setPiece(pieceBlackKnight, 6, 0);
        setPiece(pieceBlackRook,   7, 0);
        setPiece(pieceBlackPawn,   0, 1);
        setPiece(pieceBlackPawn,   1, 1);
        setPiece(pieceBlackPawn,   2, 1);
        setPiece(pieceBlackPawn,   3, 1);
        setPiece(pieceBlackPawn,   4, 1);
        setPiece(pieceBlackPawn,   5, 1);
        setPiece(pieceBlackPawn,   6, 1);
        setPiece(pieceBlackPawn,   7, 1);

        setPiece(pieceWhitePawn,   0, 6);
        setPiece(pieceWhitePawn,   1, 6);
        setPiece(pieceWhitePawn,   2, 6);
        setPiece(pieceWhitePawn,   3, 6);
        setPiece(pieceWhitePawn,   4, 6);
        setPiece(pieceWhitePawn,   5, 6);
        setPiece(pieceWhitePawn,   6, 6);
        setPiece(pieceWhitePawn,   7, 6);
        setPiece(pieceWhiteRook,   0, 7);
        setPiece(pieceWhiteKnight, 1, 7);
        setPiece(pieceWhiteBishop, 2, 7);
        setPiece(pieceWhiteQueen,  3, 7);
        setPiece(pieceWhiteKing,   4, 7);
        setPiece(pieceWhiteBishop, 5, 7);
        setPiece(pieceWhiteKnight, 6, 7);
        setPiece(pieceWhiteRook,   7, 7);
    }


    function boardMouseClick(event) {
        var leftButton = true;
        if (event.button) {
            if (event.button >= 2) {
                leftButton = false;
            }
        }
        var x = event.clientX - canvas.offsetLeft;
        var y = event.clientY - canvas.offsetTop;
        if ((x < boardOffsetX) || (y < boardOffsetY)) {
            return;
        }
        var maxX = boardOffsetX + 8 * fieldSize;
        var maxY = boardOffsetY + 8 * fieldSize;
        if (x > maxX) {
            return;
        }
        if (y > maxY) {
            return;
        }
        var posX = Math.floor((x - boardOffsetX) / fieldSize);
        var posY = Math.floor((y - boardOffsetY) / fieldSize);
        if (posX > 7) posX = 7;
        if (posY > 7) posY = 7;

        if (!leftButton) {
            clearField(posX,posY);
            return;
        }

        var alpha = ['a','b','c','d','e','f','g','h'];
        var nums = ['8','7','6','5','4','3','2','1'];
        alert('[(x:' + x + ',y:' + y + '),(posX:' + posX + ',posY:' + posY + ')]: ' + alpha[posX] + nums[posY]);

    }

    canvas.oncontextmenu = function() { return false; }
    canvas.addEventListener("mousedown", boardMouseClick, true);
    window.addEventListener("load", initPosition, false);
    cbDiv.appendChild(canvas);
}