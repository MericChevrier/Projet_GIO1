import { shared_latitude } from './const_globales.js';
import { shared_longitude } from './const_globales.js';
import { shared_center } from './const_globales.js';

export function center_search(){
    if (shared_latitude.data == null){
        shared_center.data=[7.39994, 46.23544]
    }
    else{
        shared_center.data=[shared_longitude.data,shared_latitude.data]
    }
  }