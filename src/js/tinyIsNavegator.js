// https://jsfiddle.net/311aLtkz/

const tinyIsNavegator = {

    // Opera 8.0+
    opera: (!!window.opr && !!opr.addons) || !!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0,

    // Firefox 1.0+
    firefox: typeof InstallTrigger !== 'undefined',

    // Safari 3.0+ "[object HTMLElementConstructor]" 
    safari: /constructor/i.test(window.HTMLElement) || (function(p) { return p.toString() === "[object SafariRemoteNotification]"; })(!window['safari'] || safari.pushNotification),

    // Internet Explorer 6-11
    ie: /*@cc_on!@*/ false || !!document.documentMode,

    // Chrome 1+
    chrome: !!window.chrome && !!window.chrome.webstore

};

// Edge 20+
tinyIsNavegator.edge = !tinyIsNavegator.ie && !!window.StyleMedia;

// Blink engine detection
tinyIsNavegator.blink = (tinyIsNavegator.chrome || tinyIsNavegator.opera) && !!window.CSS;