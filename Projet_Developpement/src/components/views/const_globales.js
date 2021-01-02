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
