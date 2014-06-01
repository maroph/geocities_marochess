/**
 * Created by maro on 05.04.14.
 */
function domLoaded() {
    alert('DOM is loaded');
}
console.assert(window.jQuery, 'jQuery not loaded');
//if (window.jQuery) {
////    alert('jQuery loaded');
//    $(domLoaded);
//} else {
//    alert('jQuery not loaded');
//}
//window.alert('JSBegin loaded');
var navInfo = 'Browser Info:';
navInfo += '\nuserAgent : ' + window.navigator.userAgent;
navInfo += '\nappCodeName : ' + window.navigator.appCodeName;
navInfo += '\nappName : ' + window.navigator.appName;
navInfo += '\nappVersion : ' + window.navigator.appVersion;
navInfo += '\nlanguage : ' + window.navigator.language;
navInfo += '\nplatform : ' + window.navigator.platform;
if (navigator.mimeTypes) {
    navInfo += '\nmime types : ';
    for (var i = 0; i < navigator.mimeTypes.length; i++) {
        navInfo += navigator.mimeTypes[i].type + ',';
        //.description
        //.enabledPlugin
        //.suffixes
    }
}
if (navigator.plugins) {
    navInfo += '\nplugins : ';
    for (var i = 0; i < navigator.plugins.length; i++) {
        navInfo += navigator.plugins[i].name + ',';
        //.description
        //.filename
    }
}
//window.alert(navInfo);