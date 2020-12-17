import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';

export function CesiumImportJson(object,viewer){
        var dataSource = Cesium.GeoJsonDataSource.load(object,{
          show : 1
          });
        viewer.dataSources.add(dataSource);
        viewer.zoomTo(dataSource);
    }

    