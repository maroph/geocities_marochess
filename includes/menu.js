/*
 * Author      : Manfred Rosenboom
 * Site        : https://maroph.github.io/geocities_marochess/
 * Last Update : Sun, 11 Jul 2021 15:01:00 +0200
 * License     : Creative Commons Attribution 3.0 License
 *               http://creativecommons.org/licenses/by/4.0/
 * =============================================================================
 */
function addMenu() {
    let m = '';
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
    m += '  <li class="mensep"><a href="mailto:maroph@pm.me">Contact Me</a></li>\n';
    m += '  <li><a href="https://github.com/maroph" target="_blank">About Me</a></li>\n';
    m += '</ul>\n';

    return m;
}
