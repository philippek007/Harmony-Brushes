/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function chrome() {
    this.init()
}
chrome.prototype = {
    init: function () {},
    destroy: function () {},
    stroke: function (canvas, cursor, color, opacity, points) {
        canvas.stroke(cursor.previous, cursor.current, color, opacity);

        for (var i = 0; i < points.length; i++) {
            sub = points[i].sub(cursor.current);
            g = sub.toDist();

            if (g < 1000) {
                fac = 0.2;
                begin = cursor.current.add(sub.mul(fac));
                end = points[i].sub(sub.mul(fac));

                randomRGB = [Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255),
                    Math.floor(Math.random() * 255)];

                canvas.stroke(begin, end, randomRGB, 0.1);
            }
        }
    }
};
