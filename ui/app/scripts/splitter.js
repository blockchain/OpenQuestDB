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

(function ($) {
    'use strict';
    $.fn.splitter = function (msgBus, pName, pMinTop, pMinBottom) {
        const bus = $(msgBus);
        const div = $(this);
        const busMsgName = 'splitter.' + pName + '.resize';
        let ghost;
        let start;
        let end;
        let styleMain;
        const minTop = pMinTop;
        const minBottom = pMinBottom;

        function drag(e) {
            e.preventDefault();
            if (e.pageY > minTop && e.pageY < ((window.innerHeight + $(window).scrollTop()) - minBottom)) {
                end = e.pageY;
                ghost[0].style = styleMain + 'top: ' + e.pageY + 'px;';
            }
        }

        function endDrag() {
            $(document).off('mousemove', drag);
            $(document).off('mouseup', endDrag);
            ghost[0].style = 'display: none';
            div.removeClass('qs-dragging');
            bus.trigger(busMsgName, (end - start));
        }

        function beginDrag() {
            const rect = div[0].getBoundingClientRect();
            start = rect.top + $(window).scrollTop();
            styleMain = 'position: absolute; left: ' + rect.left + 'px; width: ' + rect.width + 'px; height: ' + rect.height + 'px;';
            if (!ghost) {
                ghost = $('<div class="qs-ghost"></div>');
                ghost.appendTo('body');
            }
            ghost[0].style = styleMain + 'top: ' + start + 'px;';
            div.addClass('qs-dragging');
            $(document).mousemove(drag);
            $(document).mouseup(endDrag);
        }

        $(this).mousedown(beginDrag);
    };
}(jQuery));
