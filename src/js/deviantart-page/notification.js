/*!
 *
 * Copyright Jasmin Dreasond
 * Released under the MIT license
 * https://github.com/JasminDreasond
 *
 */

tinyFuncs.completeChangeNoti = function() { tinyFuncs.sendChrome("changenotifications", "changenotifications2"); };
tinyFuncs.seNotification = function(data) {

    if ((data.value == '') || (data.value == null) || (data.value == undefined) || (isNaN(data.value))) { data.value = 0; }

    // Notifications
    if (data.name == "Notifications") { chrome.storage.local.set({ "Notifications": data.value }, function() { tinyFuncs.completeChangeNoti(); }); }
    // Notices
    if (data.name == "Notices") { chrome.storage.local.set({ "Notices": data.value }, function() { tinyFuncs.completeChangeNoti(); }); }
    // Deviation
    if (data.name == "Deviation") { chrome.storage.local.set({ "Deviation": data.value }, function() { tinyFuncs.completeChangeNoti(); }); }
    // Watch
    if (data.name == "Watch") { chrome.storage.local.set({ "Watch": data.value }, function() { tinyFuncs.completeChangeNoti(); }); }
    // Feedback
    if (data.name == "Feedback") { chrome.storage.local.set({ "Feedback": data.value }, function() { tinyFuncs.completeChangeNoti(); }); }
    // Correspondence
    if (data.name == "Correspondence") { chrome.storage.local.set({ "Correspondence": data.value }, function() { tinyFuncs.completeChangeNoti(); }); }
    // Groups
    if (data.name == "Groups") { chrome.storage.local.set({ "Groups": data.value }, function() { tinyFuncs.completeChangeNoti(); }); }
    // Notes
    if (data.name == "Notes") { chrome.storage.local.set({ "Notes": data.value }, function() { tinyFuncs.completeChangeNoti(); }); }

};


tinyFuncs.sendNotification = function(thishere) { tinyFuncs.seNotification({ 'name': $(thishere).attr('title'), 'value': Number($(thishere).text()) }); }

if ($('#oh-menu-join').is(':visible')) { tinyFuncs.sendChrome("resetnotifications", "resetnotifications2"); } else {
    $('.oh-mc-split a').each(function() { tinyFuncs.sendNotification(this); });
    $('.oh-mc-split a').bind("DOMSubtreeModified", function() { tinyFuncs.sendNotification(this); });
};