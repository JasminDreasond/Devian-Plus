/*!
 *
 * Copyright Jasmin Dreasond
 * Released under the MIT license
 * https://github.com/JasminDreasond
 *
 */

// Send to Background
const setOptionsBG = function(send, reponse) { chrome.extension.sendMessage({ text: send }, function(reponse) { if (reponse.type == reponse) {} }); }

// Loading

if (tinyIsNavegator.firefox == true) {
    var tinylinkclick = [
        $("<a>", { target: "_blank", href: "https://github.com/JasminDreasond/Devian-Plus/wiki/How-use-special-features-of-Devian-Plus" }).text("Wiki"),
        $("<a>", { target: "_blank", href: "https://github.com/JasminDreasond/Devian-Plus" }).text("Github")
    ];
} else {
    var tinylinkclick = [
        $("<a>", { target: "_blank", href: "https://github.com/JasminDreasond/Devian-Plus/wiki/How-use-special-features-of-Devian-Plus" }).text("Wiki"),
        $("<a>", { target: "_blank", href: "https://chrome.google.com/webstore/detail/super-favbook-plus/nanoagbfpchifchpanhgbhbnmpkhmncm" }).text("Chrome Favourites"),
        $("<a>", { target: "_blank", href: "https://github.com/JasminDreasond/Devian-Plus" }).text("Github")
    ];
}

$("#linksclick").append(tinylinkclick);
$.ajax({ cache: false, url: "https://www.deviantart.com/", dataType: "html" }).done(function(data) {

    var getdata = $(data).find("#oh-menu-deviant");

    $(getdata).find("form").remove();
    $(getdata).find(".iconset-logout").remove();
    $(getdata).find("hr:last-child").remove();

    if ($(getdata).html() == null) {

        $("#loadingicon, #loadingtext").remove();
        $("#menu").append($("<a>", { class: "oh-l oh-touch", href: "https://www.deviantart.com", target: "_blank" }).append($("<span>", { class: "username-with-symbol" }).append($("<span>", { class: "username" }).text("Guest"))));

    } else {

        $(getdata).find(".oh-menu-list-item").each(function() {
            if (!$(this).text().replace(/ /g, "").replace(/(?:\r\n|\r|\n)/g, '')) {
                $(this).remove();
            }
        });

        var getstatus = $(getdata).html();

        $("#loadingicon, #loadingtext").remove();
        $("#menu").append(getstatus);
        $("#menu *").removeAttr("data-ga_click_event");
        $("#menu a").attr("target", "_blank");

    }


    const tinySetNotifications = function(namenoti) {
        var getstatusds = $(data).find(".oh-mc-split a[title='" + namenoti + "']").html();
        var getstatusdsnbp = $(data).find(".oh-mc-split a[title='" + namenoti + "']").text();
        var getstatusdsnb = Number(getstatusdsnbp);

        tinyCompleteChange = function() { setOptionsBG("changenotifications", "changenotifications2"); }

        if (namenoti == "Notifications") { chrome.storage.local.set({ "Notifications": getstatusdsnb }, function() { tinyCompleteChange(); }); }
        if (namenoti == "Notices") { chrome.storage.local.set({ "Notices": getstatusdsnb }, function() { tinyCompleteChange(); }); }
        if (namenoti == "Deviation") { chrome.storage.local.set({ "Deviation": getstatusdsnb }, function() { tinyCompleteChange(); }); }
        if (namenoti == "Watch") { chrome.storage.local.set({ "Watch": getstatusdsnb }, function() { tinyCompleteChange(); }); }
        if (namenoti == "Feedback") { chrome.storage.local.set({ "Feedback": getstatusdsnb }, function() { tinyCompleteChange(); }); }
        if (namenoti == "Correspondence") { chrome.storage.local.set({ "Correspondence": getstatusdsnb }, function() { tinyCompleteChange(); }); }
        if (namenoti == "Groups") { chrome.storage.local.set({ "Groups": getstatusdsnb }, function() { tinyCompleteChange(); }); }
        if (namenoti == "Notes") { chrome.storage.local.set({ "Notes": getstatusdsnb }, function() { tinyCompleteChange(); }); }

        if (getstatusdsnb > 0) { var numberdest = "newnotif"; } else { var numberdest = ""; }
        if (namenoti == "Notifications") {
            $("#" + namenoti.toLowerCase() + " .number").append(getstatusds);
            $("#" + namenoti.toLowerCase()).attr("href", $(data).find(".oh-mc-split a[title='" + namenoti + "']").attr("href")).attr("title", $(data).find(".oh-mc-split a[title='" + namenoti + "']").attr("title")).attr("target", "_blank").addClass(numberdest);
        } else {
            $("#" + namenoti.toLowerCase()).append(getstatusds).attr("href", $(data).find(".oh-mc-split a[title='" + namenoti + "']").attr("href")).attr("title", $(data).find(".oh-mc-split a[title='" + namenoti + "']").attr("title")).attr("target", "_blank").addClass(numberdest);
        }
    }


    // Notifications
    tinySetNotifications("Notifications");

    // Notices
    tinySetNotifications("Notices");

    // Deviation
    tinySetNotifications("Deviation");

    // Watch
    tinySetNotifications("Watch");

    // Feedback
    tinySetNotifications("Feedback");

    // Correspondence
    tinySetNotifications("Correspondence");

    // Groups
    tinySetNotifications("Groups");

    // Notes
    tinySetNotifications("Notes");

}).fail(function() {

    $(".startsearch input[type='text']").val(config.lastuser);
    $("#searchtype").val(config.lastoptionsr).trigger("change");

    $("#container").removeClass("hide");
    $("#loading").addClass("hide");

    $("#notilist").empty().text("ERROR CONNECTION");

});



chrome.storage.local.get({ lastuser: "", lastoptionsr: "global" }, function(config) {
    $(".startsearch input[type='text']").val(config.lastuser);
    $("#searchtype").val(config.lastoptionsr).trigger("change");
});


//Selecionar de Procura

$("#searchtype").change(function() {

    chrome.storage.local.set({ lastoptionsr: $(this).val() });
    $("#searchglobal, #searchusername").addClass("hide");
    if ($(this).val() == "profile") { $("#searchusername").removeClass("hide"); } else if ($(this).val() == "global") { $("#searchglobal").removeClass("hide"); }

});


const tinyPopup = {};




// Procurar em Perfil de Usuário

tinyPopup.sendCount = function(username) {
    if ((username.indexOf(" ") > -1) || (username == "") || (username == null)) {} else {
        chrome.storage.local.set({ lastuser: $(".startsearch input[type='text']").val() });
        $(".startsearch input[type='submit'], .startsearch input[type='text']").css("pointer-events", "none");
        $(".startsearch").css("display", "none");
        $("#searchuser .searchgroup[type='text']").attr("placeholder", username);
        $("#searchuser").attr("action", "https://www.deviantart.com/" + username.toLowerCase() + "/gallery/").css("display", "block");
        setTimeout(function() { $("#searchuser .searchgroup[type='text']").focus(); }, 10);
    }
}

// Modo Manual

$(".startsearch input[type='submit']").click(function() {
    tinyPopup.sendCount($(".startsearch input[type='text']").val());
});

$(".startsearch input[type='text']").keydown(function(event) {
    if (event.keyCode == 13) {
        //this.form.submit();
        tinyPopup.sendCount($(".startsearch input[type='text']").val());
        return false;
    }
});



// Facebook

tinyPopup.share = function(urlpagex) {
    window.open(urlpagex, "_blank", 'resizable,height=360,width=570')
}

// Facebook
$("#facebookshare").click(function() {
    tinyPopup.share("https://www.facebook.com/sharer/sharer.php?u=https%3A%2F%2Fchrome.google.com%2Fwebstore%2Fdetail%2Fdevian-plus%2Flalfbfpmlmnpcpgkpdcnnlgpmmhifhlj%3Fhl%3Dpt-BR&amp;src=sdkpreparse")
})

//Twitter
$("#twittershare").click(function() {
    var urltwitterpxs = encodeURI("Devian Plus :D http://goo.gl/ZtLzzc")
    tinyPopup.share("https://twitter.com/intent/tweet?text=" + urltwitterpxs)
})




// Download All Page Images
$("#downloadall").click(function() {
    chrome.tabs.query({}, function(tabs) {
        for (var i = 0; i < tabs.length; i++) {
            chrome.tabs.sendMessage(tabs[i].id, { action: "downloadAllImages" }, function(response) {
                console.log(response.farewell);
            });
        }
    });
});