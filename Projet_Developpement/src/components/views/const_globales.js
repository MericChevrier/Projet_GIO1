class projectdata{
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
export const shared_project = new projectdata();

class aire_implantation_data{
    #data;
    get data(){
        return this.#data;
    }
    set data(json){
        this.#data = json
    }
}
export const shared_aire_implantation = new aire_implantation_data();
