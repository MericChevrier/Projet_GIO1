import 'ol/ol.css';
import * as ol from 'ol';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
// import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { sharejson } from './json_data.js';



var styleFunction = function (feature) {
  return styles[feature.getGeometry().getType()];
};

var geojsonObject = {
  "type": "FeatureCollection",
  "name": "Projet_test",
  "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
  "features": [
    { "type": "Feature", "properties": {}, "geometry": { "type": "Polygon", "coordinates": [[[7.401150372542284, 46.235605880314871], [7.399830108041084, 46.235331953263326], [7.399914698308324, 46.235136647041486], [7.401224726130267, 46.235405242285502], [7.401150372542284, 46.235605880314871]]] } }
  ]
}
  ;

export function AddVectorLayer2(olmap) {
  var format = new GeoJSON({
    defaultDataProjection: 'EPSG:4326'
  });
  var features = format.readFeatures(sharejson.data, {
    dataProjection: 'EPSG:4326',
    featureProjection: 'EPSG:3857'
  });
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
  return layer
}