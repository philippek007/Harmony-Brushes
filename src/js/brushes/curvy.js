/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function curvy() {
    this.init();
}
curvy.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity, points) {
        var START = 30,
            CTL_PNT1_DIST = 10,
            CTL_PNT2_DIST = 20;

        canvas.stroke(cursor.previous, cursor.current, color, opacity);
        
        function getPoint(xAgo, pnts) {
            var index = pnts.length - xAgo, i;
            for (i=index; i< pnts.length; i++) {
                if (pnts[i]) {
                    return pnts[i];
                }
            }
        }

        start = getPoint(START, points);
        cOne = getPoint(CTL_PNT1_DIST, points);
        cTwo = getPoint(CTL_PNT2_DIST, points);
        canvas.bezierCurve(start, cOne, cTwo, cursor.current, color, 0.15);
    }
};
