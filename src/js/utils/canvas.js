/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function ProxyCanvas(canvasId) {
    this.init(canvasId);
}
ProxyCanvas.prototype = {
    init: function (canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.context = this.canvas.getContext("2d");

        this.width = this.canvas.width;
        this.height = this.canvas.height;
    },
    destroy: function () {},
    saveAs: function (format) {
        // note that this spawns a save dialog!

        if(format == 'png') {
            Canvas2Image.saveAsPNG(this.canvas);
        }

        if(format == 'jpeg' || format == 'jpg') {
            Canvas2Image.saveAsJPEG(this.canvas);
        }

        if(format == 'bmp') {
            Canvas2Image.saveAsBMP(this.canvas);
        }
    },
    fill: function (colorName) {
        this.context.fillStyle = colorName;
        this.context.fillRect(0, 0, this.canvas.width, this.canvas.height);
    },
    text: function (label, colorName, font, x, y) {
        this.context.fillStyle = colorName;
        this.context.font = font;
        this.context.fillText(label, x, y);
    },
    stroke: function (startLoc, endLoc, color, alpha) {
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.moveTo(startLoc.x, startLoc.y);
        this.context.lineTo(endLoc.x, endLoc.y);
        this.context.stroke();
    },
    rect: function (xy1, xy2, xy3, xy4, color, alpha) {
        this.context.fillStyle = "rgb(255, 255, 255)"; // XXX: replace with fillColor
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.moveTo(xy1.x, xy1.y);
        this.context.lineTo(xy2.x, xy2.y);
        this.context.lineTo(xy3.x, xy3.y);
        this.context.lineTo(xy4.x, xy4.y);
        this.context.lineTo(xy1.x, xy1.y);
        this.context.fill();
        this.context.stroke();
    },
    bezierCurve: function (begin, cp1, cp2, end, color, alpha) {
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.moveTo(begin.x, begin.y);
        this.context.bezierCurveTo(cp1.x, cp1.y, cp2.x, cp2.y, end.x, end.y);
        this.context.stroke();
    },
    quadraticCurve: function (begin, cp, end, color, alpha) {
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.moveTo(begin.x, begin.y);
        this.context.quadraticCurveTo(cp.x, cp.y, end.x, end.y);
        this.context.stroke();
    },
    circle: function (center, radius, color, alpha) {
        this.context.strokeStyle = "rgba(" + color[0] + ", " + color[1] +
            ", " + color[2] + ", " + alpha + ")";
        this.context.beginPath();
        this.context.arc(center.x, center.y, radius, 0, Math.PI * 2, true);
        this.context.stroke()
    },
    getPointsInside: function (radius, location) {
        points = panels['canvas'].points;
        ret = [];

        for (var i = 0; i < points.length; i++) {
            point = points[i];

            if( Math.pow((location.x - point.x), 2) +
                    Math.pow((location.y - point.y), 2) <
                    Math.pow(radius, 2) ) {
                ret.push(point);
            }
        }

        return ret;
    }
}