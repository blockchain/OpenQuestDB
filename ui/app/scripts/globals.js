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
/*globals ace:false */

(function ($) {
    'use strict';

    const queryBatchSize = 1000;
    const MSG_QUERY_EXEC = 'query.in.exec';
    const MSG_QUERY_CANCEL = 'query.in.cancel';
    const MSG_QUERY_RUNNING = 'query.out.running';
    const MSG_QUERY_OK = 'query.out.ok';
    const MSG_QUERY_ERROR = 'query.out.error';
    const MSG_QUERY_DATASET = 'query.out.dataset';
    const MSG_QUERY_FIND_N_EXEC = 'query.build.execute';
    const MSG_ACTIVE_PANEL = 'active.panel';

    function toExportUrl(query) {
        return window.location.protocol + '//' + window.location.host + '/exp?query=' + encodeURIComponent(query);
    }

    function setHeight(element, height) {
        element.css('height', height + 'px');
        element.css('min-height', height + 'px');
    }

    function createEditor(div) {
        const edit = ace.edit(div);
        edit.getSession().setMode('ace/mode/questdb');
        edit.setTheme('ace/theme/merbivore_soft');
        edit.setShowPrintMargin(false);
        edit.setDisplayIndentGuides(false);
        edit.setHighlightActiveLine(false);
        edit.$blockScrolling = Infinity;

        $(window).on('resize', function () {
            edit.resize();
        });

        return edit;
    }

    $.extend(true, window, {
        qdb: {
            queryBatchSize,
            MSG_QUERY_EXEC,
            MSG_QUERY_CANCEL,
            MSG_QUERY_RUNNING,
            MSG_QUERY_OK,
            MSG_QUERY_ERROR,
            MSG_QUERY_DATASET,
            MSG_ACTIVE_PANEL,
            MSG_QUERY_FIND_N_EXEC,
            toExportUrl,
            setHeight,
            createEditor
        }
    });
}(jQuery));
