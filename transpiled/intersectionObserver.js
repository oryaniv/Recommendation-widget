"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var IntersectionObserverService = function () {
    function IntersectionObserverService(observerObject, observableItem) {
        _classCallCheck(this, IntersectionObserverService);

        this._observerObject = observerObject;
        this._observableItem = observableItem;
    }

    _createClass(IntersectionObserverService, [{
        key: "startIntersctionObservation",
        value: function startIntersctionObservation() {
            this._observerObject.observe(this._observableItem);
        }
    }]);

    return IntersectionObserverService;
}();