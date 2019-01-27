'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// this class can be extended for more types
var ArticleItem = function () {
    function ArticleItem(params) {
        _classCallCheck(this, ArticleItem);

        var caption = params.caption,
            thumbnail = params.thumbnail,
            targetUrl = params.targetUrl,
            branding = params.branding;

        this._caption = caption;
        this._thumbnail = thumbnail;
        this._targetUrl = targetUrl;
        this._branding = branding;
    }

    _createClass(ArticleItem, [{
        key: 'getHtml',
        value: function getHtml() {
            return "";
        }
    }]);

    return ArticleItem;
}();

var OrganicItem = function (_ArticleItem) {
    _inherits(OrganicItem, _ArticleItem);

    function OrganicItem(params) {
        _classCallCheck(this, OrganicItem);

        return _possibleConstructorReturn(this, (OrganicItem.__proto__ || Object.getPrototypeOf(OrganicItem)).call(this, params));
    }

    _createClass(OrganicItem, [{
        key: 'getHtml',
        value: function getHtml() {
            var htmlString = '<div class="article-container">' + '<a class="articleLine" href="' + this._targetUrl + '">' + '<span style="background-image: url(&quot;' + this._thumbnail + '&quot;),url(&quot;./style/recForYou.png&quot;);" class="thumbnail" title="' + this._caption + '">' + '</span>' + '<span class="caption">' + this._caption + '</span>' + '<span class="branding">' + this._branding + '</span>' + '</a>' + '</div>';
            return htmlString;
        }
    }]);

    return OrganicItem;
}(ArticleItem);

var SponsoredItem = function (_ArticleItem2) {
    _inherits(SponsoredItem, _ArticleItem2);

    function SponsoredItem(params) {
        _classCallCheck(this, SponsoredItem);

        return _possibleConstructorReturn(this, (SponsoredItem.__proto__ || Object.getPrototypeOf(SponsoredItem)).call(this, params));
    }

    _createClass(SponsoredItem, [{
        key: 'getHtml',
        value: function getHtml() {
            var htmlString = '<div class="article-container">' + '<a class="articleLine" href="' + this._targetUrl + '" target="_blank">' + '<span style="background-image: url(&quot;' + this._thumbnail + '&quot;),url(&quot;./style/recForYou.png&quot;);" class="thumbnail" title="' + this._caption + '">' + '</span>' + '<span class="caption">' + this._caption + '</span>' + '<span class="branding">' + this._branding + '</span>' + '</a>' + '</div>';
            return htmlString;
        }
    }]);

    return SponsoredItem;
}(ArticleItem);

var ArticleItemFactory = function () {
    function ArticleItemFactory() {
        _classCallCheck(this, ArticleItemFactory);

        this._staticImgArticleCreator = {
            'organic': function organic(params) {
                return new OrganicItem(params);
            },
            'sponsored': function sponsored(params) {
                return new SponsoredItem(params);
            }
            // add more if you like


            // more factories can be created for more types of articles
        };
    }

    _createClass(ArticleItemFactory, [{
        key: 'getItem',
        value: function getItem(type, params) {
            if (this._staticImgArticleCreator[type] !== null) {
                return this._staticImgArticleCreator[type](params);
            }
            console.log('item type does not exist!');
        }
    }]);

    return ArticleItemFactory;
}();