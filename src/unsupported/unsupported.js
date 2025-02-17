"use strict";
/**
* BrowserDetector
*
* This util checks the current browser name and version and offers a
* convinient API to test for specific versions or browsers and whether
* the current visitor uses a supported browser or not.
*/
var BrowserDetector = /** @class */ (function () {
    function BrowserDetector() {
        this.browser = {};
        this.unsupportedBrowsers = {
            Chrome: 79,
            Firefox: 72,
            IE: 11,
            Edge: 80,
            Opera: 66,
            Safari: 13
        };
        this._detectBrowser();
    }
    /**
    * Detects the current browser and its version number.
    *
    * @returns {Object} An object with keys for browser `name` and `version`.
    */
    BrowserDetector.prototype._detectBrowser = function () {
        this.browser = (function () {
            var ua = navigator.userAgent, tem, M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];
            if (/trident/i.test(M[1])) {
                tem = /\brv[ :]+(\d+)/g.exec(ua) || [];
                return { name: "IE", version: tem[1] || "" };
            }
            if (M[1] === "Chrome") {
                tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
                if (tem != null) {
                    return { name: tem[1].replace("OPR", "Opera"), version: tem[2] };
                }
            }
            M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, "-?"];
            if ((tem = ua.match(/version\/(\d+)/i)) != null) {
                M.splice(1, 1, tem[1]);
            }
            return { name: M[0], version: M[1] };
        })();
    };
    Object.defineProperty(BrowserDetector.prototype, "isIE", {
        /**
        * Checks if the current browser is Internet Explorer.
        *
        * @returns {Boolean}
        */
        get: function () {
            return this.browser.name === 'IE';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isEdge", {
        /**
        * Checks if the current browser is Edge.
        *
        * @returns {Boolean}
        */
        get: function () {
            return this.browser.name === 'Edge';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isMicrosoft", {
        /**
        * Checks if the current browser is from Microsoft (Edge
        * or Internet Explorer).
        *
        * @returns {Boolean}
        */
        get: function () {
            return this.isIE || this.isEdge;
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isFirefox", {
        /**
        * Checks if the current browser is Firefox.
        *
        * @returns {Boolean}
        */
        get: function () {
            return this.browser.name === 'Firefox';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isChrome", {
        /**
        * Checks if the current browser is Chrome.
        *
        * @returns {Boolean}
        */
        get: function () {
            return this.browser.name === 'Chrome';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isSafari", {
        /**
        * Checks if the current browser is Safari.
        *
        * @returns {Boolean}
        */
        get: function () {
            return this.browser.name === 'Safari';
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isAndroid", {
        /**
        * Checks if the current browser is from an Android device.
        *
        * @returns {Boolean}
        */
        get: function () {
            return /Android/i.test(navigator.userAgent);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isBlackBerry", {
        /**
        * Checks if the current browser is from a BlackBerry device.
        *
        * @returns {Boolean}
        */
        get: function () {
            return /BlackBerry/i.test(navigator.userAgent);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isWindowsMobile", {
        /**
        * Checks if the current browser is from a Windows Mobile device.
        *
        * @returns {Boolean}
        */
        get: function () {
            return /IEMobile/i.test(navigator.userAgent);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isIOS", {
        /**
        * Checks if the current browser is Mobile Safari.
        *
        * @returns {Boolean}
        */
        get: function () {
            return /iPhone|iPad|iPod/i.test(navigator.userAgent);
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(BrowserDetector.prototype, "isMobile", {
        /**
        * Checks if the current browser is a mobile browser.
        *
        * @returns {Boolean}
        */
        get: function () {
            return (this.isAndroid || this.isBlackBerry || this.isWindowsMobile || this.isIOS);
        },
        enumerable: false,
        configurable: true
    });
    /**
    * Checks if the current browser is supported by
    *
    * @returns {Boolean}
    */
    BrowserDetector.prototype.isSupported = function () {
        if (this.unsupportedBrowsers.hasOwnProperty(this.browser.name)) {
            if (+this.browser.version > this.unsupportedBrowsers[this.browser.name]) {
                return true;
            }
        }
        return false;
    };
    return BrowserDetector;
}());


  if ((new BrowserDetector).isSupported()) {
    // console.log('browser supported');
  } else {
    //   if(location)
    // location.replace("/FnpfEmpPortal/unsupported.html");
    // console.log('browser not supported');
  }