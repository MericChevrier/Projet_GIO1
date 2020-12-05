import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';

export function CesiumImportJson(url){
    var viewer = new Cesium.Viewer('cesiumContainer');
        viewer.dataSources.add(
        Cesium.GeoJsonDataSource.load(url)
     );
}

    