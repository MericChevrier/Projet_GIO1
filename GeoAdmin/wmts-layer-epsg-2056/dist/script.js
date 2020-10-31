var RESOLUTIONS = [
  4000, 3750, 3500, 3250, 3000, 2750, 2500, 2250, 2000, 1750, 1500, 1250,
  1000, 750, 650, 500, 250, 100, 50, 20, 10, 5, 2.5, 2, 1.5, 1, 0.5
];
var extent = [2420000, 130000, 2900000, 1350000];
var projection = ol.proj.get('EPSG:2056');
projection.setExtent(extent);


var matrixIds = [];
for (var i = 0; i < RESOLUTIONS.length; i++) {
  matrixIds.push(i);
}


var wmtsSource = function(layerConfig) {
  var resolutions = layerConfig.resolutions || RESOLUTIONS;
  var tileGrid = new ol.tilegrid.WMTS({
    origin: [extent[0], extent[3]],
    resolutions: resolutions,
    matrixIds: matrixIds
  });
  var extension = layerConfig.format || 'png';
  var timestamp = layerConfig['timestamps'][0];
  return new ol.source.WMTS(({
    attributions: [new ol.Attribution({
      html: '<a target="new" href="https://www.swisstopo.admin.ch/' +
      'internet/swisstopo/en/home.html">swisstopo</a>'
    })],
    url: '//wmts10.geo.admin.ch/1.0.0/{Layer}/default/' + timestamp + '/2056/{TileMatrix}/{TileCol}/{TileRow}.'+ extension,
    tileGrid: tileGrid,
    projection: projection,
    layer: layerConfig.serverLayerName,
    requestEncoding: 'REST'
  }));
};

// See https://api3.geo.admin.ch/rest/services/api/MapServer/layersConfig
var layerConfig = {
  "attribution": "swisstopo",
  "format": "jpeg",
  "serverLayerName": "ch.swisstopo.swissimage",
  "attributionUrl": "https://www.swisstopo.admin.ch/internet/swisstopo/fr/home.html",
  "label": "SWISSIMAGE",
  // Use 'current', if you are only interested in the latest data.
  "timestamps": [
    "current",
    "20140620",
    "20131107",
    "20130916",
    "20130422",
    "20120809",
    "20120225",
    "20110914",
    "20110228"
  ]
};

var wmtsLayer = new ol.layer.Tile({
  source: wmtsSource(layerConfig)
});

var wmsLayer = new ol.layer.Image({
  extent: extent,
  source: new ol.source.ImageWMS({
    url: 'https://wms.geo.admin.ch/',
    ratio: 1.0,
    projection: 'EPSG:2056',
    params: {
      'LAYERS': ['org.epsg.grid_21781,org.epsg.grid_4326'],
      'FORMAT': 'image/png',
      'TILED': false
    },
    serverType: 'mapserver'
  })
});

var map = new ol.Map({
  layers: [wmtsLayer, wmsLayer],
  target: 'map',
  view: new ol.View({
    center: [2720000, 1095000],
    projection: projection,
    resolution: 100
  }),
  controls: ol.control.defaults({
    attributionOptions: ({
      collapsible: false
    })
  }).extend([
    new ol.control.ScaleLine({
      units: 'metric'
    }),
    new ol.control.MousePosition({
      coordinateFormat: ol.coordinate.createStringXY(4),
      //projection: 'EPSG:2056',
      target: document.getElementById('mousePosition'),
      undefinedHTML: '&nbsp;'
    })
  ]),
  logo: false,
});