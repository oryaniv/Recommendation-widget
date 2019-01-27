'use strict';

(function () {
    var articleItemFactory = new ArticleItemFactory();
    var httpService = new HttpService(window.frameElement.httpResourceParams);
    var observerService = new IntersectionObserverService(window.observer, document.querySelector("#anchor"));
    var widget = new Widget(articleItemFactory, httpService, observerService, document.querySelector('#anchor'), document.querySelector('#article-list'), window.frameElement, document.querySelector("#error-message"), document.querySelector("#loader-container"));
    widget.start();
})();