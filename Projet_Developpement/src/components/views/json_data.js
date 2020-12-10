class jsondata{
    #data;
    get data(){
        return this.#data;
    }
    set data(json){
        this.#data = json
    }
}
export const sharejson = new jsondata();
console.log(sharejson)