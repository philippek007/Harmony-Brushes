/* Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 * Copyright (c) 2010 Mr.doob, rhyolight, bebraw
 */
function projection() {
    this.init();
}
projection.prototype = {
    init: function () {
        PROJECTIONOVERLAYCOLOR = new RGBColor(PROJECTIONOVERLAYCOLOR);
        DISABLEDTARGETCOLOR = new RGBColor(DISABLEDTARGETCOLOR);

        this._initProjectors();
        this._initHotkeys(); // TODO!

        this.targetValue = new Point();
    },
    _initProjectors: function () {
        this.projectors = {};

        for (var i = 0; i < PROJECTORS.length; i++) {
            var projectorName = PROJECTORS[i];

            if( 'init' in projectors[projectorName] ) {
                this.projectors[projectorName] = projectors[projectorName].init();
            }
            else {
                this.projectors[projectorName] = projectors[projectorName];
            }

            var projector = this.projectors[projectorName];

            projector.isActive = false;

            var possibleMethods = ['apply', 'onPress', 'onRelease', 'onDown'];
            for (var j = 0; j < possibleMethods.length; j++) {
                var possibleMethod = possibleMethods[j];
                
                if( !(possibleMethod in this.projectors[projectorName]) ) {
                    projector[possibleMethod] = function() {};
                }
            }
        }
    },
    initInitialValues: function (point) {
        this.initialValue = point;
    },
    _initHotkeys: function () {
        var proj = this;

        function init(projectorName, projector) {
            if( projectorName in HOTKEYS.projection ) {
                var hotkey = HOTKEYS.projection[projectorName];

                shortcut.add(hotkey, function(e) {
                    if( !projector.isActive ) {
                        projector.isActive = true;

                        proj.initialValue = mouseLocation;

                        projector.onPress(proj.initialValue, proj.targetValue,
                            proj.projectors);

                        moveCallbacks[projectorName] = projector;

                        projector.onDown(proj.initialValue);
                    }
                });

                shortcut.add(hotkey, function(e) {
                    projector.isActive = false;

                    projector.onRelease();

                    delete moveCallbacks[projectorName];
                }, {'type': 'keyup'});
            }
        }

        for (var projectorName in this.projectors) {
            var projector = this.projectors[projectorName];

            init(projectorName, projector);
        }
    },
    apply: function ( point ) {
        for (var projectorName in this.projectors) {
            var projector = this.projectors[projectorName];

            if( projector.isActive ) {
                // note that only one projector may be active at a time!
                return projector.apply(point, this.initialValue,
                    this.targetValue, this.projectors);
            }
        }

        return point;
    }
}
