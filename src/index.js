'use strict';

window.onload = function () {
    var worker = new Worker('worker.js');
    var terminal = document.getElementById('terminal');

    worker.onmessage = function (e) {
        terminal.textContent += e.data;
    };

    terminal.onkeypress = function (e) {
        e.preventDefault();
        worker.postMessage(String.fromCharCode(e.which));
    };
};

var start = Date.now();
setInterval(function () {
    document.getElementById('time').textContent =
        ((Date.now() - start) / 1000) | 0;
});
