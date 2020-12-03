export function CesiumImportJson(url){
    var viewer = new Cesium.Viewer("cesiumContainer");
        viewer.dataSources.add(
        Cesium.GeoJsonDataSource.load(
          url
        )
     );
}

    