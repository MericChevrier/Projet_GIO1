
import 'ol/ol.css';
import Map from 'ol/Map';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import * as chaine_json from './chaine_json.js';
import {OSM, Vector as VectorSource} from 'ol/source';

export function setupOpenlayersMap (mapcenter,mapzoom) {
    return new Map({
      target: 'ol-container',
      view: new View({
        center: mapcenter,
        zoom: mapzoom
      })
    })
  }

  export function setupmapbox (url, name, visibility, olmap) {
    var name = new TileLayer({
      source: new XYZ({
        url: url
      }),
      visible: visibility,
    })

    olmap.addLayer(name)
    return name

  }