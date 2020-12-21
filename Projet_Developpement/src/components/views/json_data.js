class jsondata{
    #data;
    get data(){
        return this.#data;
    }
    set data(json){
        this.#data = json
    }
    #object;
    get object(){
        return this.#object;
    }
    set object(json){
        this.#object = {json}
    }
}
export const sharejson = new jsondata();

class projectdata{
    #data;
    get data(){
        return this.#data;
    }
    set data(json){
        this.#data = json
    }
}
export const sharedproject = new projectdata();
