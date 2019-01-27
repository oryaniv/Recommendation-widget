'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var HttpService = function () {
    function HttpService(httpParams) {
        _classCallCheck(this, HttpService);

        var apiUrl = httpParams.apiUrl,
            action = httpParams.action,
            publisher_id = httpParams.publisher_id,
            appType = httpParams.appType,
            apiKey = httpParams.apiKey,
            sourceId = httpParams.sourceId,
            count = httpParams.count,
            sourceType = httpParams.sourceType,
            sourceUrl = httpParams.sourceUrl;
        // pass all of these from outside, oyRecommend object or something

        this._apiUrl = apiUrl;
        this._action = action;
        this._publisher_id = publisher_id;
        this._appType = appType;
        this._apiKey = apiKey;
        this._sourceId = sourceId;
        this._count = count;
        this._sourceType = sourceType;
        this._sourceUrl = sourceUrl;
    }

    _createClass(HttpService, [{
        key: 'get',
        value: function get() {
            var url = this._apiUrl + '/' + this._publisher_id + '/' + this._action + '?' + 'app.type=' + this._appType + '&app.apikey=' + this._apiKey + '&count=' + this._count + '&source.type=' + this._sourceType + '&source.id=' + this._sourceId + '&source.url=' + this._sourceUrl;
            return this.sendXhr(url);
        }
    }, {
        key: 'sendXhr',
        value: function sendXhr(url) {
            return new Promise(function (resolve, reject) {
                var xhr = new XMLHttpRequest();
                xhr.open('GET', url, true);
                xhr.onload = function () {
                    return resolve(xhr.responseText);
                };
                xhr.onerror = function () {
                    return reject();
                };
                xhr.send();
            });
        }
    }]);

    return HttpService;
}();