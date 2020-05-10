export class MapProperty {
    elementType: string;
    stylers?: any[];
    color?: string;
    visibility?: string;


    constructor(elementType?, stylers?) {
        this.elementType = elementType;
        this.stylers = stylers? stylers : [];
    };

    setProperty(property: string, value:string):void {
        let found = false;
        this.stylers.forEach((e)=>{
            if(e[property]) {
                e[property]=value;
                found = true;
            }//make this more efficient stopping when found
        });
        if(!found){
            let obj ={};
            obj[property] = value;
            this.stylers.push(obj);
        }
    }
}

export class MapPropertyExtended extends MapProperty{
    featureType: string;

    constructor(featureType?, elementType?, stylers?) {
        super();
        this.featureType = featureType;
        this.elementType = elementType;
        this.stylers = stylers? stylers : [];
    };



}
