// création des constantes globales permettant de reprendre des éléments entre les différents onglets Vue

class projectdata{
    #data;
    get data(){
        return this.#data;
    }
    set data(json){
        this.#data = json
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

class latitude_search{
    #data;
    get data(){
        return this.#data;
    }
    set data(json){
        this.#data = json
    }
}
export const shared_latitude = new latitude_search();

class longitude_search{
    #data;
    get data(){
        return this.#data;
    }
    set data(json){
        this.#data = json
    }
}
export const shared_longitude = new longitude_search();
