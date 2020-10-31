window.onload = function() {
  // Swiss extent
  var rectangle = Cesium.Rectangle.fromDegrees(
    5.013926957923385,
    45.35600133779394,
    11.477436312994008,
    48.27502358353741
  );

  var getCesiumTileset = function() {
    return new Cesium.Cesium3DTileset({
      url:
        "https://vectortiles0.geo.admin.ch/3d-tiles/ch.swisstopo.swisstlm3d.3d/20190313/tileset.json"
    });
  };

  try {
    var viewer = new Cesium.Viewer("cesiumContainer", {
      baseLayerPicker: false,
      terrainProvider: new Cesium.CesiumTerrainProvider({
        url:
          "//3d.geo.admin.ch/1.0.0/ch.swisstopo.terrain.3d/default/20160115/4326/"
      }),
      imageryProvider: new Cesium.UrlTemplateImageryProvider({
        // Aerial image
        //url: "//wmts20.geo.admin.ch/1.0.0/ch.swisstopo.swissimage-product/default/current/4326/{z}/{x}/{y}.jpeg",
        // Map
        url:
          "//wmts10.geo.admin.ch/1.0.0/ch.swisstopo.swisstlm3d-karte-farbe.3d/default/current/4326/{z}/{x}/{y}.jpeg",
        minimumLevel: 8,
        maximumLevel: 17,
        tilingScheme: new Cesium.GeographicTilingScheme({
          numberOfLevelZeroTilesX: 2,
          numberOfLevelZeroTilesY: 1
        }),
        rectangle: rectangle
      }),
      fullscreenButton: false,
      homeButton: false,
      sceneModePicker: false,
      selectionIndicator: false,
      timeline: false,
      animation: false,
      geocoder: true,
      navigationInstructionsInitiallyVisible: false,
      navigationHelpButton: false,
      scene3DOnly: true
    });

    // Zoom to Mürrn
    viewer.camera.setView({
      destination: Cesium.Rectangle.fromDegrees(7.87, 46.58, 7.88, 46.59), // Mürren
      orientation: {
        heading: Cesium.Math.toRadians(175.0),
        pitch: Cesium.Math.toRadians(-35.0),
        roll: 0.0
      }
    });

    // Add buildings
    viewer.scene.primitives.add(getCesiumTileset());

    viewer.scene.globe.baseColor = Cesium.Color.WHITE;
    viewer.scene.backgroundColor = Cesium.Color.WHITE;
  } catch (e) {
    console.log(e.message);
  }
};
