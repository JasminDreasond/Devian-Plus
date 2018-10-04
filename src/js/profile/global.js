/*!
 *
 * Copyright Jasmin Dreasond
 * Released under the MIT license
 * https://github.com/JasminDreasond
 *
 */

const tinyFuncs = {

    // Global User URL Detect
    userName: window.location.href.split("/")[3],

    // Download Image
    downloadImage: function(tinythis, tinyurl, callback) {

        if (window.XMLHttpRequest) {
            // code for modern browsers
            var xhr = new XMLHttpRequest();
        } else {
            // code for old IE browsers
            var xhr = new ActiveXObject("Microsoft.XMLHTTP");
        }

        xhr.responseType = 'blob'; //Set the response type to blob so xhr.response returns a blob
        xhr.open('GET', tinyurl, true);
        if (typeof callback == "function") { callback(); }

        xhr.onreadystatechange = function() {
            if (xhr.readyState == xhr.DONE) {
                var contentType = xhr.getResponseHeader("Content-Type");
                if ((typeof contentType == "string") && (contentType)) {

                    var filename = removeParamenters(tinyurl);
                    saveAs(xhr.response, filename.split("/")[filename.split("/").length - 1]);
                    if (typeof callback == "function") { callback(); }

                }
                $(tinythis).removeClass("send-download-tiny");
            }
        };

        xhr.onerror = function(err) {
            if (typeof callback == "function") { callback(err); }
        };

        xhr.send();

    },

    // Custom Right Clicks
    profileUpdate: function(data) {
        chrome.storage.local.get({ typeselectprof: false }, function(config) {


            // Variaveis

            var opentypepx;
            var urldeviantart;
            var urldeviantart2;

            // Checagem Tipo de Page

            const tinyCheckType = function() {
                chrome.storage.local.get({ typeselectprof: false }, function(config) {
                    if (config.typeselectprof == true) {
                        opentypepx = "_self"
                    } else {
                        opentypepx = "_blank"
                    }
                })
            }

            tinyCheckType();




            // Gerador de copia

            const tinyCopyCode = function(title, code) {

                $("#copytextdapkl").remove();
                $("body").append($("<div>", { id: "copytextdapkl", style: "display: none;" }).append(

                    $("<p>").text(title),
                    $("<input>", { type: "text", value: code })
                    .click(function() { $(this).select(); })
                    .change(function() { $(this).val(code); }),

                    $("<br>"),

                    $("<input>", { type: "submit", value: "Close" }).click(function() { $("#copytextdapkl").remove(); })

                ).fadeIn())

            }






            // Profile

            if (data.clear == true) {} else if (data.profile == true) {
                $(data.profileDATA).each(function() {

                    $(this).off("contextmenu").contextPopup({
                        title: 'Open Profile',
                        items: [

                            {
                                label: 'Change Open Type',
                                icon: "https://orig13.deviantart.net/86fa/f/2016/060/4/3/arrow_down_by_solchu123-d9tl2cz.gif",
                                action: function() {
                                    chrome.storage.local.get({ typeselectprof: false }, function(config) {

                                        if (config.typeselectprof == true) {
                                            chrome.storage.local.set({ typeselectprof: false });
                                            typeselectprof = false;
                                            tinyCheckType();
                                        } else {
                                            chrome.storage.local.set({ typeselectprof: true });
                                            typeselectprof = true;
                                            tinyCheckType();
                                        }

                                    })
                                }
                            },

                            null,

                            {
                                label: 'Custom Icons - Credits',
                                icon: "https://orig09.deviantart.net/209a/f/2016/060/6/8/applications_by_solchu123-d9tl2cg.gif",
                                action: function() {
                                    window.open("https://solchu123.deviantart.com/gallery/59279676/EMOTICONS", "_blank")
                                }
                            },

                            null,

                            { label: 'Profile', icon: 'https://st.deviantart.net/emoticons/d/dalogo1.gif', action: function() { window.open(urldeviantart, "_blank") } },
                            { label: 'Gallery', icon: 'https://orig09.deviantart.net/48a4/f/2016/070/4/e/binoculars_by_solchu123-d9uqrru.gif', action: function() { window.open(urldeviantart + "gallery/", opentypepx) } },
                            { label: 'Prints', icon: 'https://orig03.deviantart.net/8ff3/f/2016/069/a/e/basket_by_solchu123-d9ulgzd.gif', action: function() { window.open(urldeviantart + "prints/", opentypepx) } },
                            { label: 'Favourites', icon: 'https://st.deviantart.net/emoticons/s/star_full.gif', action: function() { window.open(urldeviantart + "favourites/", opentypepx) } },
                            { label: 'Journal', icon: 'https://orig02.deviantart.net/1750/f/2016/070/6/5/book_by_solchu123-d9uqsap.gif', action: function() { window.open(urldeviantart + "journal/", opentypepx) } },

                            null,

                            {
                                label: 'Get Icon Code',
                                icon: "https://orig15.deviantart.net/c20e/f/2016/068/d/c/badge_plus_more_by_solchu123-d9uiher.gif",
                                action: function() {
                                    tinyCopyCode("Icon Code:", ":icon" + urldeviantart2 + ":");
                                }
                            },

                            {
                                label: 'Get Dev Code',
                                icon: "https://orig15.deviantart.net/c20e/f/2016/068/d/c/badge_plus_more_by_solchu123-d9uiher.gif",
                                action: function() {
                                    tinyCopyCode("Dev Code:", ":dev" + urldeviantart2 + ":");
                                }
                            }

                        ]
                    }).contextmenu(function() {
                        urldeviantart = $(this).attr("href");
                        if (urldeviantart.endsWith("/") == false) { urldeviantart = urldeviantart + "/"; }
                        urldeviantart2 = urldeviantart.split("/")[3];
                        $(this).addClass("selectedplusthumbpx");
                    })

                })
            }

            // Thumb

            if (data.clear == true) {} else if (data.thumb == true) {
                $(data.thumbDATA).each(function() {

                    $(this).off("contextmenu").contextPopup({
                        title: 'Open Image',
                        items: [

                            {
                                label: 'Custom Icons - Credits',
                                icon: "https://orig09.deviantart.net/209a/f/2016/060/6/8/applications_by_solchu123-d9tl2cg.gif",
                                action: function() {
                                    window.open("https://www.deviantart.com/solchu123/gallery/59279676/EMOTICONS", "_blank")
                                }
                            },

                            null,

                            { label: 'Page', icon: 'https://st.deviantart.net/emoticons/d/dalogo1.gif', action: function() { window.open(urldeviantart, "_blank") } },
                            //{label:'Image Url', icon:'https://st.deviantart.net/emoticons/g/groups.gif' , action:function() {window.open(urldeviantartimg, "_blank")}},

                            null,

                            {
                                label: 'Get Thumb Code',
                                icon: "https://orig15.deviantart.net/c20e/f/2016/068/d/c/badge_plus_more_by_solchu123-d9uiher.gif",
                                action: function() {
                                    tinyCopyCode("Thumb Code:", ":thumb" + urldeviantart2 + ":");
                                }
                            }

                        ]
                    }).contextmenu(function() {
                        urldeviantart = $(this).attr("href");
                        urldeviantartimg = $(this).attr("data-super-img");

                        if (urldeviantartimg == undefined) { urldeviantartimg = urldeviantart }
                        urldeviantart2 = removeParamenters(urldeviantart).slice(-9);
                        urldeviantart2 = urldeviantart2.replace(/\-/g, "");

                        $(this).addClass("selectedplusthumbpx");

                    })

                })
            }

            if (data.disable == true) {
                $(data.disableDATA).off("contextmenu");
            }

            if (data.clear == true) {
                $(data.thumbDATA).each(function() { $(this).off("contextmenu"); })
                $(data.profileDATA).each(function() { $(this).off("contextmenu"); })
            }

        })



        if ($('.dev-meta-actions').length > 0) {

            var tinyitems = {

                artistName: $('.dev-title-container .username').text(),
                imageTitle: $(".dev-title-container h1 a[href*='/art/']").text()

            };

            var imagelist = [];

            $(".dev-page-container").each(function() {
                if ($(this).hasClass("minibrowse-container")) {

                    tinyitems.srcButton = $(this).find('.dev-page-download');
                    tinyitems.imgFull = $(this).find(".dev-content-full");
                    tinyitems.base = $(this).find(".dev-view-deviation");

                }
            });

            if (typeof tinyitems.imgFull == "undefined") {

                tinyitems.srcButton = $('#output .dev-page-download');
                tinyitems.imgFull = $('#output .dev-content-full');
                tinyitems.base = $("#output").find(".dev-view-deviation");

            }

            tinyitems.base.find("img").each(function() {
                imagelist.push({
                    label: $(this).attr("width") + ' × ' + $(this).attr("height"),
                    icon: "",
                    data: $(this).attr("src"),
                    action: function(e, tinythis) {
                        //$($(tinythis).data("contextMenuPlugin-main")).addClass("send-download-tiny");
                        chrome.extension.sendMessage({ type: "downloader", url: $(tinythis).data("contextMenuPlugin-data") }, function() {});
                        //tinyFuncs.downloadImage($(tinythis).data("contextMenuPlugin-main"), $(tinythis).data("contextMenuPlugin-data"));
                    }
                });
            });



            $('.dev-meta-actions').append(
                $("<a>", { href: tinyitems.imgFull.attr("src"), class: "dev-page-button dev-page-button-with-text dev-page-download", id: "downloadTinyImage" })
                .data("download-deviantart", tinyitems.imSaveName).append(
                    $("<i>"),
                    $("<span>", { class: "label" }).append([
                        "Download Plus"
                    ]),
                    $("<span>", { class: "text" }).text(tinyitems.imgFull.attr("src").split('.').pop().toUpperCase() + " " + tinyitems.imgFull.attr("width") + ' × ' + tinyitems.imgFull.attr("height"))
                ).click(function() {

                    //$(this).addClass("send-download-tiny");
                    //tinyFuncs.downloadImage(this, $(this).attr("href"));
                    chrome.extension.sendMessage({ type: "downloader", url: $(this).attr("href") }, function() {});
                    return false;

                }).contextPopup({
                    title: 'Choose a Size',
                    items: imagelist
                })
            );

            if (typeof tinyitems.srcButton != "undefined") {

                var newclone = tinyitems.srcButton.clone().attr("id", "newreplaceDownloadPlus").click(function() {

                    //$(this).addClass("send-download-tiny");
                    //tinyFuncs.downloadImage(this, $(this).attr("href"));
                    chrome.extension.sendMessage({ type: "downloader", url: $(this).attr("href") }, function() {});
                    return false;

                });

                tinyitems.srcButton.replaceWith(newclone);

            }

        }


    },

    // Friend Click
    friendlist: function(config, thishere) {
        if (config.customrightclick == true) {
            tinyFuncs.profileUpdate({
                "profile": true,
                "profileDATA": thishere,
            });
        }
    }

};




// Send to Background
tinyFuncs.sendChrome = function(send, reponse) { chrome.extension.sendMessage({ text: send }, function(reponse) { if (reponse.type == reponse) {} }); }


// Load Page

$("body").ready(function() {






    // Friend List Click

    $("#oh-menu-friends").click(function() {
        chrome.storage.sync.get({ customrightclick: true }, function(config) {

            $(".popup2-friends-menu .friendmachine .readout").off('DOMNodeInserted').on('DOMNodeInserted', function(e) {
                $(".friendmachine .readout .deviants dd:last-child .username-with-symbol .username").each(function() {

                    tinyFuncs.friendlist(config, this);

                })
            })

        })
    })



})