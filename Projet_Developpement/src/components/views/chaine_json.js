import 'ol/ol.css';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { sharejson } from './json_data.js';


export function AddVectorLayer2(olmap) {
  var layer = new Vector({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(sharejson.data, {
        dataProjection: 'EPSG:4326',
        featureProjection: 'EPSG:3857'
      }),
    }),
    visible: 'True',
  });
  olmap.addLayer(layer)
  //return layer
}