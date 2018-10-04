/*!
 *
 * Copyright Jasmin Dreasond
 * Released under the MIT license
 * https://github.com/JasminDreasond
 *
 */

if ($("#oh-menu-deviant .oh-touch").attr("href") == null) { var urluserav2 = "" } else { var urluserav2 = $("#oh-menu-deviant .oh-touch").attr("href").split('.deviantart.com')[0].replace("http://", "").replace("https://", ""); }

// Pastas Agrupadas

tinyFuncs.subFolder = function() {
    chrome.storage.sync.get(function(configst) {

        var startcustomfolder = false

        $("#gmi-GZone div .gr-aggregation-list .gr-body .gr .stream-links .gl-text:first-child .a").each(function() {
            if (($(this).text() == "DA-P") || (configst.forcedap == true)) { startcustomfolder = true }
        })

        if (startcustomfolder == true) {

            $("#gmi-GZone div .gr-aggregation-list .gr-body .gr").addClass("hidegrcustomxs");
            var subfolderplusda = []

            $("head").append($("<style>", { id: "custom_gr_body_daplus" }).text(
                ".da-plus-gr{margin: 8px;}" +

                '[class^="da-plus-subgr-"]:not(.disablesubdaphide) div:not(.mastersubfolderdap){display: none;}' +

                ".mastersubfolderdap{font-weight: bold; cursor: pointer;}" +
                ".mastersubfolderdap .a{font-size: 10pt !important; font-style: italic; margin: 3px 9px;}" +

                ".disablesubdaphide .gl-text .a{color: #2e2eb8 !important;}" +
                ".disablesubdaphide .gl-text .a:hover{color: #FFF !important;}" +
                ".da-plus-subgrothers{margin: 9px;}" +

                "#changefoldereditor:not(.editordafolderop){font-weight: normal !important;}" +
                "#changefoldereditor{margin-left: 4px; cursor: pointer;}" +
                "#changefoldereditor:hover{color: #000 !important;}" +
                ".hidegrcustomxs{display: none;}"
            ))
            $("#gmi-GZone div .gr-aggregation-list .gr-body").append($("<div>", { class: "da-plus-gr" }).append($("<div>", { class: "da-plus-subgrothers" })))

            $("#gmi-GZone div .gr-aggregation-list .gr-body .gr .stream-links .gl-text .a").each(function() {
                if ($(this).text() == "DA-P") {} else {
                    var getnamefolderts = $(this).text()
                    var getnamefolderts = getnamefolderts.substring(0, getnamefolderts.lastIndexOf("-"))

                    if (getnamefolderts.length > 0) {
                        var getnamefolder = $(this).text().replace(getnamefolderts, "").replace(" - ", "").replace("- ", "").replace(" -", "")
                        var getclassfolder = getnamefolder.replace(/ /g, "")

                        if (subfolderplusda[getnamefolder] == true) { $("[class='da-plus-subgr-" + getclassfolder.toLowerCase() + "']").append($("<div>", { style: "line-height:1.3em", class: "gl-text" }).append($("<a>", { class: "a", href: $(this).attr("href") }).text(getnamefolderts))) } else {
                            $(".da-plus-gr").prepend($("<div>", { class: "da-plus-subgr-" + getclassfolder.toLowerCase() }).append(

                                $("<div>", { style: "line-height:1.3em", class: "gl-text mastersubfolderdap" }).append($("<a>", { class: "a" }).text(getnamefolder)).click(function() {

                                    if ($(".da-plus-subgr-" + getclassfolder.toLowerCase()).attr("class").indexOf("disablesubdaphide") > -1) { $(".da-plus-subgr-" + getclassfolder.toLowerCase()).removeClass("disablesubdaphide"); } else { $(".da-plus-subgr-" + getclassfolder.toLowerCase()).addClass("disablesubdaphide"); }

                                }),
                                $("<div>", { style: "line-height:1.3em", class: "gl-text" }).append($("<a>", { class: "a", href: $(this).attr("href") }).text(getnamefolderts))

                            ))
                            subfolderplusda[getnamefolder] = true
                        }
                    } else {
                        $(".da-plus-subgrothers").append($("<div>", { style: "line-height:1.3em", class: "gl-text" }).append($("<a>", { class: "a", href: $(this).attr("href") }).text($(this).text())))
                    }

                }
            })


            if (urluserav2 == null) {}
            if (tinyFuncs.userName == urluserav2) {
                $("#gmi-GZone div .gr-aggregation-list .gr-top .gr h2").append($("<a>", { id: "changefoldereditor" }).text("(Edit)").click(function() {

                    //if($(this).attr("class") == "editordafolderop"){
                    //$(this).removeClass("editordafolderop");
                    //$("#gmi-GZone div .gr-aggregation-list .gr-body .gr").addClass("hidegrcustomxs");
                    //$("#gmi-GZone div .gr-aggregation-list .gr-body .da-plus-gr").removeClass("hidegrcustomxs");
                    //}
                    //else{
                    $(this).addClass("editordafolderop");
                    $("#gmi-GZone div .gr-aggregation-list .gr-body .gr").removeClass("hidegrcustomxs");
                    $("#gmi-GZone div .gr-aggregation-list .gr-body .da-plus-gr").addClass("hidegrcustomxs");
                    $(this).remove();
                    //}

                }))
            }

        }
    })
};

if ($("#gmi-GZone div .gr-aggregation-list .gr-body .gr .stream-links .gl-text .a").is(":visible")) { tinyFuncs.subFolder(); }















// Favoritos Agrupados

tinyFuncs.groupFilter = function(inputname) {
    $(".popup2-cruiser .blockmenu div a[class*='f']").css("display", "none");
    $(".popup2-cruiser .blockmenu div a[class='f']:first-child").css("display", "");
    $(".popup2-cruiser .blockmenu div a[class='f']:contains('" + inputname + "')").css("display", "");

    var getantimore = $(".popup2-cruiser .blockmenu div a[class='f']:contains('" + inputname + "')").attr("onclick")

    if ((getantimore == undefined) || (getantimore == "GMI.up(this).menuClick('back');return GMI.evCancel()")) {} else {
        var getantimore2 = getantimore
            .replace("GMI.up(this).menuClick('copy', 20, ", "")
            .replace(");return GMI.evCancel()", "")

        var getantimore1 = getantimore
            .replace("GMI.up(this).menuSubClick('move', 20, ", "")
            .replace(",undefined,false,false);return GMI.evCancel()", "")

        $('.popup2-cruiser .blockmenu div a[onclick*="' + getantimore1 + '"]').css("display", "");
        $('.popup2-cruiser .blockmenu div a[onclick*="' + getantimore2 + '"]').css("display", "");
    }
};

tinyFuncs.favGroup = function() {

    var setfiltercs = ""
    var setfiltercs2 = ""

    $("head").append($("<style>", { id: "favlistcustomdap" }).text(
        ".searchgroupfavdap, .searchgroupfavdap2{" +
        "border-radius: 3px;" +
        "border: 1px solid rgba(38, 38, 38, 0.7);" +
        "padding: 3px;" +
        "width: 160px;" +
        "margin: 10px 0px;" +
        "}" +

        ".searchgroupfavdap2{" +
        "border-top-right-radius: 0px;" +
        "border-bottom-right-radius: 0px;" +
        "}" +

        ".groupxs2e{" +
        "border-top-left-radius: 0px;" +
        "border-bottom-left-radius: 0px;" +
        "}"
    ));



    var subgroupxde = ""
    if ($("#browse-search-box #browse-search-ctrl .scripted .browse-search-button:contains('Gallery')").is(":visible")) {
        $(".gallery-topbar").append($("<input>", { class: "searchgroupfavdap2", placeholder: "DISABLED", style: "cursor: not-allowed;" }).prop("disabled", true)).change(function() {
            setfiltercs2 = $(".searchgroupfavdap2").val()
        });
        subgroupxde = " groupxs2e"
    }

    $(".gallery-topbar").append($("<input>", { class: "searchgroupfavdap" + subgroupxde, placeholder: "Menu Folder Filter" })).change(function() {
        setfiltercs = $(".searchgroupfavdap").val()
    });

    $(document).bind('DOMNodeInserted', function(e) {
        if ($(e.target).is('.popup2-cruiser .blockmenu div a')) {

            if ($(".popup2-cruiser .blockmenu div a").attr("onclick") == "GMI.up(this).menuClick('move', null, null, 'right');return GMI.evCancel()") {} else {

                if ($(".popup2-cruiser .blockmenu div a[class*='blockmenu-morelink']").is(":visible")) { if (setfiltercs2 == "") {} else { tinyFuncs.groupFilter(setfiltercs2); } } else { if (setfiltercs == "") {} else { tinyFuncs.groupFilter(setfiltercs); } }

            }

        }
    });

};

if (location_GET.edit == "1") { tinyFuncs.favGroup(); }