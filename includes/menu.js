/*
 * Author      : Manfred Rosenboom
 * Site        : http://www.geocities.ws/marochess/
 * Last Update : Sat, 31 Mar 2013 17:08:00 +0200
 * License     : Creative Commons Attribution 3.0 Unported License
 *               http://creativecommons.org/licenses/by/3.0/
 * =============================================================================
 */
function addMenu() {
    var m = '';
    m += '\n<ul class="menu">\n';
    m += '  <li><a href="' + baseURL + '/index.html">Home</a>\n';
    m += '    <ul>\n';
    m += '      <li><a rel="license" href="' + baseURL + '/copyright.html">Copyright</a></li>\n';
    m += '    </ul>\n';
    m += '  </li>\n';
    m += '  <li><a href="' + baseURL + '/samples/index.html">Samples</a>\n';
    m += '    <ul>\n';
    m += '      <li><a href="' + baseURL + '/samples/tooltip.html">A Simple CSS Based Tooltip System</a></li>\n';
    m += '      <li><a href="' + baseURL + '/samples/audio.html">Audio Tag</a></li>\n';
    m += '      <li><a href="' + baseURL + '/samples/chessboard.html">Canvas: Chessboard</a></li>\n';
    m += '      <li><a href="' + baseURL + '/samples/video.html">Video Tag</a></li>\n';
    m += '      <li><a href="' + baseURL + '/samples/webcam.html">Web Cam Streaming</a></li>\n';
    m += '    </ul>\n';
    m += '  </li>\n';
    m += '  <li><a href="' + baseURL + '/tools/index.html">Tools</a>\n';
    m += '    <ul>\n';
    m += '      <li><a href="' + baseURL + '/tools/escape4html.html">Escape Text for HTML</a></li>\n';
    m += '      <li><a href="' + baseURL + '/tools/onlineTools.html">OnlineTools (external)</a></li>\n';
    m += '      <li><a href="' + baseURL + '/tools/readTweets.html">Read Twitter Tweets</a></li>\n';
    m += '      <li><a href="' + baseURL + '/tools/rot13.html">ROT13 Encoding/Decoding</a></li>\n';
    m += '    </ul>\n';
    m += '  </li>\n';
    m += '  <li class="mensep"><a href="mailto:marochess@geocities.com">Contact Me</a></li>\n';
    m += '  <li><a href="http://about.me/maroph" target="_blank">About Me</a></li>\n';
    m += '</ul>\n';

    return m;
}
