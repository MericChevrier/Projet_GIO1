import 'ol/ol.css';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

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
    return layer
    }
    
