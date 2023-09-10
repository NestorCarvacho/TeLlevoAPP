/*
 * jQuery Form Styler v2.0.2
 * https://github.com/Dimox/jQueryFormStyler
 *
 * Copyright 2012-2017 Dimox (http://dimox.name/)
 * Released under the MIT license.
 *
 * Date: 2017.10.22
 *
 */

(function (factory) {
  if (typeof define === "function" && define.amd) {
    // AMD
    define(["jquery"], factory);
  } else if (typeof exports === "object") {
    // CommonJS
    module.exports = factory($ || require("jquery"));
  } else {
    factory(jQuery);
  }
})(function ($) {
  "use strict";

  var pluginName = "styler",
    defaults = {
      idSuffix: "-styler",
      filePlaceholder: "Ð¤Ð°Ð¹Ð» Ð½Ðµ Ð²Ñ‹Ð±Ñ€Ð°Ð½",
      fileBrowse: "ÐžÐ±Ð·Ð¾Ñ€...",
      fileNumber: "Ð’Ñ‹Ð±Ñ€Ð°Ð½Ð¾ Ñ„Ð°Ð¹Ð»Ð¾Ð²: %s",
      selectPlaceholder: "Ð’Ñ‹Ð±ÐµÑ€Ð¸Ñ‚Ðµ...",
      selectSearch: false,
      selectSearchLimit: 10,
      selectSearchNotFound: "Ð¡Ð¾Ð²Ð¿Ð°Ð´ÐµÐ½Ð¸Ð¹ Ð½Ðµ Ð½Ð°Ð¹Ð´ÐµÐ½Ð¾",
      selectSearchPlaceholder: "ÐŸÐ¾Ð¸ÑÐº...",
      selectVisibleOptions: 0,
      selectSmartPositioning: true,
      locale: "ru",
      locales: {
        en: {
          filePlaceholder: "No file selected",
          fileBrowse: "Browse...",
          fileNumber: "Selected files: %s",
          selectPlaceholder: "Select...",
          selectSearchNotFound: "No matches found",
          selectSearchPlaceholder: "Search...",
        },
      },
      onSelectOpened: function () {},
      onSelectClosed: function () {},
      onFormStyled: function () {},
    };

  function Plugin(element, options) {
    this.element = element;
    this.options = $.extend({}, defaults, options);
    var locale = this.options.locale;
    if (this.options.locales[locale] !== undefined) {
      $.extend(this.options, this.options.locales[locale]);
    }
    this.init();
  }

  Plugin.prototype = {
    // Ð¸Ð½Ð¸Ñ†Ð¸Ð°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ
    init: function () {
      var el = $(this.element);
      var opt = this.options;

      var iOS =
        navigator.userAgent.match(/(iPad|iPhone|iPod)/i) &&
        !navigator.userAgent.match(/(Windows\sPhone)/i)
          ? true
          : false;
      var Android =
        navigator.userAgent.match(/Android/i) &&
        !navigator.userAgent.match(/(Windows\sPhone)/i)
          ? true
          : false;

      function Attributes() {
        if (el.attr("id") !== undefined && el.attr("id") !== "") {
          this.id = el.attr("id") + opt.idSuffix;
        }
        this.title = el.attr("title");
        this.classes = el.attr("class");
        this.data = el.data();
      }

      // checkbox
      if (el.is(":checkbox")) {
        var checkboxOutput = function () {
          var att = new Attributes();
          var checkbox = $(
            '<div class="jq-checkbox"><div class="jq-checkbox__div"></div></div>'
          )
            .attr({
              id: att.id,
              title: att.title,
            })
            .addClass(att.classes)
            .data(att.data);
          el.after(checkbox).prependTo(checkbox);
          if (el.is(":checked")) checkbox.addClass("checked");
          if (el.is(":disabled")) checkbox.addClass("disabled");

          // ÐºÐ»Ð¸Ðº Ð½Ð° Ð¿ÑÐµÐ²Ð´Ð¾Ñ‡ÐµÐºÐ±Ð¾ÐºÑ
          checkbox.click(function (e) {
            e.preventDefault();
            el.triggerHandler("click");
            if (!checkbox.is(".disabled")) {
              if (el.is(":checked")) {
                el.prop("checked", false);
                checkbox.removeClass("checked");
              } else {
                el.prop("checked", true);
                checkbox.addClass("checked");
              }
              el.focus().change();
            }
          });
          // ÐºÐ»Ð¸Ðº Ð½Ð° label
          el.closest("label")
            .add('label[for="' + el.attr("id") + '"]')
            .on("click.styler", function (e) {
              if (
                !$(e.target).is("a") &&
                !$(e.target).closest(checkbox).length
              ) {
                checkbox.triggerHandler("click");
                e.preventDefault();
              }
            });
          // Ð¿ÐµÑ€ÐµÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ Ð¿Ð¾ Space Ð¸Ð»Ð¸ Enter
          el.on("change.styler", function () {
            if (el.is(":checked")) checkbox.addClass("checked");
            else checkbox.removeClass("checked");
          })
            // Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿ÐµÑ€ÐµÐºÐ»ÑŽÑ‡Ð°Ð»ÑÑ Ñ‡ÐµÐºÐ±Ð¾ÐºÑ, ÐºÐ¾Ñ‚Ð¾Ñ€Ñ‹Ð¹ Ð½Ð°Ñ…Ð¾Ð´Ð¸Ñ‚ÑÑ Ð² Ñ‚ÐµÐ³Ðµ label
            .on("keydown.styler", function (e) {
              if (e.which == 32) checkbox.click();
            })
            .on("focus.styler", function () {
              if (!checkbox.is(".disabled")) checkbox.addClass("focused");
            })
            .on("blur.styler", function () {
              checkbox.removeClass("focused");
            });
        }; // end checkboxOutput()

        checkboxOutput();

        // Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¸ Ð´Ð¸Ð½Ð°Ð¼Ð¸Ñ‡ÐµÑÐºÐ¾Ð¼ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸
        el.on("refresh", function () {
          el.closest("label")
            .add('label[for="' + el.attr("id") + '"]')
            .off(".styler");
          el.off(".styler").parent().before(el).remove();
          checkboxOutput();
        });

        // end checkbox

        // radio
      } else if (el.is(":radio")) {
        var radioOutput = function () {
          var att = new Attributes();
          var radio = $(
            '<div class="jq-radio"><div class="jq-radio__div"></div></div>'
          )
            .attr({
              id: att.id,
              title: att.title,
            })
            .addClass(att.classes)
            .data(att.data);
          el.after(radio).prependTo(radio);
          if (el.is(":checked")) radio.addClass("checked");
          if (el.is(":disabled")) radio.addClass("disabled");

          // Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÑÐµÐ¼ Ð¾Ð±Ñ‰ÐµÐ³Ð¾ Ñ€Ð¾Ð´Ð¸Ñ‚ÐµÐ»Ñ Ñƒ Ñ€Ð°Ð´Ð¸Ð¾ÐºÐ½Ð¾Ð¿Ð¾Ðº Ñ Ð¾Ð´Ð¸Ð½Ð°ÐºÐ¾Ð²Ñ‹Ð¼ name
          // http://stackoverflow.com/a/27733847
          $.fn.commonParents = function () {
            var cachedThis = this;
            return cachedThis
              .first()
              .parents()
              .filter(function () {
                return $(this).find(cachedThis).length === cachedThis.length;
              });
          };
          $.fn.commonParent = function () {
            return $(this).commonParents().first();
          };

          // ÐºÐ»Ð¸Ðº Ð½Ð° Ð¿ÑÐµÐ²Ð´Ð¾Ñ€Ð°Ð´Ð¸Ð¾ÐºÐ½Ð¾Ð¿ÐºÐµ
          radio.click(function (e) {
            e.preventDefault();
            el.triggerHandler("click");
            if (!radio.is(".disabled")) {
              var inputName = $('input[name="' + el.attr("name") + '"]');
              inputName
                .commonParent()
                .find(inputName)
                .prop("checked", false)
                .parent()
                .removeClass("checked");
              el.prop("checked", true).parent().addClass("checked");
              el.focus().change();
            }
          });
          // ÐºÐ»Ð¸Ðº Ð½Ð° label
          el.closest("label")
            .add('label[for="' + el.attr("id") + '"]')
            .on("click.styler", function (e) {
              if (!$(e.target).is("a") && !$(e.target).closest(radio).length) {
                radio.triggerHandler("click");
                e.preventDefault();
              }
            });
          // Ð¿ÐµÑ€ÐµÐºÐ»ÑŽÑ‡ÐµÐ½Ð¸Ðµ ÑÑ‚Ñ€ÐµÐ»ÐºÐ°Ð¼Ð¸
          el.on("change.styler", function () {
            el.parent().addClass("checked");
          })
            .on("focus.styler", function () {
              if (!radio.is(".disabled")) radio.addClass("focused");
            })
            .on("blur.styler", function () {
              radio.removeClass("focused");
            });
        }; // end radioOutput()

        radioOutput();

        // Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¸ Ð´Ð¸Ð½Ð°Ð¼Ð¸Ñ‡ÐµÑÐºÐ¾Ð¼ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸
        el.on("refresh", function () {
          el.closest("label")
            .add('label[for="' + el.attr("id") + '"]')
            .off(".styler");
          el.off(".styler").parent().before(el).remove();
          radioOutput();
        });

        // end radio

        // file
      } else if (el.is(":file")) {
        var fileOutput = function () {
          var att = new Attributes();
          var placeholder = el.data("placeholder");
          if (placeholder === undefined) placeholder = opt.filePlaceholder;
          var browse = el.data("browse");
          if (browse === undefined || browse === "") browse = opt.fileBrowse;

          var file = $(
            '<div class="jq-file">' +
              '<div class="jq-file__name">' +
              placeholder +
              "</div>" +
              '<div class="jq-file__browse">' +
              browse +
              "</div>" +
              "</div>"
          )
            .attr({
              id: att.id,
              title: att.title,
            })
            .addClass(att.classes)
            .data(att.data);
          el.after(file).appendTo(file);
          if (el.is(":disabled")) file.addClass("disabled");

          var value = el.val();
          var name = $("div.jq-file__name", file);

          // Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿Ñ€Ð¸ Ð´Ð¸Ð½Ð°Ð¼Ð¸Ñ‡ÐµÑÐºÐ¾Ð¼ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ Ð¸Ð¼Ñ Ñ„Ð°Ð¹Ð»Ð° Ð½Ðµ ÑÐ±Ñ€Ð°ÑÑ‹Ð²Ð°Ð»Ð¾ÑÑŒ
          if (value) name.text(value.replace(/.+[\\\/]/, ""));

          el.on("change.styler", function () {
            var value = el.val();
            if (el.is("[multiple]")) {
              value = "";
              var files = el[0].files.length;
              if (files > 0) {
                var number = el.data("number");
                if (number === undefined) number = opt.fileNumber;
                number = number.replace("%s", files);
                value = number;
              }
            }
            name.text(value.replace(/.+[\\\/]/, ""));
            if (value === "") {
              name.text(placeholder);
              file.removeClass("changed");
            } else {
              file.addClass("changed");
            }
          })
            .on("focus.styler", function () {
              file.addClass("focused");
            })
            .on("blur.styler", function () {
              file.removeClass("focused");
            })
            .on("click.styler", function () {
              file.removeClass("focused");
            });
        }; // end fileOutput()

        fileOutput();

        // Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¸ Ð´Ð¸Ð½Ð°Ð¼Ð¸Ñ‡ÐµÑÐºÐ¾Ð¼ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸
        el.on("refresh", function () {
          el.off(".styler").parent().before(el).remove();
          fileOutput();
        });

        // end file

        // number
      } else if (el.is('input[type="number"]')) {
        var numberOutput = function () {
          var att = new Attributes();
          var number = $(
            '<div class="jq-number">' +
              '<div class="jq-number__spin minus"></div>' +
              '<div class="jq-number__spin plus"></div>' +
              "</div>"
          )
            .attr({
              id: att.id,
              title: att.title,
            })
            .addClass(att.classes)
            .data(att.data);
          el.after(number)
            .prependTo(number)
            .wrap('<div class="jq-number__field"></div>');
          if (el.is(":disabled")) number.addClass("disabled");

          var min,
            max,
            step,
            timeout = null,
            interval = null;
          if (el.attr("min") !== undefined) min = el.attr("min");
          if (el.attr("max") !== undefined) max = el.attr("max");
          if (el.attr("step") !== undefined && $.isNumeric(el.attr("step")))
            step = Number(el.attr("step"));
          else step = Number(1);

          var changeValue = function (spin) {
            var value = el.val(),
              newValue;

            if (!$.isNumeric(value)) {
              value = 0;
              el.val("0");
            }

            if (spin.is(".minus")) {
              newValue = Number(value) - step;
            } else if (spin.is(".plus")) {
              newValue = Number(value) + step;
            }

            // Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÑÐµÐ¼ ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð´ÐµÑÑÑ‚Ð¸Ñ‡Ð½Ñ‹Ñ… Ð·Ð½Ð°ÐºÐ¾Ð² Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð¿ÑÑ‚Ð¾Ð¹ Ð² step
            var decimals = (step.toString().split(".")[1] || []).length;
            if (decimals > 0) {
              var multiplier = "1";
              while (multiplier.length <= decimals)
                multiplier = multiplier + "0";
              // Ð¸Ð·Ð±ÐµÐ³Ð°ÐµÐ¼ Ð¿Ð¾ÑÐ²Ð»ÐµÐ½Ð¸Ñ Ð»Ð¸ÑˆÐ½Ð¸Ñ… Ð·Ð½Ð°ÐºÐ¾Ð² Ð¿Ð¾ÑÐ»Ðµ Ð·Ð°Ð¿ÑÑ‚Ð¾Ð¹
              newValue = Math.round(newValue * multiplier) / multiplier;
            }

            if ($.isNumeric(min) && $.isNumeric(max)) {
              if (newValue >= min && newValue <= max) el.val(newValue);
            } else if ($.isNumeric(min) && !$.isNumeric(max)) {
              if (newValue >= min) el.val(newValue);
            } else if (!$.isNumeric(min) && $.isNumeric(max)) {
              if (newValue <= max) el.val(newValue);
            } else {
              el.val(newValue);
            }
          };

          if (!number.is(".disabled")) {
            number
              .on("mousedown", "div.jq-number__spin", function () {
                var spin = $(this);
                changeValue(spin);
                timeout = setTimeout(function () {
                  interval = setInterval(function () {
                    changeValue(spin);
                  }, 40);
                }, 350);
              })
              .on("mouseup mouseout", "div.jq-number__spin", function () {
                clearTimeout(timeout);
                clearInterval(interval);
              })
              .on("mouseup", "div.jq-number__spin", function () {
                el.change().trigger("input");
              });
            el.on("focus.styler", function () {
              number.addClass("focused");
            }).on("blur.styler", function () {
              number.removeClass("focused");
            });
          }
        }; // end numberOutput()

        numberOutput();

        // Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¸ Ð´Ð¸Ð½Ð°Ð¼Ð¸Ñ‡ÐµÑÐºÐ¾Ð¼ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸
        el.on("refresh", function () {
          el.off(".styler").closest(".jq-number").before(el).remove();
          numberOutput();
        });

        // end number

        // select
      } else if (el.is("select")) {
        var selectboxOutput = function () {
          // Ð·Ð°Ð¿Ñ€ÐµÑ‰Ð°ÐµÐ¼ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÑƒ ÑÑ‚Ñ€Ð°Ð½Ð¸Ñ†Ñ‹ Ð¿Ñ€Ð¸ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐµ ÑÐµÐ»ÐµÐºÑ‚Ð°
          function preventScrolling(selector) {
            var scrollDiff =
                selector.prop("scrollHeight") - selector.outerHeight(),
              wheelDelta = null,
              scrollTop = null;

            selector
              .off("mousewheel DOMMouseScroll")
              .on("mousewheel DOMMouseScroll", function (e) {
                /**
                 * Ð½Ð¾Ñ€Ð¼Ð°Ð»Ð¸Ð·Ð°Ñ†Ð¸Ñ Ð½Ð°Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ñ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ¸
                 * (firefox < 0 || chrome etc... > 0)
                 * (e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0)
                 */
                wheelDelta =
                  e.originalEvent.detail < 0 || e.originalEvent.wheelDelta > 0
                    ? 1
                    : -1; // Ð½Ð°Ð¿Ñ€Ð°Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‚ÐºÐ¸ (-1 Ð²Ð½Ð¸Ð·, 1 Ð²Ð²ÐµÑ€Ñ…)
                scrollTop = selector.scrollTop(); // Ð¿Ð¾Ð·Ð¸Ñ†Ð¸Ñ ÑÐºÑ€Ð¾Ð»Ð»Ð°

                if (
                  (scrollTop >= scrollDiff && wheelDelta < 0) ||
                  (scrollTop <= 0 && wheelDelta > 0)
                ) {
                  e.stopPropagation();
                  e.preventDefault();
                }
              });
          }

          var option = $("option", el);
          var list = "";
          // Ñ„Ð¾Ñ€Ð¼Ð¸Ñ€ÑƒÐµÐ¼ ÑÐ¿Ð¸ÑÐ¾Ðº ÑÐµÐ»ÐµÐºÑ‚Ð°
          function makeList() {
            for (var i = 0; i < option.length; i++) {
              var op = option.eq(i);
              var li = "",
                liClass = "",
                liClasses = "",
                id = "",
                title = "",
                dataList = "",
                optionClass = "",
                optgroupClass = "",
                dataJqfsClass = "";
              var disabled = "disabled";
              var selDis = "selected sel disabled";
              if (op.prop("selected")) liClass = "selected sel";
              if (op.is(":disabled")) liClass = disabled;
              if (op.is(":selected:disabled")) liClass = selDis;
              if (op.attr("id") !== undefined && op.attr("id") !== "")
                id = ' id="' + op.attr("id") + opt.idSuffix + '"';
              if (op.attr("title") !== undefined && option.attr("title") !== "")
                title = ' title="' + op.attr("title") + '"';
              if (op.attr("class") !== undefined) {
                optionClass = " " + op.attr("class");
                dataJqfsClass = ' data-jqfs-class="' + op.attr("class") + '"';
              }

              var data = op.data();
              for (var k in data) {
                if (data[k] !== "")
                  dataList += " data-" + k + '="' + data[k] + '"';
              }

              if (liClass + optionClass !== "")
                liClasses = ' class="' + liClass + optionClass + '"';
              li =
                "<li" +
                dataJqfsClass +
                dataList +
                liClasses +
                title +
                id +
                ">" +
                op.html() +
                "</li>";

              // ÐµÑÐ»Ð¸ ÐµÑÑ‚ÑŒ optgroup
              if (op.parent().is("optgroup")) {
                if (op.parent().attr("class") !== undefined)
                  optgroupClass = " " + op.parent().attr("class");
                li =
                  "<li" +
                  dataJqfsClass +
                  dataList +
                  ' class="' +
                  liClass +
                  optionClass +
                  " option" +
                  optgroupClass +
                  '"' +
                  title +
                  id +
                  ">" +
                  op.html() +
                  "</li>";
                if (op.is(":first-child")) {
                  li =
                    '<li class="optgroup' +
                    optgroupClass +
                    '">' +
                    op.parent().attr("label") +
                    "</li>" +
                    li;
                }
              }

              list += li;
            }
          } // end makeList()

          // Ð¾Ð´Ð¸Ð½Ð¾Ñ‡Ð½Ñ‹Ð¹ ÑÐµÐ»ÐµÐºÑ‚
          function doSelect() {
            var att = new Attributes();
            var searchHTML = "";
            var selectPlaceholder = el.data("placeholder");
            var selectSearch = el.data("search");
            var selectSearchLimit = el.data("search-limit");
            var selectSearchNotFound = el.data("search-not-found");
            var selectSearchPlaceholder = el.data("search-placeholder");
            var selectSmartPositioning = el.data("smart-positioning");

            if (selectPlaceholder === undefined)
              selectPlaceholder = opt.selectPlaceholder;
            if (selectSearch === undefined || selectSearch === "")
              selectSearch = opt.selectSearch;
            if (selectSearchLimit === undefined || selectSearchLimit === "")
              selectSearchLimit = opt.selectSearchLimit;
            if (
              selectSearchNotFound === undefined ||
              selectSearchNotFound === ""
            )
              selectSearchNotFound = opt.selectSearchNotFound;
            if (selectSearchPlaceholder === undefined)
              selectSearchPlaceholder = opt.selectSearchPlaceholder;
            if (
              selectSmartPositioning === undefined ||
              selectSmartPositioning === ""
            )
              selectSmartPositioning = opt.selectSmartPositioning;

            var selectbox = $(
              '<div class="jq-selectbox jqselect">' +
                '<div class="jq-selectbox__select">' +
                '<div class="jq-selectbox__select-text"></div>' +
                '<div class="jq-selectbox__trigger">' +
                '<div class="jq-selectbox__trigger-arrow"></div></div>' +
                "</div>" +
                "</div>"
            )
              .attr({
                id: att.id,
                title: att.title,
              })
              .addClass(att.classes)
              .data(att.data);
            el.after(selectbox).prependTo(selectbox);

            var selectzIndex = selectbox.css("z-index");
            selectzIndex = selectzIndex > 0 ? selectzIndex : 1;
            var divSelect = $("div.jq-selectbox__select", selectbox);
            var divText = $("div.jq-selectbox__select-text", selectbox);
            var optionSelected = option.filter(":selected");

            makeList();

            if (selectSearch)
              searchHTML =
                '<div class="jq-selectbox__search"><input type="search" autocomplete="off" placeholder="' +
                selectSearchPlaceholder +
                '"></div>' +
                '<div class="jq-selectbox__not-found">' +
                selectSearchNotFound +
                "</div>";
            var dropdown = $(
              '<div class="jq-selectbox__dropdown">' +
                searchHTML +
                "<ul>" +
                list +
                "</ul>" +
                "</div>"
            );
            selectbox.append(dropdown);
            var ul = $("ul", dropdown);
            var li = $("li", dropdown);
            var search = $("input", dropdown);
            var notFound = $("div.jq-selectbox__not-found", dropdown).hide();
            if (li.length < selectSearchLimit) search.parent().hide();

            // Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ð¾Ð¿Ñ†Ð¸ÑŽ Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ
            // ÐµÑÐ»Ð¸ Ñƒ 1-Ð¹ Ð¾Ð¿Ñ†Ð¸Ð¸ Ð½ÐµÑ‚ Ñ‚ÐµÐºÑÑ‚Ð°, Ð¾Ð½Ð° Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð° Ð¿Ð¾ ÑƒÐ¼Ð¾Ð»Ñ‡Ð°Ð½Ð¸ÑŽ Ð¸ Ð¿Ð°Ñ€Ð°Ð¼ÐµÑ‚Ñ€ selectPlaceholder Ð½Ðµ false, Ñ‚Ð¾ Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ð¿Ð»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€
            if (
              option.first().text() === "" &&
              option.first().is(":selected") &&
              selectPlaceholder !== false
            ) {
              divText.text(selectPlaceholder).addClass("placeholder");
            } else {
              divText.text(optionSelected.text());
            }

            // Ð¾Ð¿Ñ€ÐµÐ´ÐµÐ»ÑÐµÐ¼ ÑÐ°Ð¼Ñ‹Ð¹ ÑˆÐ¸Ñ€Ð¾ÐºÐ¸Ð¹ Ð¿ÑƒÐ½ÐºÑ‚ ÑÐµÐ»ÐµÐºÑ‚Ð°
            var liWidthInner = 0,
              liWidth = 0;
            li.css({ display: "inline-block" });
            li.each(function () {
              var l = $(this);
              if (l.innerWidth() > liWidthInner) {
                liWidthInner = l.innerWidth();
                liWidth = l.width();
              }
            });
            li.css({ display: "" });

            // Ð¿Ð¾Ð´ÑÑ‚Ñ€Ð°Ð¸Ð²Ð°ÐµÐ¼ ÑˆÐ¸Ñ€Ð¸Ð½Ñƒ ÑÐ²ÐµÑ€Ð½ÑƒÑ‚Ð¾Ð³Ð¾ ÑÐµÐ»ÐµÐºÑ‚Ð° Ð² Ð·Ð°Ð²Ð¸ÑÐ¸Ð¼Ð¾ÑÑ‚Ð¸
            // Ð¾Ñ‚ ÑˆÐ¸Ñ€Ð¸Ð½Ñ‹ Ð¿Ð»ÐµÐ¹ÑÑ…Ð¾Ð»Ð´ÐµÑ€Ð° Ð¸Ð»Ð¸ ÑÐ°Ð¼Ð¾Ð³Ð¾ ÑˆÐ¸Ñ€Ð¾ÐºÐ¾Ð³Ð¾ Ð¿ÑƒÐ½ÐºÑ‚Ð°
            if (divText.is(".placeholder") && divText.width() > liWidthInner) {
              divText.width(divText.width());
            } else {
              var selClone = selectbox.clone().appendTo("body").width("auto");
              var selCloneWidth = selClone.outerWidth();
              selClone.remove();
              if (selCloneWidth == selectbox.outerWidth()) {
                divText.width(liWidth);
              }
            }

            // Ð¿Ð¾Ð´ÑÑ‚Ñ€Ð°Ð¸Ð²Ð°ÐµÐ¼ ÑˆÐ¸Ñ€Ð¸Ð½Ñƒ Ð²Ñ‹Ð¿Ð°Ð´Ð°ÑŽÑ‰ÐµÐ³Ð¾ ÑÐ¿Ð¸ÑÐºÐ° Ð² Ð·Ð°Ð²Ð¸ÑÐ¸Ð¼Ð¾ÑÑ‚Ð¸ Ð¾Ñ‚ ÑÐ°Ð¼Ð¾Ð³Ð¾ ÑˆÐ¸Ñ€Ð¾ÐºÐ¾Ð³Ð¾ Ð¿ÑƒÐ½ÐºÑ‚Ð°
            if (liWidthInner > selectbox.width()) dropdown.width(liWidthInner);

            // Ð¿Ñ€ÑÑ‡ÐµÐ¼ 1-ÑŽ Ð¿ÑƒÑÑ‚ÑƒÑŽ Ð¾Ð¿Ñ†Ð¸ÑŽ, ÐµÑÐ»Ð¸ Ð¾Ð½Ð° ÐµÑÑ‚ÑŒ Ð¸ ÐµÑÐ»Ð¸ Ð°Ñ‚Ñ€Ð¸Ð±ÑƒÑ‚ data-placeholder Ð½Ðµ Ð¿ÑƒÑÑ‚Ð¾Ð¹
            // ÐµÑÐ»Ð¸ Ð²ÑÐµ Ð¶Ðµ Ð½ÑƒÐ¶Ð½Ð¾, Ñ‡Ñ‚Ð¾Ð±Ñ‹ Ð¿ÐµÑ€Ð²Ð°Ñ Ð¿ÑƒÑÑ‚Ð°Ñ Ð¾Ð¿Ñ†Ð¸Ñ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°Ð»Ð°ÑÑŒ, Ñ‚Ð¾ ÑƒÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ñƒ ÑÐµÐ»ÐµÐºÑ‚Ð°: data-placeholder=""
            if (option.first().text() === "" && el.data("placeholder") !== "") {
              li.first().hide();
            }

            var selectHeight = selectbox.outerHeight(true);
            var searchHeight = search.parent().outerHeight(true) || 0;
            var isMaxHeight = ul.css("max-height");
            var liSelected = li.filter(".selected");
            if (liSelected.length < 1) li.first().addClass("selected sel");
            if (li.data("li-height") === undefined) {
              var liOuterHeight = li.outerHeight();
              if (selectPlaceholder !== false)
                liOuterHeight = li.eq(1).outerHeight();
              li.data("li-height", liOuterHeight);
            }
            var position = dropdown.css("top");
            if (dropdown.css("left") == "auto") dropdown.css({ left: 0 });
            if (dropdown.css("top") == "auto") {
              dropdown.css({ top: selectHeight });
              position = selectHeight;
            }
            dropdown.hide();

            // ÐµÑÐ»Ð¸ Ð²Ñ‹Ð±Ñ€Ð°Ð½ Ð½Ðµ Ð´ÐµÑ„Ð¾Ð»Ñ‚Ð½Ñ‹Ð¹ Ð¿ÑƒÐ½ÐºÑ‚
            if (liSelected.length) {
              // Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ ÐºÐ»Ð°ÑÑ, Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÑŽÑ‰Ð¸Ð¹ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ ÑÐµÐ»ÐµÐºÑ‚Ð°
              if (option.first().text() != optionSelected.text()) {
                selectbox.addClass("changed");
              }
              // Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÐ¼ ÑÐµÐ»ÐµÐºÑ‚Ñƒ ÐºÐ»Ð°ÑÑ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¿ÑƒÐ½ÐºÑ‚Ð°
              selectbox.data("jqfs-class", liSelected.data("jqfs-class"));
              selectbox.addClass(liSelected.data("jqfs-class"));
            }

            // ÐµÑÐ»Ð¸ ÑÐµÐ»ÐµÐºÑ‚ Ð½ÐµÐ°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ð¹
            if (el.is(":disabled")) {
              selectbox.addClass("disabled");
              return false;
            }

            // Ð¿Ñ€Ð¸ ÐºÐ»Ð¸ÐºÐµ Ð½Ð° Ð¿ÑÐµÐ²Ð´Ð¾ÑÐµÐ»ÐµÐºÑ‚Ðµ
            divSelect.click(function () {
              // ÐºÐ¾Ð»Ð±ÐµÐº Ð¿Ñ€Ð¸ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð°
              if ($("div.jq-selectbox").filter(".opened").length) {
                opt.onSelectClosed.call(
                  $("div.jq-selectbox").filter(".opened")
                );
              }

              el.focus();

              // ÐµÑÐ»Ð¸ iOS, Ñ‚Ð¾ Ð½Ðµ Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÐµÐ¼ Ð²Ñ‹Ð¿Ð°Ð´Ð°ÑŽÑ‰Ð¸Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº,
              // Ñ‚.Ðº. Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°ÐµÑ‚ÑÑ Ð½Ð°Ñ‚Ð¸Ð²Ð½Ñ‹Ð¹ Ð¸ Ð½ÐµÐ¸Ð·Ð²ÐµÑÑ‚Ð½Ð¾, ÐºÐ°Ðº ÐµÐ³Ð¾ ÑÐ¿Ñ€ÑÑ‚Ð°Ñ‚ÑŒ
              if (iOS) return;

              // ÑƒÐ¼Ð½Ð¾Ðµ Ð¿Ð¾Ð·Ð¸Ñ†Ð¸Ð¾Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ
              var win = $(window);
              var liHeight = li.data("li-height");
              var topOffset = selectbox.offset().top;
              var bottomOffset =
                win.height() - selectHeight - (topOffset - win.scrollTop());
              var visible = el.data("visible-options");
              if (visible === undefined || visible === "")
                visible = opt.selectVisibleOptions;
              var minHeight = liHeight * 5;
              var newHeight = liHeight * visible;
              if (visible > 0 && visible < 6) minHeight = newHeight;
              if (visible === 0) newHeight = "auto";

              var dropDown = function () {
                dropdown.height("auto").css({ bottom: "auto", top: position });
                var maxHeightBottom = function () {
                  ul.css(
                    "max-height",
                    Math.floor((bottomOffset - 20 - searchHeight) / liHeight) *
                      liHeight
                  );
                };
                maxHeightBottom();
                ul.css("max-height", newHeight);
                if (isMaxHeight != "none") {
                  ul.css("max-height", isMaxHeight);
                }
                if (bottomOffset < dropdown.outerHeight() + 20) {
                  maxHeightBottom();
                }
              };

              var dropUp = function () {
                dropdown.height("auto").css({ top: "auto", bottom: position });
                var maxHeightTop = function () {
                  ul.css(
                    "max-height",
                    Math.floor(
                      (topOffset - win.scrollTop() - 20 - searchHeight) /
                        liHeight
                    ) * liHeight
                  );
                };
                maxHeightTop();
                ul.css("max-height", newHeight);
                if (isMaxHeight != "none") {
                  ul.css("max-height", isMaxHeight);
                }
                if (
                  topOffset - win.scrollTop() - 20 <
                  dropdown.outerHeight() + 20
                ) {
                  maxHeightTop();
                }
              };

              if (
                selectSmartPositioning === true ||
                selectSmartPositioning === 1
              ) {
                // Ñ€Ð°ÑÐºÑ€Ñ‹Ñ‚Ð¸Ðµ Ð²Ð½Ð¸Ð·
                if (bottomOffset > minHeight + searchHeight + 20) {
                  dropDown();
                  selectbox.removeClass("dropup").addClass("dropdown");
                  // Ñ€Ð°ÑÐºÑ€Ñ‹Ñ‚Ð¸Ðµ Ð²Ð²ÐµÑ€Ñ…
                } else {
                  dropUp();
                  selectbox.removeClass("dropdown").addClass("dropup");
                }
              } else if (
                selectSmartPositioning === false ||
                selectSmartPositioning === 0
              ) {
                // Ñ€Ð°ÑÐºÑ€Ñ‹Ñ‚Ð¸Ðµ Ð²Ð½Ð¸Ð·
                if (bottomOffset > minHeight + searchHeight + 20) {
                  dropDown();
                  selectbox.removeClass("dropup").addClass("dropdown");
                }
              } else {
                // ÐµÑÐ»Ð¸ ÑƒÐ¼Ð½Ð¾Ðµ Ð¿Ð¾Ð·Ð¸Ñ†Ð¸Ð¾Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ Ð¾Ñ‚ÐºÐ»ÑŽÑ‡ÐµÐ½Ð¾
                dropdown.height("auto").css({ bottom: "auto", top: position });
                ul.css("max-height", newHeight);
                if (isMaxHeight != "none") {
                  ul.css("max-height", isMaxHeight);
                }
              }

              // ÐµÑÐ»Ð¸ Ð²Ñ‹Ð¿Ð°Ð´Ð°ÑŽÑ‰Ð¸Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº Ð²Ñ‹Ñ…Ð¾Ð´Ð¸Ñ‚ Ð·Ð° Ð¿Ñ€Ð°Ð²Ñ‹Ð¹ ÐºÑ€Ð°Ð¹ Ð¾ÐºÐ½Ð° Ð±Ñ€Ð°ÑƒÐ·ÐµÑ€Ð°,
              // Ñ‚Ð¾ Ð¼ÐµÐ½ÑÐµÐ¼ Ð¿Ð¾Ð·Ð¸Ñ†Ð¸Ð¾Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ðµ Ñ Ð»ÐµÐ²Ð¾Ð³Ð¾ Ð½Ð° Ð¿Ñ€Ð°Ð²Ð¾Ðµ
              if (
                selectbox.offset().left + dropdown.outerWidth() >
                win.width()
              ) {
                dropdown.css({ left: "auto", right: 0 });
              }
              // ÐºÐ¾Ð½ÐµÑ† ÑƒÐ¼Ð½Ð¾Ð³Ð¾ Ð¿Ð¾Ð·Ð¸Ñ†Ð¸Ð¾Ð½Ð¸Ñ€Ð¾Ð²Ð°Ð½Ð¸Ñ

              $("div.jqselect")
                .css({ zIndex: selectzIndex - 1 })
                .removeClass("opened");
              selectbox.css({ zIndex: selectzIndex });
              if (dropdown.is(":hidden")) {
                $("div.jq-selectbox__dropdown:visible").hide();
                dropdown.show();
                selectbox.addClass("opened focused");
                // ÐºÐ¾Ð»Ð±ÐµÐº Ð¿Ñ€Ð¸ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¸Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð°
                opt.onSelectOpened.call(selectbox);
              } else {
                dropdown.hide();
                selectbox.removeClass("opened dropup dropdown");
                // ÐºÐ¾Ð»Ð±ÐµÐº Ð¿Ñ€Ð¸ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð°
                if ($("div.jq-selectbox").filter(".opened").length) {
                  opt.onSelectClosed.call(selectbox);
                }
              }

              // Ð¿Ð¾Ð¸ÑÐºÐ¾Ð²Ð¾Ðµ Ð¿Ð¾Ð»Ðµ
              if (search.length) {
                search.val("").keyup();
                notFound.hide();
                search.keyup(function () {
                  var query = $(this).val();
                  li.each(function () {
                    if (
                      !$(this)
                        .html()
                        .match(new RegExp(".*?" + query + ".*?", "i"))
                    ) {
                      $(this).hide();
                    } else {
                      $(this).show();
                    }
                  });
                  // Ð¿Ñ€ÑÑ‡ÐµÐ¼ 1-ÑŽ Ð¿ÑƒÑÑ‚ÑƒÑŽ Ð¾Ð¿Ñ†Ð¸ÑŽ
                  if (
                    option.first().text() === "" &&
                    el.data("placeholder") !== ""
                  ) {
                    li.first().hide();
                  }
                  if (li.filter(":visible").length < 1) {
                    notFound.show();
                  } else {
                    notFound.hide();
                  }
                });
              }

              // Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‡Ð¸Ð²Ð°ÐµÐ¼ Ð´Ð¾ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¿ÑƒÐ½ÐºÑ‚Ð° Ð¿Ñ€Ð¸ Ð¾Ñ‚ÐºÑ€Ñ‹Ñ‚Ð¸Ð¸ ÑÐ¿Ð¸ÑÐºÐ°
              if (li.filter(".selected").length) {
                if (el.val() === "") {
                  ul.scrollTop(0);
                } else {
                  // ÐµÑÐ»Ð¸ Ð½ÐµÑ‡ÐµÑ‚Ð½Ð¾Ðµ ÐºÐ¾Ð»Ð¸Ñ‡ÐµÑÑ‚Ð²Ð¾ Ð²Ð¸Ð´Ð¸Ð¼Ñ‹Ñ… Ð¿ÑƒÐ½ÐºÑ‚Ð¾Ð²,
                  // Ñ‚Ð¾ Ð²Ñ‹ÑÐ¾Ñ‚Ñƒ Ð¿ÑƒÐ½ÐºÑ‚Ð° Ð´ÐµÐ»Ð¸Ð¼ Ð¿Ð¾Ð¿Ð¾Ð»Ð°Ð¼ Ð´Ð»Ñ Ð¿Ð¾ÑÐ»ÐµÐ´ÑƒÑŽÑ‰ÐµÐ³Ð¾ Ñ€Ð°ÑÑ‡ÐµÑ‚Ð°
                  if ((ul.innerHeight() / liHeight) % 2 !== 0)
                    liHeight = liHeight / 2;
                  ul.scrollTop(
                    ul.scrollTop() +
                      li.filter(".selected").position().top -
                      ul.innerHeight() / 2 +
                      liHeight
                  );
                }
              }

              preventScrolling(ul);
            }); // end divSelect.click()

            // Ð¿Ñ€Ð¸ Ð½Ð°Ð²ÐµÐ´ÐµÐ½Ð¸Ð¸ ÐºÑƒÑ€ÑÐ¾Ñ€Ð° Ð½Ð° Ð¿ÑƒÐ½ÐºÑ‚ ÑÐ¿Ð¸ÑÐºÐ°
            li.hover(function () {
              $(this).siblings().removeClass("selected");
            });
            var selectedText = li.filter(".selected").text();

            // Ð¿Ñ€Ð¸ ÐºÐ»Ð¸ÐºÐµ Ð½Ð° Ð¿ÑƒÐ½ÐºÑ‚ ÑÐ¿Ð¸ÑÐºÐ°
            li.filter(":not(.disabled):not(.optgroup)").click(function () {
              el.focus();
              var t = $(this);
              var liText = t.text();
              if (!t.is(".selected")) {
                var index = t.index();
                index -= t.prevAll(".optgroup").length;
                t.addClass("selected sel")
                  .siblings()
                  .removeClass("selected sel");
                option.prop("selected", false).eq(index).prop("selected", true);
                selectedText = liText;
                divText.text(liText);

                // Ð¿ÐµÑ€ÐµÐ´Ð°ÐµÐ¼ ÑÐµÐ»ÐµÐºÑ‚Ñƒ ÐºÐ»Ð°ÑÑ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¿ÑƒÐ½ÐºÑ‚Ð°
                if (selectbox.data("jqfs-class"))
                  selectbox.removeClass(selectbox.data("jqfs-class"));
                selectbox.data("jqfs-class", t.data("jqfs-class"));
                selectbox.addClass(t.data("jqfs-class"));

                el.change();
              }
              dropdown.hide();
              selectbox.removeClass("opened dropup dropdown");
              // ÐºÐ¾Ð»Ð±ÐµÐº Ð¿Ñ€Ð¸ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð°
              opt.onSelectClosed.call(selectbox);
            });
            dropdown.mouseout(function () {
              $("li.sel", dropdown).addClass("selected");
            });

            // Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ ÑÐµÐ»ÐµÐºÑ‚Ð°
            el.on("change.styler", function () {
              divText
                .text(option.filter(":selected").text())
                .removeClass("placeholder");
              li.removeClass("selected sel")
                .not(".optgroup")
                .eq(el[0].selectedIndex)
                .addClass("selected sel");
              // Ð´Ð¾Ð±Ð°Ð²Ð»ÑÐµÐ¼ ÐºÐ»Ð°ÑÑ, Ð¿Ð¾ÐºÐ°Ð·Ñ‹Ð²Ð°ÑŽÑ‰Ð¸Ð¹ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ ÑÐµÐ»ÐµÐºÑ‚Ð°
              if (option.first().text() != li.filter(".selected").text()) {
                selectbox.addClass("changed");
              } else {
                selectbox.removeClass("changed");
              }
            })
              .on("focus.styler", function () {
                selectbox.addClass("focused");
                $("div.jqselect")
                  .not(".focused")
                  .removeClass("opened dropup dropdown")
                  .find("div.jq-selectbox__dropdown")
                  .hide();
              })
              .on("blur.styler", function () {
                selectbox.removeClass("focused");
              })
              // Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ðµ ÑÐµÐ»ÐµÐºÑ‚Ð° Ñ ÐºÐ»Ð°Ð²Ð¸Ð°Ñ‚ÑƒÑ€Ñ‹
              .on("keydown.styler keyup.styler", function (e) {
                var liHeight = li.data("li-height");
                if (el.val() === "") {
                  divText.text(selectPlaceholder).addClass("placeholder");
                } else {
                  divText.text(option.filter(":selected").text());
                }
                li.removeClass("selected sel")
                  .not(".optgroup")
                  .eq(el[0].selectedIndex)
                  .addClass("selected sel");
                // Ð²Ð²ÐµÑ€Ñ…, Ð²Ð»ÐµÐ²Ð¾, Page Up, Home
                if (
                  e.which == 38 ||
                  e.which == 37 ||
                  e.which == 33 ||
                  e.which == 36
                ) {
                  if (el.val() === "") {
                    ul.scrollTop(0);
                  } else {
                    ul.scrollTop(
                      ul.scrollTop() + li.filter(".selected").position().top
                    );
                  }
                }
                // Ð²Ð½Ð¸Ð·, Ð²Ð¿Ñ€Ð°Ð²Ð¾, Page Down, End
                if (
                  e.which == 40 ||
                  e.which == 39 ||
                  e.which == 34 ||
                  e.which == 35
                ) {
                  ul.scrollTop(
                    ul.scrollTop() +
                      li.filter(".selected").position().top -
                      ul.innerHeight() +
                      liHeight
                  );
                }
                // Ð·Ð°ÐºÑ€Ñ‹Ð²Ð°ÐµÐ¼ Ð²Ñ‹Ð¿Ð°Ð´Ð°ÑŽÑ‰Ð¸Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº Ð¿Ñ€Ð¸ Ð½Ð°Ð¶Ð°Ñ‚Ð¸Ð¸ Enter
                if (e.which == 13) {
                  e.preventDefault();
                  dropdown.hide();
                  selectbox.removeClass("opened dropup dropdown");
                  // ÐºÐ¾Ð»Ð±ÐµÐº Ð¿Ñ€Ð¸ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð°
                  opt.onSelectClosed.call(selectbox);
                }
              })
              .on("keydown.styler", function (e) {
                // Ð¾Ñ‚ÐºÑ€Ñ‹Ð²Ð°ÐµÐ¼ Ð²Ñ‹Ð¿Ð°Ð´Ð°ÑŽÑ‰Ð¸Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº Ð¿Ñ€Ð¸ Ð½Ð°Ð¶Ð°Ñ‚Ð¸Ð¸ Space
                if (e.which == 32) {
                  e.preventDefault();
                  divSelect.click();
                }
              });

            // Ð¿Ñ€ÑÑ‡ÐµÐ¼ Ð²Ñ‹Ð¿Ð°Ð´Ð°ÑŽÑ‰Ð¸Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº Ð¿Ñ€Ð¸ ÐºÐ»Ð¸ÐºÐµ Ð·Ð° Ð¿Ñ€ÐµÐ´ÐµÐ»Ð°Ð¼Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð°
            if (!onDocumentClick.registered) {
              $(document).on("click", onDocumentClick);
              onDocumentClick.registered = true;
            }
          } // end doSelect()

          // Ð¼ÑƒÐ»ÑŒÑ‚Ð¸ÑÐµÐ»ÐµÐºÑ‚
          function doMultipleSelect() {
            var att = new Attributes();
            var selectbox = $('<div class="jq-select-multiple jqselect"></div>')
              .attr({
                id: att.id,
                title: att.title,
              })
              .addClass(att.classes)
              .data(att.data);
            el.after(selectbox);

            makeList();
            selectbox.append("<ul>" + list + "</ul>");
            var ul = $("ul", selectbox);
            var li = $("li", selectbox);
            var size = el.attr("size");
            var ulHeight = ul.outerHeight();
            var liHeight = li.outerHeight();
            if (size !== undefined && size > 0) {
              ul.css({ height: liHeight * size });
            } else {
              ul.css({ height: liHeight * 4 });
            }
            if (ulHeight > selectbox.height()) {
              ul.css("overflowY", "scroll");
              preventScrolling(ul);
              // Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‡Ð¸Ð²Ð°ÐµÐ¼ Ð´Ð¾ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ð¾Ð³Ð¾ Ð¿ÑƒÐ½ÐºÑ‚Ð°
              if (li.filter(".selected").length) {
                ul.scrollTop(
                  ul.scrollTop() + li.filter(".selected").position().top
                );
              }
            }

            // Ð¿Ñ€ÑÑ‡ÐµÐ¼ Ð¾Ñ€Ð¸Ð³Ð¸Ð½Ð°Ð»ÑŒÐ½Ñ‹Ð¹ ÑÐµÐ»ÐµÐºÑ‚
            el.prependTo(selectbox);

            // ÐµÑÐ»Ð¸ ÑÐµÐ»ÐµÐºÑ‚ Ð½ÐµÐ°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ð¹
            if (el.is(":disabled")) {
              selectbox.addClass("disabled");
              option.each(function () {
                if ($(this).is(":selected"))
                  li.eq($(this).index()).addClass("selected");
              });

              // ÐµÑÐ»Ð¸ ÑÐµÐ»ÐµÐºÑ‚ Ð°ÐºÑ‚Ð¸Ð²Ð½Ñ‹Ð¹
            } else {
              // Ð¿Ñ€Ð¸ ÐºÐ»Ð¸ÐºÐµ Ð½Ð° Ð¿ÑƒÐ½ÐºÑ‚ ÑÐ¿Ð¸ÑÐºÐ°
              li.filter(":not(.disabled):not(.optgroup)").click(function (e) {
                el.focus();
                var clkd = $(this);
                if (!e.ctrlKey && !e.metaKey) clkd.addClass("selected");
                if (!e.shiftKey) clkd.addClass("first");
                if (!e.ctrlKey && !e.metaKey && !e.shiftKey)
                  clkd.siblings().removeClass("selected first");

                // Ð²Ñ‹Ð´ÐµÐ»ÐµÐ½Ð¸Ðµ Ð¿ÑƒÐ½ÐºÑ‚Ð¾Ð² Ð¿Ñ€Ð¸ Ð·Ð°Ð¶Ð°Ñ‚Ð¾Ð¼ Ctrl
                if (e.ctrlKey || e.metaKey) {
                  if (clkd.is(".selected")) clkd.removeClass("selected first");
                  else clkd.addClass("selected first");
                  clkd.siblings().removeClass("first");
                }

                // Ð²Ñ‹Ð´ÐµÐ»ÐµÐ½Ð¸Ðµ Ð¿ÑƒÐ½ÐºÑ‚Ð¾Ð² Ð¿Ñ€Ð¸ Ð·Ð°Ð¶Ð°Ñ‚Ð¾Ð¼ Shift
                if (e.shiftKey) {
                  var prev = false,
                    next = false;
                  clkd
                    .siblings()
                    .removeClass("selected")
                    .siblings(".first")
                    .addClass("selected");
                  clkd.prevAll().each(function () {
                    if ($(this).is(".first")) prev = true;
                  });
                  clkd.nextAll().each(function () {
                    if ($(this).is(".first")) next = true;
                  });
                  if (prev) {
                    clkd.prevAll().each(function () {
                      if ($(this).is(".selected")) return false;
                      else
                        $(this)
                          .not(".disabled, .optgroup")
                          .addClass("selected");
                    });
                  }
                  if (next) {
                    clkd.nextAll().each(function () {
                      if ($(this).is(".selected")) return false;
                      else
                        $(this)
                          .not(".disabled, .optgroup")
                          .addClass("selected");
                    });
                  }
                  if (li.filter(".selected").length == 1)
                    clkd.addClass("first");
                }

                // Ð¾Ñ‚Ð¼ÐµÑ‡Ð°ÐµÐ¼ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ñ‹Ðµ Ð¼Ñ‹ÑˆÑŒÑŽ
                option.prop("selected", false);
                li.filter(".selected").each(function () {
                  var t = $(this);
                  var index = t.index();
                  if (t.is(".option")) index -= t.prevAll(".optgroup").length;
                  option.eq(index).prop("selected", true);
                });
                el.change();
              });

              // Ð¾Ñ‚Ð¼ÐµÑ‡Ð°ÐµÐ¼ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ñ‹Ðµ Ñ ÐºÐ»Ð°Ð²Ð¸Ð°Ñ‚ÑƒÑ€Ñ‹
              option.each(function (i) {
                $(this).data("optionIndex", i);
              });
              el.on("change.styler", function () {
                li.removeClass("selected");
                var arrIndexes = [];
                option.filter(":selected").each(function () {
                  arrIndexes.push($(this).data("optionIndex"));
                });
                li.not(".optgroup")
                  .filter(function (i) {
                    return $.inArray(i, arrIndexes) > -1;
                  })
                  .addClass("selected");
              })
                .on("focus.styler", function () {
                  selectbox.addClass("focused");
                })
                .on("blur.styler", function () {
                  selectbox.removeClass("focused");
                });

              // Ð¿Ñ€Ð¾ÐºÑ€ÑƒÑ‡Ð¸Ð²Ð°ÐµÐ¼ Ñ ÐºÐ»Ð°Ð²Ð¸Ð°Ñ‚ÑƒÑ€Ñ‹
              if (ulHeight > selectbox.height()) {
                el.on("keydown.styler", function (e) {
                  // Ð²Ð²ÐµÑ€Ñ…, Ð²Ð»ÐµÐ²Ð¾, PageUp
                  if (e.which == 38 || e.which == 37 || e.which == 33) {
                    ul.scrollTop(
                      ul.scrollTop() +
                        li.filter(".selected").position().top -
                        liHeight
                    );
                  }
                  // Ð²Ð½Ð¸Ð·, Ð²Ð¿Ñ€Ð°Ð²Ð¾, PageDown
                  if (e.which == 40 || e.which == 39 || e.which == 34) {
                    ul.scrollTop(
                      ul.scrollTop() +
                        li.filter(".selected:last").position().top -
                        ul.innerHeight() +
                        liHeight * 2
                    );
                  }
                });
              }
            }
          } // end doMultipleSelect()

          if (el.is("[multiple]")) {
            // ÐµÑÐ»Ð¸ Android Ð¸Ð»Ð¸ iOS, Ñ‚Ð¾ Ð¼ÑƒÐ»ÑŒÑ‚Ð¸ÑÐµÐ»ÐµÐºÑ‚ Ð½Ðµ ÑÑ‚Ð¸Ð»Ð¸Ð·ÑƒÐµÐ¼
            // Ð¿Ñ€Ð¸Ñ‡Ð¸Ð½Ð° Ð´Ð»Ñ Android - Ð² ÑÑ‚Ð¸Ð»Ð¸Ð·Ð¾Ð²Ð°Ð½Ð½Ð¾Ð¼ ÑÐµÐ»ÐµÐºÑ‚Ðµ Ð½ÐµÑ‚ Ð²Ð¾Ð·Ð¼Ð¾Ð¶Ð½Ð¾ÑÑ‚Ð¸ Ð²Ñ‹Ð±Ñ€Ð°Ñ‚ÑŒ Ð½ÐµÑÐºÐ¾Ð»ÑŒÐºÐ¾ Ð¿ÑƒÐ½ÐºÑ‚Ð¾Ð²
            // Ð¿Ñ€Ð¸Ñ‡Ð¸Ð½Ð° Ð´Ð»Ñ iOS - Ð² ÑÑ‚Ð¸Ð»Ð¸Ð·Ð¾Ð²Ð°Ð½Ð½Ð¾Ð¼ ÑÐµÐ»ÐµÐºÑ‚Ðµ Ð½ÐµÐ¿Ñ€Ð°Ð²Ð¸Ð»ÑŒÐ½Ð¾ Ð¾Ñ‚Ð¾Ð±Ñ€Ð°Ð¶Ð°ÑŽÑ‚ÑÑ Ð²Ñ‹Ð±Ñ€Ð°Ð½Ð½Ñ‹Ðµ Ð¿ÑƒÐ½ÐºÑ‚Ñ‹
            if (Android || iOS) return;

            doMultipleSelect();
          } else {
            doSelect();
          }
        }; // end selectboxOutput()

        selectboxOutput();

        // Ð¾Ð±Ð½Ð¾Ð²Ð»ÐµÐ½Ð¸Ðµ Ð¿Ñ€Ð¸ Ð´Ð¸Ð½Ð°Ð¼Ð¸Ñ‡ÐµÑÐºÐ¾Ð¼ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸
        el.on("refresh", function () {
          el.off(".styler").parent().before(el).remove();
          selectboxOutput();
        });

        // end select

        // reset
      } else if (el.is(":reset")) {
        el.on("click", function () {
          setTimeout(function () {
            el.closest("form").find("input, select").trigger("refresh");
          }, 1);
        });
      } // end reset
    }, // init: function()

    // Ð´ÐµÑÑ‚Ñ€ÑƒÐºÑ‚Ð¾Ñ€
    destroy: function () {
      var el = $(this.element);

      if (el.is(":checkbox") || el.is(":radio")) {
        el.removeData("_" + pluginName)
          .off(".styler refresh")
          .removeAttr("style")
          .parent()
          .before(el)
          .remove();
        el.closest("label")
          .add('label[for="' + el.attr("id") + '"]')
          .off(".styler");
      } else if (el.is('input[type="number"]')) {
        el.removeData("_" + pluginName)
          .off(".styler refresh")
          .closest(".jq-number")
          .before(el)
          .remove();
      } else if (el.is(":file") || el.is("select")) {
        el.removeData("_" + pluginName)
          .off(".styler refresh")
          .removeAttr("style")
          .parent()
          .before(el)
          .remove();
      }
    }, // destroy: function()
  }; // Plugin.prototype

  $.fn[pluginName] = function (options) {
    var args = arguments;
    if (options === undefined || typeof options === "object") {
      this.each(function () {
        if (!$.data(this, "_" + pluginName)) {
          $.data(this, "_" + pluginName, new Plugin(this, options));
        }
      })
        // ÐºÐ¾Ð»Ð±ÐµÐº Ð¿Ð¾ÑÐ»Ðµ Ð²Ñ‹Ð¿Ð¾Ð»Ð½ÐµÐ½Ð¸Ñ Ð¿Ð»Ð°Ð³Ð¸Ð½Ð°
        .promise()
        .done(function () {
          var opt = $(this[0]).data("_" + pluginName);
          if (opt) opt.options.onFormStyled.call();
        });
      return this;
    } else if (
      typeof options === "string" &&
      options[0] !== "_" &&
      options !== "init"
    ) {
      var returns;
      this.each(function () {
        var instance = $.data(this, "_" + pluginName);
        if (
          instance instanceof Plugin &&
          typeof instance[options] === "function"
        ) {
          returns = instance[options].apply(
            instance,
            Array.prototype.slice.call(args, 1)
          );
        }
      });
      return returns !== undefined ? returns : this;
    }
  };

  // Ð¿Ñ€ÑÑ‡ÐµÐ¼ Ð²Ñ‹Ð¿Ð°Ð´Ð°ÑŽÑ‰Ð¸Ð¹ ÑÐ¿Ð¸ÑÐ¾Ðº Ð¿Ñ€Ð¸ ÐºÐ»Ð¸ÐºÐµ Ð·Ð° Ð¿Ñ€ÐµÐ´ÐµÐ»Ð°Ð¼Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð°
  function onDocumentClick(e) {
    // e.target.nodeName != 'OPTION' - Ð´Ð¾Ð±Ð°Ð²Ð»ÐµÐ½Ð¾ Ð´Ð»Ñ Ð¾Ð±Ñ…Ð¾Ð´Ð° Ð±Ð°Ð³Ð° Ð² Opera Ð½Ð° Ð´Ð²Ð¸Ð¶ÐºÐµ Presto
    // (Ð¿Ñ€Ð¸ Ð¸Ð·Ð¼ÐµÐ½ÐµÐ½Ð¸Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð° Ñ ÐºÐ»Ð°Ð²Ð¸Ð°Ñ‚ÑƒÑ€Ñ‹ ÑÑ€Ð°Ð±Ð°Ñ‚Ñ‹Ð²Ð°ÐµÑ‚ ÑÐ¾Ð±Ñ‹Ñ‚Ð¸Ðµ onclick)
    if (
      !$(e.target).parents().hasClass("jq-selectbox") &&
      e.target.nodeName != "OPTION"
    ) {
      if ($("div.jq-selectbox.opened").length) {
        var selectbox = $("div.jq-selectbox.opened"),
          search = $("div.jq-selectbox__search input", selectbox),
          dropdown = $("div.jq-selectbox__dropdown", selectbox),
          opt = selectbox.find("select").data("_" + pluginName).options;

        // ÐºÐ¾Ð»Ð±ÐµÐº Ð¿Ñ€Ð¸ Ð·Ð°ÐºÑ€Ñ‹Ñ‚Ð¸Ð¸ ÑÐµÐ»ÐµÐºÑ‚Ð°
        opt.onSelectClosed.call(selectbox);

        if (search.length) search.val("").keyup();
        dropdown.hide().find("li.sel").addClass("selected");
        selectbox.removeClass("focused opened dropup dropdown");
      }
    }
  }
  onDocumentClick.registered = false;
});
