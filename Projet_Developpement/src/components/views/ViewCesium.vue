<template>
  <div id="ces-container">
    <!--Menu de gauche - situation de base--> 
    <div id="cesium-container">
    </div>
    <div id="menu_gauche">
		  	<div id="situation">
			  	<h1 class="title is-4">Vue3D</h1>
				  <input class="input is-primary is-small" type="text" placeholder="Text" id="search" name="barre_recherche">
          <button class="button is-small" type="button">Recherche</button>
			  	<h2 class="subtitle is-6 has-text-left has-text-weight-semibold">Gestion des couches</h2>
          <p><label class="checkbox subtitle is-6"><input type="checkbox" name="MNT" onclick="change_MNT(this.checked)"> MNT</label></p>
			  	<p><label class="checkbox subtitle is-6"><input type="checkbox" name="swissbuilding" onclick="change_swissbuilding(this.checked)"> SwissBuilding</label></p>
			  	<p><label class="checkbox subtitle is-6"><input type="checkbox" name="volume_implantation" onclick="volume_implantation(this.checked)"> Volume d'implantation</label></p>
		  	</div>
    </div>
		
		<!--Menu de droite - information sur le projet--> 
	  <div id="menu_droite">
		  <div id="information_projet">
		  	<h1 class="title is-4">Information sur le projet</h1>
		  	<button class="button is-small" type="button" id="cesium_import_json" v-on:click="CesiumImportProjet()">Afficher le projet en 3D</button>
		  	<h2 class="subtitle is-5 has-text-weight-semibold">Général :</h2>
		  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Mensuration officielle :</U></h3>
		  	<p><label class="is-size-7 has-text-black">Propriétaire :</label></p>
		  	<p><label class="is-size-7 has-text-black">Porteur du projet :</label></p>
		  	<p><label class="is-size-7 has-text-black">Parcelle:</label></p>
		  	<p><label class="is-size-7 has-text-black">Date de mise à l'enquête :</label></p>
		  	<p><label class="is-size-7 has-text-black">Zone d'affectation :</label></p>
		  	<p><label class="is-size-7 has-text-black">Surface de plancher :</label></p>
		  	<p><label class="is-size-7 has-text-black">Surface au sol :</label></p>
		  	<button class="button is-small" type="button" name="validation" id="validation" onclick="poly_draw()">Validation</button>
		  	<h3 class="subtitle is-6"><U>Respect des restrictions 3D :</U></h3>
		  	<p><label class="is-size-7 has-text-black">Volume d'implantation :</label></p>
		  </div>
	  </div>
  </div>
</template>

<script>
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';
import { sharejson } from './json_data.js';



export default {
  name: "CesiumGlobeView",
  data() {
    return{
      center: [7.40, 46.23],
      defaultheight:1500.,
      viewer:null
    }
  },
  methods: {
    /**
     * Fly to position 
     * 
     * @param {number[]} globecenter position to fly to
     * @param {number} globeheight altitude
     * @param {Viewer} viewer cesium viewer
     */
    flytodirection(globecenter,globeheight,viewer){
      viewer.camera.flyTo({
        destination : Cesium.Cartesian3.fromDegrees(globecenter[0], globecenter[1], globeheight)
      });
    },
    /**
     * Init Cesium globe
     * 
     * @returns {Viewer} viewer from cesium
     */
    setupCesiumGlobe () {
      let viewer = new Cesium.Viewer('cesium-container', {
        terrainProvider: new Cesium.createWorldTerrain(),
        feature: new Cesium.GeoJsonDataSource.load(sharejson.data)
      });
      viewer.scene.primitives.add(Cesium.createOsmBuildings());
      return viewer;
    },   
    // fonction d'import pour fichiers json
    CesiumImportJson : function(obj){
        var dataSource = Cesium.GeoJsonDataSource.load(obj,{
          show : 1
          });
        this.viewer.dataSources.add(dataSource);
        this.viewer.zoomTo(dataSource);
        console.log("hello");
    },

  // fonction d'import pour projet json
    CesiumImportProjet : function(){
        var dataSource = Cesium.GeoJsonDataSource.load(sharejson.data,{
          show : 1
          });
        this.viewer.dataSources.add(dataSource);
        this.viewer.zoomTo(dataSource);
        console.log("hello");
    }

  },
  mounted() {
    // add cesium ion token to the app
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDUzNGNhNC0wYmFmLTQ0MWMtYjAxNS1iNjY1ZmNkY2VhYTUiLCJpZCI6MzgxMjcsImlhdCI6MTYwNTk2NDc5Mn0.PYaP8WOSB4mIuk_kBnuIz1xcJc5rewQbB0xoyUjuW8I';
    //initialisation du globe Cesium
    this.viewer = this.setupCesiumGlobe();
    // positionement de base de la caméra
    this.flytodirection(this.center,this.defaultheight,this.viewer)
    var projetjson = sharejson.data
    //import de couches de bases
    //this.CesiumImportJson("geojson/MNT_Coupe_WGS84_Helli.geojson")
  },
};
</script>

<style scoped>
#ces-container {
  height: 100%;
  width: 100%;
}
#cesium-container {
  height: 90%;
  width: 70%;
  margin-left: auto;
  margin-right: auto;
}

#menu_gauche {
  background-color: #ffffff ;
  box-shadow: 1px 1px 12px #555;
  z-index: 1;
  padding: 5px 20px;
  position: absolute;
	top : 0px;
  top : 0px;
  height : 100%;
  width : 15%;
}

#menu_droite {
  background-color: #ffffff ;
	box-shadow: 1px 1px 12px #555;
	z-index: 1;
  padding: 5px 20px;
  position: absolute;
	top : 0px;
	right: 0px;
	float: right;
	height : 100%;
	width : 15%;
}
</style>