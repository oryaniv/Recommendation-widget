
// manages the intersection observer API objects
class IntersectionObserverService{
    constructor(observerObject, observableItem){
        this._observerObject = observerObject;
        this._observableItem = observableItem;
    }

    startIntersctionObservation(){
        this._observerObject.observe(this._observableItem);
    }
}