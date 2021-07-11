/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/
 * Last Update : Sun, 24 Mar 2013 14:59:00 +0100
 * License     : Creative Commons Attribution 3.0 Unported License
 *               http://creativecommons.org/licenses/by/3.0/
 * =============================================================================
 */
//var baseURL = 'http://www.geocities.ws/marochess';
//if (window.location.host.indexOf('geocities.ws') < 0) {
//    baseURL = window.location.protocol + '//' + window.location.host + '/projects/' + window.location.pathname.split("/")[2];
//}
let baseURL = 'https://maroph.github.io/geocities_marochess/';
if (window.location.host.indexOf('maroph.github.io') < 0) {
    baseURL = window.location.protocol + '//' + window.location.host +
        '/geocities_marochess';
        //'/geocities_marochess/' + window.location.pathname.split("/")[2];
    //alert(baseURL);
}


function openURL(url, newTabWindow) {
    "use strict";
    if ((url === null) || (url === "")) {
        return;
    }
    newTabWindow = typeof newTabWindow !== 'undefined' ? newTabWindow : 'true';
    newTabWindow = newTabWindow.toString() === "true";

    let mobile = (/iphone|ipad|ipod|android|blackberry|mini|windows\sce|palm/i.test(navigator.userAgent.toLowerCase()));
    if (mobile) {  
        newTabWindow = false;
    }  

    if (!newTabWindow) {
        window.location = url;
        return;
    }

    let formUrl2Go = document.getElementById("de_marochess_js_formUrl2Go");
    if (formUrl2Go == null) {
        let divNode = document.createElement("div");
        divNode.innerHTML = '<form id="de_marochess_js_formUrl2Go" method="get" target="_blank" action=""></form>';
        let bodyNode = document.getElementsByTagName('body')[0];
        bodyNode.appendChild(divNode);
        formUrl2Go = document.getElementById("de_marochess_js_formUrl2Go");
        if (formUrl2Go == null) {
            // can't add form to document - try fallback
            window.open(url, "_blank");
            return;
        }
    }
    formUrl2Go.action = url;
    formUrl2Go.submit();
}
