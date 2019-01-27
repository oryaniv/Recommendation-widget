// this class can be extended for more types of articles
class ArticleItem{
    constructor(params){
        const {caption,thumbnail,targetUrl, branding} = params;
        this._caption = caption;
        this._thumbnail = thumbnail;
        this._targetUrl = targetUrl;
        this._branding = branding;
    }

    getHtml(){
        return ""; 
    }
}

class OrganicItem extends ArticleItem{
    constructor(params){
        super(params);
    }

    getHtml(){
        const htmlString = '<div class="article-container">' +
                   '<a class="articleLine" href="'+ this._targetUrl +'">' +
                        '<span style="background-image: url(&quot;'+ this._thumbnail +'&quot;),url(&quot;./style/recForYou.png&quot;);" class="thumbnail" title="'+ this._caption +'">' +                        
                        '</span>'+
                        '<span class="caption">'+ this._caption +'</span>'+ 
                        '<span class="branding">'+ this._branding +'</span>'+  
                    '</a>'+                                                                          
                '</div>';            
        return htmlString;
    }
}

class SponsoredItem extends ArticleItem{
    constructor(params){
        super(params);
    }

    getHtml(){
        const htmlString = '<div class="article-container">' +
                   '<a class="articleLine" href="'+ this._targetUrl +'" target="_blank">' +
                        '<span style="background-image: url(&quot;'+ this._thumbnail +'&quot;),url(&quot;./style/recForYou.png&quot;);" class="thumbnail" title="'+ this._caption +'">' +                        
                        '</span>'+
                        '<span class="caption">'+ this._caption +'</span>'+ 
                        '<span class="branding">'+ this._branding +'</span>'+  
                    '</a>'+                                                                          
                '</div>';            
        return htmlString;
    }
}

// tasked with creating article item objects
class ArticleItemFactory{
    constructor(){
        this._staticImgArticleCreator = {
            'organic': (params) => new OrganicItem(params),
            'sponsored': (params) => new SponsoredItem(params),
            // add more if you like
        }       

        // more factories can be created for more types of articles
    }

    getItem(type,params){
        if(this._staticImgArticleCreator[type] !== null){      
            return this._staticImgArticleCreator[type](params);
        } 
        console.log('item type does not exist!');
    }
}