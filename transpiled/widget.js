"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Widget = function () {
    function Widget(articleFactory, httpService, intersectionObserverService, anchorElement, articleListElement, iframeElement, errorLabel, loader) {
        _classCallCheck(this, Widget);

        this._articleFactory = articleFactory;
        this._httpService = httpService;
        this._intersectionObserverService = intersectionObserverService;
        this._anchorElement = anchorElement;
        this._articleListElement = articleListElement;
        this._iframeElement = iframeElement;
        this._errorLabel = errorLabel;
        this._loader = loader;
    }

    _createClass(Widget, [{
        key: "start",
        value: function start() {
            var _this = this;

            this._intersectionObserverService.startIntersctionObservation();
            this._anchorElement.addEventListener('click', function () {
                _this.get();
            });
        }
    }, {
        key: "get",
        value: function get() {
            var _this2 = this;

            this._loader.style.display = "block";
            this._httpService.get().then(function (response) {
                _this2._errorLabel.style.display = "none";
                var json = JSON.parse(response);
                _this2.handleContent(json);
            }).catch(function () {
                _this2._errorLabel.style.display = "block";
                _this2._loader.style.display = "none";
            });
        }
    }, {
        key: "handleContent",
        value: function handleContent(response) {
            var _this3 = this;

            var articleArray = this.createArticleArray(response.list);
            articleArray.forEach(function (x) {
                return _this3.addArticle(x.getHtml());
            });
            this.resetWidgetSize();
        }
    }, {
        key: "createArticleArray",
        value: function createArticleArray(list) {
            var _this4 = this;

            var itemArrayData = list.map(function (item) {
                return {
                    caption: item.name,
                    thumbnail: item.thumbnail[0].url,
                    targetUrl: item.url,
                    branding: item.branding,
                    type: item.origin
                };
            });
            var articels = itemArrayData.map(function (i) {
                return _this4._articleFactory.getItem(i.type, i);
            });
            return articels;
        }
    }, {
        key: "addArticle",
        value: function addArticle(articleItemHtml) {
            var newListItem = document.createElement('li');
            newListItem.classList.add('list-item');
            newListItem.innerHTML = articleItemHtml;
            this._articleListElement.appendChild(newListItem);
        }
    }, {
        key: "resetWidgetSize",
        value: function resetWidgetSize() {
            this._iframeElement.height = this._iframeElement.contentWindow.document.body.scrollHeight;
        }
    }]);

    return Widget;
}();