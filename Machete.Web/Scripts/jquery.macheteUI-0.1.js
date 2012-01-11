/*
* File:        jquery.macheteUI
* Version:     0.1
* Description: 
* Author:      
* Created:     
* Language:    
* License:     
* Project:     
* Contact:     
* 
* Copyright 2011 Savage Learning, LLC., all rights reserved.
*
* This source file is free software, under either the GPL v2 license or a
* BSD style license, as supplied with this software.
* 
* This source file is distributed in the hope that it will be useful, but 
* WITHOUT ANY WARRANTY; without even the implied warranty of MERCHANTABILITY 
* or FITNESS FOR A PARTICULAR PURPOSE. See the license files for details.
* 
* For details please refer to:
*/
(function ($, window, document) {

    var mUI = {
        state: {
            changed: function (level) {
                for (chglvl in mUI.state.changeLevel) {
                    if (level <= chglvl) {
                        if (mUI.state.changeLevel[chglvl]) return true;
                    }
                }
                return false;
            },
            whatChanged: {},
            changeLevel: {}
            //            whatChanged: {
            //                employer: null,
            //                order: null,
            //                assignment: null
            //            }
        }
    };
    var methods = {
        init: function (options) {
            // THIS
        },
        //
        //
        //
        createTabs: function (opt) {
            var tabdiv = this;
            //
            // create jQuery tabs with mUI handlers
            var confirmed = false;
            //
            var level = _checkFormLevel(opt.formLevel, "createTabs"); // Error if form level not set correctly
            //
            $(tabdiv).tabs({
                // defaults
                selected: opt.defaultTab || 0,
                idPrefix: opt.prefix || "PREFIX",
                //template to put the ui-icon-close in the tab
                tabTemplate: "<li><a href='#{href}'>#{label}</a> <span class='ui-icon ui-icon-close'>Remove Tab</span></li>",
                //
                //http://forum.jquery.com/topic/ajaxoptions-is-null-problem
                ajaxOptions: {
                    error: function (xhr, status, index, anchor) {
                        $(anchor.hash).html("Couldn't load this tab.");
                    },
                    data: {},
                    success: function (data, textStatus) { }
                },
                //
                // jquery.tabs() select event

                select: function (e, ui) {
                    console.log('select event: changeLevel:' + level +
                                ' state:' + mUI.state.changeLevel[level] + 
                                ' confirmed: ' + confirmed);
                    //
                    //
                    if (mUI.state.changed(level)) {
                        if (!confirmed) {
                            jConfirm('confirm', 'title', function (r) {
                                if (r == true) {
                                    console.log('confirm ok--changed: ' + mUI.state.changed + ', confirmed: ' + confirmed);
                                    confirmed = true;
                                    $(ui.tab).click();
                                }
                            });
                            e.stopImmediatePropagation();
                            return false;
                        } else {
                            // if confirmed==true, then ignore changed bit
                            mUI.state.changeLevel[level] = false;
                            confirmed = false;
                        }
                    }
                    //
                    //if ListTab selected, redraw dataTable
                    if ($(ui.tab).hasClass('ListTab')) {
                        $(ui.panel).find('.display').dataTable().fnDraw();
                    }
                },
                //
                // jquery.tabs() load event (This event doesn't happen for the list tab)
                load: function (event, ui) {
                    //$(ui.panel).fadeIn();
                    mUI.state.changeLevel[level] = false;
                    console.log('tab-load--changed: ' + mUI.state.changed() + ', confirmed: ' + confirmed);
                },
                //
                // jquery.tabs() show event
                show: function (event, ui) {
                    //if ($(ui.tab).hasClass('ListTab')
                    //        || $(ui.tab).hasClass('GeneralTab')) {
                    //    $(ui.panel).fadeIn();
                    //}
                },
                //
                // jquery.tabs() remove event (This event doesn't happen for the list tab)
                remove: function (event) { }
            });
            //
            // close tab event
            $(tabdiv).find("span.ui-icon-close").live("click", function (e) {
                var trgTabnav = $(e.target).closest('.ui-tabs');
                var index = trgTabnav.children('.ui-tabs-nav').index($(this).parent());
                trgTabnav.tabs("remove", index);
                trgTabnav.tabs("select", 0);            //select list tab
            });
        },
        //
        // Change Work Order's employer, doubleclick event
        //
        selectEmployerDblClick: function (content) {
            //
            this.dblclick(function (event) {
                var myTr = event.target.parentNode;
                var myID = $(myTr).attr('recordid');
                var orderText = $('li.WO.ui-tabs-selected a').text();
                var employerText = 'EID #: ' + myID + ', ' + $(myTr).find('td:eq(1)').text() + ' @ ' + $(myTr).find('td:eq(2)').text();
                var idPrefix = $('#employerSelectTable').attr('idprefix');
                $.alerts.okButton = content.okButton;
                jConfirm(content.message,
                    content.title + '[' + orderText + '] TO [' + employerText + ']',
                    function (r) {
                        if (r == true) {
                            //
                            // action for doubleclick
                            $('#' + idPrefix + 'EmployerID').val(myID);
                            $('a.ui-dialog-titlebar-close').click();
                            $('#' + idPrefix + 'SaveBtn').submit();
                            $('#' + idPrefix + 'CloseBtn').click();
                            event.preventDefault();
                        }
                    }
                );
                event.preventDefault();
            });
        },
        //
        //  waFormConfiguration: Assignment Create/Edit form configuration
        //
        waFormConfiguration: function () {
            var waForm = this;
            var hrWage = $(waForm).find('#hourlyWage');
            var skillID = $(waForm).find('#skillID');
            var hours = $(waForm).find('#hours');
            //
            // Increment tabindex by 20 to offset for employers(0) and orders (10)
            $(waForm).find('[tabindex]').each(function () {
                $(this).attr('tabindex', parseInt($(this).attr('tabindex')) + 20)
            });
            //
            // Run only if hourly wage is 0
            // don't want to override a custom hourly wage on edit
            if ($(hrWage).text() == "0") {
                // update earnings info based on skill
                parseSkillsDD(waForm);
            }
            // show total estimated earnings for assignment
            waEstimateEarnings(waForm);
            _waFilterHourRange(waForm);
            // presets for skill dropdown
            $(skillID).bind('change', function () { parseSkillsDD(waForm); });
            // presets for min/max hour dropdowns
            $(hours).bind('change', function () { _waFilterHourRange(waForm); });
            // if money fields change, recalc total
            $(waForm).find('.earnings-part').bind('change', function () {
                waEstimateEarnings(waForm);
            });
        },
        //
        //
        formSubmit: function (opt) {
            var form = this;
            var parentTab = $(form).closest('.ui-tabs');
            var selList = opt.selectList || 0;
            var create = opt.create || null;
            var recType = opt.recType || null;
            var exclusiveTab = opt.exclusiveTab || true;
            var preProcess = opt.preProcess || null;
            var postProcess = opt.postProcess | null;
            var closeTab = opt.closTab || undefined;
            var level = _checkFormLevel(opt.formLevel, "formSubmit"); // Error if form level not set correctly
            //
            //setup button.click to secondary submit
            //  workorder/edit/activate.btn
            if (opt.clickButton) {
                opt.clickButton.click(function () {
                    form.submit();
                });
            }
            form.submit(function (e) {
                //
                e.preventDefault();
                //
                if (preProcess) { preProcess(); }
                //
                // overiding form behavior after instantiation
                // used with duplicate work assignment submit
                if (form.data("selList") != undefined) { selList = form.data("selList"); }
                if (form.data("exclusiveTab") != undefined) { exclusiveTab = form.data("exclusiveTab"); }
                if (form.data("create") != undefined) { create = form.data("create"); }
                //
                //
                if ($(form).valid()) {
                    //
                    // post create form, open tab for new records
                    if (create) {
                        //
                        // post create form, open tab for new records
                        $.post($(form).attr("action"), $(form).serialize(),
                        function (data) {
                            add_rectab({
                                tabref: data.sNewRef,
                                label: data.sNewLabel,
                                tab: parentTab,
                                exclusive: exclusiveTab,
                                recordID: data.iNewID,
                                recType: recType
                            });
                        });
                    }
                    else {
                        $.post($(form).attr("action"), $(form).serialize());
                    }
                    //
                    // clear changed bit for current form level
                    // clear changed bit for levels downstream
                    for (chglvl in mUI.state.changeLevel) {
                        if (level <= chglvl) {
                            mUI.state.changeLevel[chglvl] = false;
                            console.log("formSubmit: changeLevel[" + chglvl + "]: false");
                        }
                    }
                    //
                    //
                    if (closeTab) {
                        var oTabs = $(form).closest('.ui-tabs').children('.ui-tabs-nav');
                        $(oTabs).find('.ui-state-active').find('span.ui-icon-close').click();
                    }
                    //
                    // Tab behavior after save. change tab or no...
                    if (selList >= 0) {
                        $(parentTab).tabs("select", selList);
                    }
                }
            });
            //TODO: javascript...need to deal with ajax error
        },
        //
        //
        formClickDuplicate: function (opt) {
            var btn = this;
            var editForm = opt.editForm || Error("No edit form to submit");
            var dupForm = opt.dupForm || Error("No duplicate form to submit");
            btn.click(function (e) {
                editForm.data("selList", -1);
                editForm.data("create", null);
                editForm.submit();
                // duplicate the current edit
                dupForm.data("selList", -1);
                dupForm.data("exclusiveTab", false);
                dupForm.submit();
            });
        },
        //
        //
        formClickDelete: function (opt) {
            var btn = this;
            var ok = opt.ok || "OK?!";
            var confirm = opt.confirm || "CONFIRM?!";
            var title = opt.title || "TITLE?!";
            var form = opt.form || Error("No employer Delete Form defined");
            _submitAndCloseTab(form); //setup ajax submit action
            btn.click(function (e) {
                $.alerts.okButton = ok;
                jConfirm(confirm,
                         title,
                         function (r) {
                             if (r == true) {
                                 //alert("delete submitted");
                                 form.submit();
                             }
                         }
                 );
            });

        },
        //
        //
        formDetectChanges: function (opt) {
            var form = this;
            var level = _checkFormLevel(opt.formLevel, "formDetectChanges"); // Error if form level not set correctly
            console.log('formDetectChanges load--changed: ' + mUI.state.changed());
            var recType = opt.recType || Error('formDetectChanges must have a recType');
            //
            // fires when changed AND focus moves away from element
            $(form).find('input[type="text"], select, textarea').bind('change', function (e) {                
                //
                //
                var changedTab = $(e.target).closest('.ui-tabs').children('.ui-tabs-nav').find('.ui-tabs-selected');
                mUI.state.changeLevel[level] = true;
                mUI.state.whatChanged[recType] = changedTab;
                console.log('change event--changed: ' + mUI.state.changed(level) + ', target: ' + e.target.id);
            });
        },
        //
        //
        selectToggleOnValue: function (opt) {
            var select = this;
            var showVal = opt.showVal || "yes";
            var target = opt.target || Error("SelectToggleOnValue not given a target to toggle.");
            var init = opt.init || null;
            //
            //
            $(select).bind('change', function () {
                toggleDropDown(select, showVal, target);
            });
            toggleDropDown(select, showVal, target);
        }

    };

    $.fn.mUI = function (method) {

        // Method calling logic
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || !method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' + method + ' does not exist on jQuery.mUI');
        }

    };

    ////////////////////////////////////////////
    //
    // machete js internal functions
    //

    //
    //
    function toggleDropDown(select, showVal, target) {
        //
        if ($(select).find(':selected').text() == showVal) {
            $(target).show();
        } else {
            $(target).hide();
        }
    }
    //
    //  parse skills drop down
    //  for the create/edit assignment page. 
    //  bound to change event
    //
    function parseSkillsDD(myForm) {
        var myDD = $(myForm).find('#skillID');
        var myWage = $(myForm).find('#hourlyWage');
        var myHour = $(myForm).find('#hours');
        var myRange = $(myForm).find('#hourRange');
        //
        var myOption = $(myDD).find('option:selected');
        //
        // If custom attributes exist in skill dropdown selected, change fields
        //
        if ($(myOption).attr('wage') != null) { $(myWage).val($(myOption).attr('wage')); }
        if ($(myOption).attr('minHour') != null) { $(myHour).val($(myOption).attr('minHour')); }
        if ($(myOption).attr('fixedjob') == "True") { //Disable wage and hours on fixed job
            $(myWage).attr('disabled', 'disabled');
            $(myHour).attr('disabled', 'disabled');
            $(myRange).attr('disabled', 'disabled');
            $(waForm).find('#hourRange option[value=""]').attr("selected", "selected").show();
        } else {
            $(myWage).removeAttr('disabled', 'disabled');
            $(myHour).removeAttr('disabled', 'disabled');
            $(myRange).removeAttr('disabled', 'disabled');
        }
        waEstimateEarnings(myForm);
    }
    //
    //
    //
    function waEstimateEarnings(waForm) {
        var myWage = $(waForm).find('#hourlyWage').val();
        var myHours = $(waForm).find('#hours').find('option:selected').val();
        var myEarnings = $(waForm).find('#total');
        var myRangeEarnings = $(waForm).find('#totalRange');
        var myRange = $(waForm).find('#hourRange').val();
        $(myEarnings).attr('disabled', 'disabled');
        $(myRangeEarnings).attr('disabled', 'disabled');
        var myDays = $(waForm).find('#days').find('option:selected').val();
        if (isNumber(myDays) &&
        isNumber(myHours) &&
        isNumber(myWage)) {
            var total = myDays * myHours * myWage;

            $(myEarnings).val("$" + total.toFixed(2));
            if (isNumber(myRange)) {
                var range = myDays * myRange * myWage;
                $(myRangeEarnings).val("$" + range.toFixed(2));
            }
        } else {
            $(myEarnings).val("@(Machete.Web.Resources.Shared.notcalculable)");
            $(myRange).val("@(Machete.Web.Resources.Shared.notcalculable)");
        }
    }
    //
    //
    //
    function _waFilterHourRange(waForm) {
        var myHours = $(waForm).find('#hours');
        var hour = $(myHours).val();
        var range = $(waForm).find('#hourRange').val();
        $(waForm).find('#hourRange option').each(function () {
            var entry = this;
            var entryval = $(this).val();
            if (Number(entryval) <= Number(hour)) {
                $(entry).hide();
            }
            else {
                $(entry).show();
            }

        });
        if (Number(hour) >= Number(range)) {
            $(waForm).find('#hourRange option[value=""]').attr("selected", "selected").show();
            $(waForm).find('#totalRange').val("");
        }
    }
    //
    //
    //
    function _submitAndCloseTab(form) {
        form.submit(function (e) {
            e.preventDefault();
            $.post($(this).attr("action"), $(this).serialize());
            //
            //trigger close even
            var tabNav = $(e.target).closest('.ui-tabs').children('.ui-tabs-nav');
            $(tabNav).find('.ui-state-active').find('span.ui-icon-close').click();
        });
    }
    function _checkFormLevel(level, caller) {
        if (level === null || level === undefined || level < 1) {
            throw new Error(caller + ": formLevel not correctly defined, formlevel: " + level);
        }
        console.log(caller + ": formLevel: " + level);
        return level;
    }
})(jQuery, window, document);