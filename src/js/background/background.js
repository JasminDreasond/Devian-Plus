/*!
 *
 * Copyright Jasmin Dreasond
 * Released under the MIT license
 * https://github.com/JasminDreasond
 *
 */

function backgroundSystem() {

    var tinyBase = {};

    tinyBase.notiClick = function() {};

    chrome.notifications.onClicked.addListener(function(notificationId) {
        tinyBase.notiClick(notificationId);
    });

    // Notification Generator

    tinyBase.notification = function(notiboxke) {
        if (notiboxke.perm == true) {

            tinyBase.notiClick = new Function('window.open("' + notiboxke.url + '", "_blank"); chrome.notifications.clear("pmnoti");');

            chrome.notifications.clear("pmnoti", function() {
                chrome.notifications.create("pmnoti", {
                    type: "basic",
                    iconUrl: notiboxke.icon,
                    title: notiboxke.title,
                    message: notiboxke.body,
                    contextMessage: "Devian Plus"
                });
            });

        }
    }








    // Notification System

    tinyBase.firstime = true;
    tinyBase.firstime2 = true;
    tinyBase.logoDetect = false;

    tinyBase.newNotification = {
        "Notifications": false,
        "Notices": false,
        "Deviation": false,
        "Watch": false,
        "Feedback": false,
        "Correspondence": false,
        "Groups": false,
        "Notes": false,

        "Notifications_number": 0,
        "Notices_number": 0,
        "Deviation_number": 0,
        "Watch_number": 0,
        "Feedback_number": 0,
        "Correspondence_number": 0,
        "Groups_number": 0,
        "Notes_number": 0
    };

    tinyBase.notification = tinyBase.newNotification;

    tinyBase.setNotification = function(namenoti, disablednoti) {
        chrome.storage.sync.get({ bgnotifipop: true }, function(settings) {
            var notinumber = Number($(".oh-mc-split a[title='" + namenoti + "']").text());

            if ((notinumber != tinyBase.notification[namenoti + "_number"]) &&
                ($(".oh-mc-split a[title='" + namenoti + "']").text() != null) &&
                ($(".oh-mc-split a[title='" + namenoti + "']").text() != undefined) &&
                ($(".oh-mc-split a[title='" + namenoti + "']").text() != '') &&
                (isNaN(notinumber) == false)) {

                if (notinumber == tinyBase.notification[namenoti + "_number"] - 1) { tinyBase.notification[namenoti] = false; } else { tinyBase.notification[namenoti] = true; }
                tinyBase.notification[namenoti + "_number"] = notinumber;

                if (tinyBase.notification[namenoti] == true) {

                    if ((disablednoti == false) && (tinyBase.logoDetect == false) && (Number(tinyBase.notification[namenoti + "_number"]) > 0)) {

                        if (Number(tinyBase.notification[namenoti + "_number"]) == 1) { var notimessagetep = " notification waiting for you!"; } else { var notimessagetep = " notifications waiting for you!"; }

                        if ($(".oh-mc-split a[title='" + namenoti + "']").attr('href')) {
                            var tinyurlinsert = $(".oh-mc-split a[title='" + namenoti + "']").attr('href');
                        } else {
                            var tinyurlinsert = "https://www.deviantart.com/";
                        }

                        tinyBase.notification({
                            "title": namenoti,
                            "body": Number(tinyBase.notification[namenoti + "_number"]) + notimessagetep,
                            "icon": chrome.extension.getURL('icons/icon_128.png'),
                            "perm": settings.bgnotifipop,
                            "url": tinyurlinsert
                        });
                    }

                }

                tinyBase.firstime = false;
            }
        })
    }









    //AFK

    tinyBase.countAfk = false; // AFK
    chrome.idle.setDetectionInterval(15);

    chrome.idle.onStateChanged.addListener(function(state) {
        // AFK Lockeds
        if (state == 'locked') {
            tinyBase.countAfk = true
        }

        // AFK SYSTEM
        if (state == 'idle') {
            tinyBase.countAfk = true
        }

        // State AFK
        if (state == 'active') {
            tinyBase.countAfk = false
        }
    });







    tinyBase.noConnection = false; // No Connection

    // NOTI ICON
    tinyBase.StatusNumber = function() {
        chrome.browserAction.setBadgeText({ text: tinyBase.notification.Notifications_number.toString() });

        // No Connection
        if (tinyBase.noConnection == true) {
            chrome.browserAction.setBadgeBackgroundColor({ color: [255, 153, 51, 255] });
            chrome.browserAction.setBadgeText({ text: "X" });
        }
    }






    // Interval System
    setInterval(function() {

        tinyBase.StatusNumber();
        if (tinyBase.firstime == true) {
            // Notifications
            tinyBase.setNotification("Notifications", false);
        } else {

            // Notifications
            tinyBase.setNotification("Notifications", true);
            // Notices
            tinyBase.setNotification("Notices", tinyBase.firstime2);
            // Deviation
            tinyBase.setNotification("Deviation", tinyBase.firstime2);
            // Watch
            tinyBase.setNotification("Watch", tinyBase.firstime2);
            // Feedback
            tinyBase.setNotification("Feedback", tinyBase.firstime2);
            // Correspondence
            tinyBase.setNotification("Correspondence", tinyBase.firstime2);
            // Groups
            tinyBase.setNotification("Groups", tinyBase.firstime2);
            // Notes
            tinyBase.setNotification("Notes", tinyBase.firstime2);

            tinyBase.firstime2 = false;
            tinyBase.logoDetect = false;

        }

    }, 1000);




    // Notification Create Number

    chrome.browserAction.setBadgeBackgroundColor({ color: [73, 88, 232, 255] });




    // Update Status
    tinyBase.updater = function(intro) {
        chrome.storage.sync.get({ bgnotifipop: true }, function(settings) {


            // Ajax Get
            if (tinyBase.countAfk == false) {
                $.ajax({ url: 'https://www.deviantart.com/', type: 'GET', dataType: "html" })

                // Done
                .done(function(data) {
                    if (tinyBase.noConnection == true) {
                        tinyBase.notification({
                            "title": "Connected Sucessfully",
                            "body": "",
                            "icon": chrome.extension.getURL('icons/icon_128.png'),
                            "perm": settings.bgnotifipop,
                            "url": "https://www.deviantart.com/"
                        });
                        tinyBase.noConnection = false;
                    }

                    var orgoverhead = function(datag) { $("#menu a[title='" + datag + "']").text(Number($(data).find("#overhead .oh-mc-split a[title='" + datag + "']").text())).attr("href", $(data).find("#overhead .oh-mc-split a[title='" + datag + "']").attr("href")); }

                    orgoverhead("Notifications");
                    orgoverhead("Notices");
                    orgoverhead("Deviation");
                    orgoverhead("Watch");
                    orgoverhead("Feedback");
                    orgoverhead("Correspondence");
                    orgoverhead("Groups");
                    orgoverhead("Notes");

                })

                // Fail
                .fail(function() {
                    tinyBase.noConnection = true;
                    tinyBase.notification({
                        "title": "Error Connection",
                        "body": "Deviantart server is unavailable",
                        "icon": chrome.extension.getURL('icons/icon_128.png'),
                        "perm": settings.bgnotifipop,
                        "url": "https://www.deviantart.com/"
                    });
                });

            }


        });
    }

    // Test Timer
    tinyBase.testTimerBG = function() {
        //alert(tinyBase.minutesUpdate);
    }

    // Start Updates
    tinyBase.minutesUpdate;

    tinyBase.updaterTime = function() {
        setTimeout(function() {
            tinyBase.updater();
            tinyBase.updaterTime();
        }, 60000 * tinyBase.minutesUpdate);
    }

    chrome.storage.sync.get({ bgnotifienabts: 10 }, function(settings) {
        tinyBase.minutesUpdate = Number(settings.bgnotifienabts);
        tinyBase.updaterTime();
        tinyBase.testTimerBG();
    });

    chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {

        if (message.type == "downloader") {
            chrome.downloads.download({ saveAs: false, conflictAction: "uniquify", url: message.url });
        } else if (message.text == "changetimerbg") {
            sendResponse({ type: "changetimerbg2" })

            chrome.storage.sync.get({ bgnotifienabts: 10 }, function(settings) {
                tinyBase.minutesUpdate = Number(settings.bgnotifienabts);
                tinyBase.testTimerBG();
            });

        }

    });

    tinyBase.updater();




    // Update Notifications Page

    tinyBase.updaterManual = function(data1, data2) { $(".oh-mc-split a[title='" + data1 + "']").text(data2); }
    chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.text == "changenotifications") {
            sendResponse({ type: "changenotifications2" })

            chrome.storage.local.get({
                "Notifications": 0,
                "Notices": 0,
                "Deviation": 0,
                "Watch": 0,
                "Feedback": 0,
                "Correspondence": 0,
                "Groups": 0,
                "Notes": 0
            }, function(settings) {

                // Notifications
                tinyBase.updaterManual("Notifications", settings.Notifications);
                // Notices
                tinyBase.updaterManual("Notices", settings.Notices);
                // Deviation
                tinyBase.updaterManual("Deviation", settings.Deviation);
                // Watch
                tinyBase.updaterManual("Watch", settings.Watch);
                // Feedback
                tinyBase.updaterManual("Feedback", settings.Feedback);
                // Correspondence
                tinyBase.updaterManual("Correspondence", settings.Correspondence);
                // Groups
                tinyBase.updaterManual("Groups", settings.Groups);
                // Notes
                tinyBase.updaterManual("Notes", settings.Notes);

            })

        }
    });



    chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.text == "resetnotifications") {
            sendResponse({ type: "resetnotifications2" })

            // Notifications
            tinyBase.updaterManual("Notifications", 0);
            // Notices
            tinyBase.updaterManual("Notices", 0);
            // Deviation
            tinyBase.updaterManual("Deviation", 0);
            // Watch
            tinyBase.updaterManual("Watch", 0);
            // Feedback
            tinyBase.updaterManual("Feedback", 0);
            // Correspondence
            tinyBase.updaterManual("Correspondence", 0);
            // Groups
            tinyBase.updaterManual("Groups", 0);
            // Notes
            tinyBase.updaterManual("Notes", 0);

            tinyBase.logoDetect = true;

        }
    });




}

backgroundSystem();