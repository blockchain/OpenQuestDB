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

/*globals jQuery:false */
/*globals qdb:false */
/*globals Clipboard:false */

(function ($) {
    'use strict';

    const divSqlPanel = $('.js-sql-panel');
    const divExportUrl = $('.js-export-url');
    const editor = $('#editor');
    const sqlEditor = $('#sqlEditor');
    const consoleTop = $('#console-top');
    const wrapper = $('#page-wrapper');
    const msgPanel = editor.find('.js-query-message-panel');
    const navbar = $('nav.navbar-default');
    const win = $(window);

    let topHeight = 350;
    const bottomHeight = 350;
    let visible = false;

    function resize() {
        if (visible) {
            const navbarHeight = navbar.height();
            const wrapperHeight = wrapper.height();
            const msgPanelHeight = msgPanel.height();
            let h;

            if (navbarHeight > wrapperHeight) {
                h = navbarHeight;
            }

            if (navbarHeight < wrapperHeight) {
                h = win.height();
            }

            if (h) {
                if (h < topHeight + bottomHeight) {
                    h = topHeight + bottomHeight;
                }
                // qdb.setHeight(wrapper, h - 1);
            }

            qdb.setHeight(consoleTop, topHeight);
            qdb.setHeight(editor, topHeight);
            qdb.setHeight(sqlEditor, topHeight - msgPanelHeight - 60);
        }
    }

    function switchToGrid() {
        // $('#editor').show();
        $('#js-toggle-chart').removeClass('active');
        $('#js-toggle-grid').addClass('active');
    }

    function loadSplitterPosition() {
        if (typeof (Storage) !== 'undefined') {
            const n = localStorage.getItem('splitter.position');
            if (n) {
                topHeight = parseInt(n);
            }
        }
    }

    function saveSplitterPosition() {
        if (typeof (Storage) !== 'undefined') {
            localStorage.setItem('splitter.position', topHeight);
        }
    }

    function toggleVisibility(x, name) {
        if (name === 'console') {
            visible = true;
            divSqlPanel.show();
        } else {
            visible = false;
            divSqlPanel.hide();
        }
    }


    function setup(bus) {
        win.bind('resize', resize);
        bus.on(qdb.MSG_QUERY_DATASET, function (e, m) {
            divExportUrl.val(qdb.toExportUrl(m.query));
        });

        divExportUrl.click(function () {
            this.select();
        });

        /* eslint-disable no-new */
        new Clipboard('.js-export-copy-url');
        $('.js-query-refresh').click(function () {
            bus.trigger('grid.refresh');
        });

        // named splitter
        bus.on('splitter.console.resize', function (x, e) {
            topHeight += e;
            win.trigger('resize');
            bus.trigger('preferences.save');
        });

        bus.on('preferences.save', saveSplitterPosition);
        bus.on('preferences.load', loadSplitterPosition);
        bus.on(qdb.MSG_ACTIVE_PANEL, toggleVisibility);

        bus.query();
        bus.domController();

        sqlEditor.editor(bus);

        $('#grid').grid(bus);
        $('#console-splitter').splitter(bus, 'console', 200, 0);

        switchToGrid();

        // wire query publish
        $('#js-toggle-chart').click(function () {
            bus.trigger('query.publish');
        });
    }

    $.extend(true, window, {
        qdb: {
            setupConsoleController: setup,
            switchToGrid
        }
    });
}(jQuery));
