import 'ol/ol.css';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';

export function AddVectorLayer(layer_url,olmap){
    var layer = new Vector({
        source: new VectorSource({
        url: layer_url,
        format: new GeoJSON(),
        projection : 'EPSG:4326', 
        }),
        visible: false,
        });
    olmap.addLayer(layer)
    return layer
    }
    
