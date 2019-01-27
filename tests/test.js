
let widget,articleFactory, httpService, observerService,
anchorElement, articleListElement, iframeElement,errorLabel;

describe('widget class unit tests',() => {
    
    beforeEach(() => {
        articleFactory = new ArticleItemFactory();
        // just mocks
        httpService = {
            get: () => {}
        }
        observerService = {
            startIntersctionObservation: () => {}
        }
        anchorElement = document.createElement('button');
        articleListElement = document.createElement('ul');
        // just a mock for iframe window properties
        iframeElement = {
            height: null,
            contentWindow:{
                document:{
                    body:{
                        scrollHeight:100
                    }
                }
            }
        }
        loader = document.createElement('div');
        loader.style.display = 'none';
        errorLabel = document.createElement('p');
        errorLabel.style.display = 'none';

        widget = new Widget(articleFactory, httpService, observerService,anchorElement
                            ,articleListElement, iframeElement, errorLabel, loader);
    })

    it('widget is created properly',() => {
        expect(widget._articleFactory).toBeDefined();
        expect(widget._httpService).toBeDefined();
        expect(widget._intersectionObserverService).toBeDefined();
        expect(widget._anchorElement).toBeDefined();
        expect(widget._articleListElement).toBeDefined();
        expect(widget._iframeElement).toBeDefined();
        expect(widget._errorLabel).toBeDefined();
        expect(widget.start).toBeDefined();
        expect(widget.handleContent).toBeDefined();
        expect(widget.createArticleArray).toBeDefined();
        expect(widget.addArticle).toBeDefined();
        expect(widget.resetWidgetSize).toBeDefined();
    })

    it('start() - click event -> get() to have been called', () => {
        spyOn(widget,'get');
        widget.start();
        anchorElement.click();
        expect(widget.get).toHaveBeenCalled();
    })

    it('get() - call fails -> error should appear',(done) => {
        spyOn(httpService,'get').and.returnValues(
            new Promise((resolve,reject) => {
                setTimeout(() => {
                    reject('error');
                },100)
            })
        );

        widget.get();
        setTimeout(() => {
            expect(errorLabel.style.display).toBe('block');
            done();
        },150)       
    })

    it('get() - call succeeds -> handleContent() to be called with json',
    (done) => {
        const jsonString = '{"url":"http...","description":"desc","name":"name"}';
        spyOn(httpService,'get').and.returnValues(
            new Promise((resolve,reject) => {
                setTimeout(() => {
                    resolve(jsonString);
                },100)
            })
        );

        spyOn(widget, 'handleContent');

        widget.get();
        setTimeout(() => {
            expect(widget.handleContent).toHaveBeenCalledWith(
                {url:'http...',description:'desc',name:'name'}
            )
            done();
        },150) 
    })

    it('handleContent() -> call all relevant methods',() => {
        spyOn(widget, 'createArticleArray').and.returnValues(
            [new ArticleItem({}), new ArticleItem({}), new ArticleItem({})]
        );
        spyOn(widget, 'addArticle');
        spyOn(widget, 'resetWidgetSize');
        widget.handleContent({});
        expect(widget.createArticleArray).toHaveBeenCalled();
        expect(widget.addArticle).toHaveBeenCalledTimes(3);
        expect(widget.resetWidgetSize).toHaveBeenCalled();
    })

    it('createArticleArray() -> return correct models',() => {
        const list = [
            {name:"name1",thumbnail:[{url:'turl1'}],url:'url1',branding:'brand1',origin:'organic'},
            {name:"name2",thumbnail:[{url:'turl2'}],url:'url2',branding:'brand2',origin:'sponsored'},
            {name:"name3",thumbnail:[{url:'turl3'}],url:'url3',branding:'brand3',origin:'organic'}
        ]
        const articles = widget.createArticleArray(list);
        ['name1','name2','name3'].forEach((x,idx) => expect(articles[idx]._caption).toBe(x));
        ['turl1','turl2','turl3'].forEach((x,idx) => expect(articles[idx]._thumbnail).toBe(x));
        ['url1','url2','url3'].forEach((x,idx) => expect(articles[idx]._targetUrl).toBe(x));
        ['brand1','brand2','brand3'].forEach((x,idx) => expect(articles[idx]._branding).toBe(x));
        
        // only sponsored items have _blank as link target
        expect(articles[0].getHtml().includes("_blank")).toBe(false);
        expect(articles[1].getHtml().includes("_blank")).toBe(true);
        expect(articles[2].getHtml().includes("_blank")).toBe(false);
    })

    it('addArticle() -> change dom correctly',() => {
        const itemHtml = "<div>" +
        "<img>" + 
        "<p>some headline</p>" +
        "<span>some source</span>" +
        "</div>";
        expect(widget._articleListElement.children.length).toBe(0);
        widget.addArticle(itemHtml);
        expect(widget._articleListElement.children.length).toBe(1);
        expect(widget._articleListElement.children[0].innerHTML).toBe(itemHtml)
    })

    it('resetWidgetSize() -> set size correctly',() => {
        expect(widget._iframeElement.height).toBe(null);
        widget.resetWidgetSize();
        expect(widget._iframeElement.height).toBe(100);       
    })
})