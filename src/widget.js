
// the core of the widget's function.
class Widget{
    constructor(articleFactory, httpService, intersectionObserverService,
         anchorElement, articleListElement, iframeElement, errorLabel, loader){
        this._articleFactory = articleFactory;
        this._httpService = httpService;
        this._intersectionObserverService = intersectionObserverService;
        this._anchorElement = anchorElement;
        this._articleListElement = articleListElement;
        this._iframeElement = iframeElement;
        this._errorLabel = errorLabel;
        this._loader = loader;
    }

    start(){
        this._intersectionObserverService.startIntersctionObservation();
        this._anchorElement.addEventListener('click',() => {
            this.get();
        });
    }

    get(){
        // hide the loader
        this._loader.style.display = "block";
        this._httpService.get().then((response) => {
            this._errorLabel.style.display = "none";
            const json = JSON.parse(response);
            this.handleContent(json);
        })
        .catch(() =>{
            this._errorLabel.style.display = "block";
            this._loader.style.display = "none";
        });
    }

    handleContent(response){
        const articleArray = this.createArticleArray(response.list);
        articleArray.forEach(x => this.addArticle(x.getHtml()));
        this.resetWidgetSize();
    }

    createArticleArray(list){
        const itemArrayData = list.map((item) => {
            return {
                caption: item.name,
                thumbnail: item.thumbnail[0].url,
                targetUrl: item.url,
                branding: item.branding,
                type: item.origin,
            }
        })
        const articels = itemArrayData.map(i => {
            return this._articleFactory.getItem(i.type, i);
        });
        return articels;
    }

    addArticle(articleItemHtml){
        const newListItem = document.createElement('li');
        newListItem.classList.add('list-item');
        newListItem.innerHTML = articleItemHtml;
        this._articleListElement.appendChild(newListItem);
    }

    // manages the iframe's height
    resetWidgetSize(){
        this._iframeElement.height = this._iframeElement.contentWindow.document.body.scrollHeight;
    }
}



