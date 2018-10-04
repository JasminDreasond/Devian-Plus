/*!
 *
 * Copyright Jasmin Dreasond
 * Released under the MIT license
 * https://github.com/JasminDreasond
 *
 */

var tinyOptions = false

$("#options div a").click(function() {

    if (tinyOptions == false) {
        $("#objects").addClass("hide");
        $("#optionspage").removeClass("hide");
        $(this).addClass("active");
        tinyOptions = true
    } else {
        $("#objects").removeClass("hide");
        $("#optionspage").addClass("hide");
        $(this).removeClass("active");
        tinyOptions = false
    }

});


$("#pcmaniaen").change(function() { chrome.storage.sync.set({ pcmaniaen: $(this).prop("checked") }) });
$("#forcedap").change(function() { chrome.storage.sync.set({ forcedap: $(this).prop("checked") }) });

$("#bgnotifipop").change(function() { chrome.storage.sync.set({ bgnotifipop: $(this).prop("checked") }) });
$("#bgnotifisound").change(function() { chrome.storage.sync.set({ bgnotifisound: $(this).prop("checked") }) });
$("#customrightclick").change(function() { chrome.storage.sync.set({ customrightclick: $(this).prop("checked") }) });

chrome.storage.sync.get({ pcmaniaen: true, forcedap: false, bgnotifienabts: 10, bgnotifipop: true, bgnotifisound: false, customrightclick: true }, function(config) {

    $("#pcmaniaen").prop("checked", config.pcmaniaen);
    $("#forcedap").prop("checked", config.forcedap);

    $("#bgnotifienabts").val(config.bgnotifienabts);
    $("#bgnotifipop").prop("checked", config.bgnotifipop);
    $("#bgnotifisound").prop("checked", config.bgnotifisound);
    $("#customrightclick").prop("checked", config.customrightclick);

});

$("#bgnotifienabts").change(function() {
    if ($(this).val() >= 10) {
        chrome.storage.sync.set({ bgnotifienabts: $(this).val() }, function() { setOptionsBG("changetimerbg", "changetimerbg2"); });
    } else { $(this).val(10); }
});