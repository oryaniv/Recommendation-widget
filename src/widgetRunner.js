
// iframe main
(function(){
    const articleItemFactory = new ArticleItemFactory();
    const httpService = new HttpService(window.frameElement.httpResourceParams);
    const observerService = new IntersectionObserverService(window.observer, document.querySelector("#anchor"));
    const widget = new Widget(articleItemFactory,
                              httpService,
                              observerService,
                              document.querySelector('#anchor'),
                              document.querySelector('#article-list'),
                              window.frameElement,
                              document.querySelector("#error-message"),
                              document.querySelector("#loader-container")
                         );
    widget.start();
})();