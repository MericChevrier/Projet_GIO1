import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';

export function CesiumImportJson(url,viewer){
        var dataSource = Cesium.GeoJsonDataSource.load(url,{
          show : 1
          });
        viewer.dataSources.add(dataSource);
        viewer.zoomTo(dataSource);
    }

    