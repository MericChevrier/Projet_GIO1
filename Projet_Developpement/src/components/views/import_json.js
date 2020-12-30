import 'ol/ol.css';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import { Circle as CircleStyle, Fill, Stroke, Style } from 'ol/style';

// gestion des styles des couches de la MO
var styles = {
    'bien_fond': new Style({
        stroke: new Stroke({
            color: 'black',
            width: 2,
        }),
        fill: new Fill({
            color: 'rgba(0, 0, 0, 0)',
        }),
    }),
    'batiment': new Style({
        stroke: new Stroke({
            color: 'rgb(244, 138, 178)',
            width: 1.5,
        }),
        fill: new Fill({
            color: 'rgba(248, 170, 199, 0.5)',
        }),
    }),
    'surface_cs': new Style({
        stroke: new Stroke({
            color: 'rgb(195, 191, 193)',
            lineDash: [6],
            width: 1.5,
        }),
    }),
    'od_lineaire': new Style({
        stroke: new Stroke({
            color: 'rgb(45, 41, 42)',
            lineDash: [6],
            width: 1,
        }),
    }),
    'od_surfacique': new Style({
        stroke: new Stroke({
            color: 'rgb(45, 41, 42)',
            width: 1,
        }),
    })
}

// fonction d'import de couches geojson en donnant le chemin vers la couche
export function AddVectorLayer(layer_url, olmap, visibility, StyleName) {
    if (visibility === undefined) { visibility = false }
    var layer = new Vector({
        source: new VectorSource({
            url: layer_url,
            format: new GeoJSON(),
            projection: 'EPSG:4326',
        }),
        style: styles[StyleName],
        visible: visibility,
    });
    olmap.addLayer(layer)
    return layer
}

