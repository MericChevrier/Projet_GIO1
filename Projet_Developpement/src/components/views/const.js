import { sharejson } from './json_data.js';
import * as Cesium from 'cesium';

export function AddProjetCesium() {
const Promise0 = async () => {
    try {
        Cesium.GeoJsonDataSource.load(sharejson.data, {
            stroke: Cesium.Color.BLUE,
            strokeWidth: 3
        });
        // const Promise1 = async () => {
        //     try {
        //         const polygonalFrame = await viewer.dataSources.add(dataSource);
        //         viewer.zoomTo(polygonalFrame);
        //         const entities = polygonalFrame.entities.values;
        //         for (var i = 0; i < entities.length; i++) {
        //             const entity = entities[i];
        //             entity.polygon.material = new Cesium.Material({
        //                 fabric : {
        //                   type : 'Color',
        //                   uniforms : {
        //                     color : new Cesium.Color(1.0, 0.0, 0.4, 0.5)
        //                   }
        //                 }
        //               });
        //         }
        //     }
        //     catch (err) {
        //         console.log("Error: ", err);
        //     }
        // };
        //Promise1();
    }
    catch (e) {
        console.log("Error:", e);
    }
};
Promise0();
}