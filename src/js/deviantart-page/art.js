/*!
 *
 * Copyright Jasmin Dreasond
 * Released under the MIT license
 * https://github.com/JasminDreasond
 *
 */

tinyFuncs.loadComplete = function() {
    chrome.storage.sync.get({ customrightclick: true }, function(config) {

        var profileDATA = 'a:has(img[alt^=":icon"]), .username-with-symbol .username';
        var thumbDATA = "a[class='thumb'], .thumb a, .tt-crop .tt-w .shadow .thumb, .tt-w .tt-fh-tc .shadow .thumb, .tt-ismature .tt-w .shadow .ismature, .emoticon:has(img)";
        var disableDATA = "[href='#super-secret-groups'], #oh-menu-deviant .username-with-symbol .username";

        if (config.customrightclick == true) {
            tinyFuncs.profileUpdate({
                "profile": true,
                "thumb": true,
                "disable": true,

                "profileDATA": profileDATA,
                "thumbDATA": thumbDATA,
                "disableDATA": disableDATA
            });
        } else {
            tinyFuncs.profileUpdate({
                "clear": true,

                "profileDATA": profileDATA,
                "thumbDATA": thumbDATA,
                "disableDATA": disableDATA
            });
        }

    });

};

tinyFuncs.systempage = function() {

    tinyFuncs.loadComplete();

    var antibugload

    $(document).on('DOMNodeInserted', function(e) {
        if ($(e.target).hasClass('dev-page-view')) {
            antibugload = 3
        }
    }).on('DOMSubtreeModified', function(e) {
        if ($(e.target).hasClass('dev-view-about-content')) {
            antibugload = antibugload - 1
            if (antibugload == 0) { tinyFuncs.loadComplete(); }
        }
    });

};

tinyFuncs.systempage();

chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
    chrome.storage.local.get({ globalfiles: false }, function(config) {

        if ($('.dev-meta-actions').length > 0) {
            if (message.action == "downloadAllImages") {

                var foundtinyitem = false;
                var prepareTrigger;
                $(".dev-page-container").each(function() {
                    if ($(this).hasClass("minibrowse-container")) {

                        if (config.globalfiles) {
                            prepareTrigger = $(this).find("#newreplaceDownloadPlus");
                        } else {
                            prepareTrigger = [];
                        }
                        if (prepareTrigger.length < 1) {
                            prepareTrigger = $(this).find("#downloadTinyImage");
                        }
                        foundtinyitem = true;

                    }
                });

                if (foundtinyitem == false) {

                    if (config.globalfiles) {
                        prepareTrigger = $("#output").find("#newreplaceDownloadPlus");
                    } else {
                        prepareTrigger = [];
                    }
                    if (prepareTrigger.length < 1) {
                        prepareTrigger = $("#output").find("#downloadTinyImage");
                    }

                }

                prepareTrigger.trigger("click");

            }
        }

    });
});