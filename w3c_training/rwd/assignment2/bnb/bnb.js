/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/w3c_training/rwd/assignment1/
 * Last Update : Fri, 3 Oct 2014 16:47:00 +0200
 * License     : Creative Commons Attribution 4.0 International
 *               http://creativecommons.org/licenses/by/4.0/
 * =============================================================================
 */
function popw(pagename, windowname) {
    window.open(pagename, windowname, config='height=200, width=400, toolbar=no, menubar=no, scrollbars=no, resizable=no, location=no, directories=no, status=no')
}

function redir(uri) {
    window.open(uri)
}

function closeWindow() {
    window.close();
}

var btnClose = document.getElementById('btnClose');
if (btnClose) {
    btnClose.addEventListener('click', closeWindow, false);
}

var formClose = document.getElementById('formClose');
if (formClose) {
    formClose.style.display = 'block';
}
