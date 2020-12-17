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


// var image = new CircleStyle({
//     radius: 5,
//     fill: null,
//     stroke: new Stroke({color: 'red', width: 1}),
//   });

//   var styles = {
//     'Point': new Style({
//       image: image,
//     }),
//     'LineString': new Style({
//       stroke: new Stroke({
//         color: 'green',
//         width: 1,
//       }),
//     }),
//     'MultiLineString': new Style({
//       stroke: new Stroke({
//         color: 'green',
//         width: 1,
//       }),
//     }),
//     'MultiPoint': new Style({
//       image: image,
//     }),
//     'MultiPolygon': new Style({
//       stroke: new Stroke({
//         color: 'yellow',
//         width: 1,
//       }),
//       fill: new Fill({
//         color: 'rgba(255, 255, 0, 0.1)',
//       }),
//     }),
//     'Polygon': new Style({
//       stroke: new Stroke({
//         color: 'blue',
//         lineDash: [4],
//         width: 3,
//       }),
//       fill: new Fill({
//         color: 'rgba(0, 0, 255, 0.1)',
//       }),
//     }),
//     'GeometryCollection': new Style({
//       stroke: new Stroke({
//         color: 'magenta',
//         width: 2,
//       }),
//       fill: new Fill({
//         color: 'magenta',
//       }),
//       image: new CircleStyle({
//         radius: 10,
//         fill: null,
//         stroke: new Stroke({
//           color: 'magenta',
//         }),
//       }),
//     }),
//     'Circle': new Style({
//       stroke: new Stroke({
//         color: 'red',
//         width: 2,
//       }),
//       fill: new Fill({
//         color: 'rgba(255,0,0,0.2)',
//       }),
//     }),
//   };

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
  var layer = new Vector({
    source: new VectorSource({
      features: new GeoJSON().readFeatures(geojsonObject),
      format: new GeoJSON(),
      //projection : 'EPSG:4326', 
    }),
    visible: 'True',
  });
  olmap.addLayer(layer)
  return layer
}