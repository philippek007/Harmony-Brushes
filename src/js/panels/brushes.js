/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function brushes() {
    this.init();
}
brushes.prototype = {
    init: function () {
        setUpPod("Brushes");

        $('#brushesPod').click(function() {
            $(this).hide();
            $('#brushesCheckbox').attr('checked', false);
            $('#brushesPanel').dialog('open');
        });

        // set up brushes panel
        $("body").append('<div class="panel" id="brushesPanel" title="Brushes"> \
                <div id="brushes" style="height:170px;overflow:auto;"></div> \
            </div>');

        for (i = 0; i < BRUSHES.length; i++) {
            brushName = BRUSHES[i];
            brushId = brushName; //XXX: use + 'Brush'; to avoid id clashes!

            $("#brushes").append('<canvas class="brush" id="' + brushId + '"' +
                ' style="height:4em;width:188px"' +  '></canvas>');

            this.renderBrushPreview(brushId);

            $('#' + brushId).click(function() {
                panels['brushes'].selected = $(this).attr('id');
            });
        }

        this.selected = BRUSHES[0];

        $("#brushesPanel").dialog({
           closeOnEscape: false, resizable: false, width: 230, height: 300,
           autoOpen: false
        });

        $("#brushesPanel").dialog( "option", "position", "left" );
        $("#brushesPanel").bind( "dialogclose", function(event, ui) {$("#brushesPod").show();} );
    },
    destroy: function () {},
    renderBrushPreview: function (brushId) {
        brushCanvas = new ProxyCanvas(brushId);
        brushCanvas.fill('white');

        brushCanvas.text(brushId, 'black', '64px sans-serif', 10,
            brushCanvas.height / 2);

        brush = eval("new " + brushName + "()");

        color = [1.0, 1.0, 1.0] // XXX: temp hack
        painter = new Painter(brushCanvas, brush, color);

        canvasWidth = brushCanvas.width;
        pad = 10;
        y = brushCanvas.height / 2; // XXX: get this via sine + scale to fit + pad

        for (x = pad; x < canvasWidth - pad; x+=10) {
            painter.paint(x, y);
        }
    }
}

function onMenuSelectorChange(e) {
    if (STYLES[menu.selector.selectedIndex] == "") {
        return
    }
    strokeManager.destroy(); // XXX: is this needed?
    strokeManager.setStyle(STYLES[menu.selector.selectedIndex]);
    window.location.hash = STYLES[menu.selector.selectedIndex]
}
