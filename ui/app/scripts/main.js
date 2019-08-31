/*******************************************************************************
 *    ___                  _   ____  ____
 *   / _ \ _   _  ___  ___| |_|  _ \| __ )
 *  | | | | | | |/ _ \/ __| __| | | |  _ \
 *  | |_| | |_| |  __/\__ \ |_| |_| | |_) |
 *   \__\_\\__,_|\___||___/\__|____/|____/
 *
 * Copyright (C) 2014-2019 Appsicle
 *
 * This program is free software: you can redistribute it and/or  modify
 * it under the terms of the GNU Affero General Public License, version 3,
 * as published by the Free Software Foundation.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 *
 ******************************************************************************/

/*globals $:false */
/*globals qdb:false */
/*globals jQuery:false */


(function ($) {
    'use strict';

    let messageBus;
    const menuItems = $('#side-menu').find('a');

    function switchTo(name, index) {
        messageBus.trigger(qdb.MSG_ACTIVE_PANEL, name);
        const n = menuItems.length;
        for (let i = 0; i < n; i++) {
            if (i === index) {
                menuItems[i].setAttribute('class', 'selected');
            } else {
                menuItems[i].setAttribute('class', '');
            }
        }
    }

    function switchToConsole() {
        switchTo('console', 0);
    }

    function switchToVis() {
        switchTo('visualisation', 1);
    }

    function switchToImport() {
        switchTo('import', 2);
    }

    function setup(b) {
        messageBus = b;
        $('#side-menu').metisMenu();
        $('a#nav-console').click(switchToConsole);
        $('a#nav-import').click(switchToImport);
        $('a#nav-visualisation').click(switchToVis);
        b.on(qdb.MSG_QUERY_FIND_N_EXEC, switchToConsole);
    }

    $.extend(true, window, {
        qdb: {
            setup,
            switchToConsole
        }
    });

}(jQuery));

let bus;

$(document).ready(function () {
    'use strict';
    bus = $({});

    qdb.setup(bus);
    qdb.setupConsoleController(bus);
    qdb.setupImportController(bus);
    qdb.setupVisualisationController(bus);
    qdb.switchToConsole();
    bus.trigger('preferences.load');
});

$(window).load(function () {
    'use strict';
    $(window).trigger('resize');
    bus.trigger('editor.focus');
});
