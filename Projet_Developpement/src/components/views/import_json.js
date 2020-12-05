import 'ol/ol.css';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import * as cesium_import_json from './cesium_import_json.js';

export function AddVectorLayer(layer_url,olmap,visibility){
   if (visibility===undefined){visibility=false}
    var layer = new Vector({
        source: new VectorSource({
        url: layer_url,
        format: new GeoJSON(),
        projection : 'EPSG:4326', 
        }),
        visible: visibility,
        });
    olmap.addLayer(layer)
    //cesium_import_json.CesiumImportJson(layer_url,viewer)
    return layer
    }
    
