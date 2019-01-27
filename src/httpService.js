
// tasked with using the API
class HttpService{
    constructor(httpParams){

        const { apiUrl, action, publisher_id, appType,
                apiKey, sourceId, count, sourceType, sourceUrl} = httpParams;
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

    get(){
        const url = this._apiUrl  + '/' +
        this._publisher_id + '/' + this._action + '?' + 'app.type=' + this._appType + '&app.apikey=' + this._apiKey 
             + '&count=' + this._count + '&source.type=' + this._sourceType + '&source.id=' + this._sourceId 
             + '&source.url=' + this._sourceUrl;
        return this.sendXhr(url);
    }

    sendXhr(url){
        return new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.open('GET',url,true);
            xhr.onload = () => resolve(xhr.responseText);
            xhr.onerror = () => reject();
            xhr.send();
        });       
    }
}