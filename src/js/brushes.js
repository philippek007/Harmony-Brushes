/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
/*
manager_set = false;
if (window.location.hash) {
    hash = window.location.hash.substr(1, window.location.hash.length);
    for (i = 0; i < STYLES.length; i++) {
        if (hash == STYLES[i]) {
            strokeManager.setStyle(STYLES[i]);
            menu.selector.selectedIndex = i;
            manager_set = true;
            break
        }
    }
}
if (!manager_set) {
    strokeManager.setStyle(STYLES[0]);
}

about = new About();
container.appendChild(about.container);
*/

brushes = ["sketchy", "shaded", "chrome", "fur", "longfur", "web",
    "simple", "squares", "ribbon", "circles", "grid", "stringy",
    "curvy"];
importDirectory(brushes, "brushes");

function Brushes() {
    this.init();
}
Brushes.prototype = {
    init: function () {
        setUpPod("Brushes");

        $('#brushesPod').click(function() {
            $(this).hide();
            $('#brushes').dialog('open');
        });

        // set up brushes panel
        $("body").append('<div class="panel" id="brushes" title="Brushes"> \
            brush selector. overflow \
            </div>');

        $("#brushes button").button();

        $("#brushes").dialog({
           closeOnEscape: false, resizable: false, width: 230, autoOpen: false
        });

        $("#brushes").dialog( "option", "position", "left" );
        $("#brushes").bind( "dialogclose", function(event, ui) { $("#brushesPod").show();} );
    },
    destroy: function () {}
}

function onMenuSelectorChange(e) {
    if (STYLES[menu.selector.selectedIndex] == "") {
        return
    }
    strokeManager.destroy(); // XXX: is this needed?
    strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
    window.location.hash = STYLES[menu.selector.selectedIndex]
}