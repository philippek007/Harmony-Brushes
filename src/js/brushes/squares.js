/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
brushes.squares = {
    stroke: function (canvas, points, color, opacity)  {
        var b, a, g, e, c;
        b = points.current.x - points.previous.x;
        a = points.current.y - points.previous.y;
        g = Math.PI / 2;
        e = Math.cos(g) * b - Math.sin(g) * a;
        c = Math.sin(g) * b + Math.cos(g) * a;

        var firstCorner = new Point(points.previous.x - e,
            points.previous.y - c);
        var secondCorner = new Point(points.previous.x + e,
            points.previous.y + c);
        var thirdCorner = new Point(points.current.x + e,
            points.current.y + c);
        var fourthCorner = new Point(points.current.x - e,
            points.current.y - c);

        canvas.rect(firstCorner, secondCorner, thirdCorner, fourthCorner,
            color, opacity);
    }
};
