<template>
  <div id="ces-container">
    <!--Menu de gauche - situation de base--> 
    <div id="cesium-container">
    </div>
    <div id="menu_gauche">
		  <div id="situation">
        <!--Titres et création des divers boutons pour l'affichage des couches souhaitées-->
		  	<h1 class="title is-4">Vue3D</h1>
				<h2 class="subtitle is-6 has-text-left">Gestion des couches :</h2>
			  <h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Couches restrictives</U></h3>
        <!-- bouton permettant l'affichage ou non des données restrictives -->
        <p><label class="is-size-7 has-text-black"><input type="checkBox" id="MNT" v-on:click="ChangeLayerVisibility('MNT')"> Modèle numérique de terrain</label></p>
        <p><label class="is-size-7 has-text-black"><input type="checkBox" id="volume_implantation" v-on:click="ChangeLayerVisibility('volume_implantation')"> Volume d'implantation</label></p>
			</div>
    </div>
		
		<!--Menu de droite - information sur le projet--> 
	  <div id="menu_droite">
		  <div id="information_projet">
        <!--Titres et création des divers boutons pour l'affichage des couches souhaitées-->
		  	<h1 class="title is-4">Information sur le projet</h1>
        <!-- bouton de chargement du projet 3D à contrôler -->
		  	<button class="button is-small" type="button" id="cesium_import_json" v-on:click="CesiumImportProjet()">Afficher le projet en 3D</button>
		  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Projet :</U></h3>
        <!-- affichage des données du projet sur clic du bouton validation -->
		  	<p><label class="is-size-7 has-text-black">Nom du projet :</label></p>
		  	<p><label class="is-size-7 has-text-black">Volume d'implantation : m³</label></p>
        <h3 class="subtitle is-6"><U>Respect des restrictions 3D :</U></h3>
        <!-- contrôle du projet par rapport au aire d'implantation 3D -->
		  	<p><label class="is-size-7 has-text-black">Implantation :</label></p>
        <!-- bouton qui affiche le nom du projet, calcul son volume et contrôle son implantation 3D -->
        <button class="button is-small" type="button" name="validation3D" id="validation3D" v-on:click="calcul_validation3D()">Validation 3D</button>
		  </div>
	  </div>
  </div>
</template>

<script>
// import des outils de base
import "cesium/Build/Cesium/Widgets/widgets.css";
import * as Cesium from 'cesium';
// import des constantes globales
import { shared_project } from './const_globales.js';


export default {
  name: "CesiumGlobeView",
  data() {
    return{
      //position et zoom du globe cesium de base, variables de base
      center: [7.39994, 46.23544],
      defaultheight:1500.,
      viewer:null,   
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
      });
      viewer.scene.primitives.add(Cesium.createOsmBuildings());
      return viewer;
    },

    // fonction d'import pour fichiers json
    CesiumImportJson : function(obj){
        var jsonOptions = {
        //show : true // propriétés que nous arrivons pas à faire fonctionner
        }
        var dataSource = Cesium.GeoJsonDataSource.load(obj,jsonOptions);
        this.viewer.dataSources.add(dataSource);
        //this.viewer.zoomTo(dataSource); // propriétés que nous arrivons pas à faire fonctionner
        //dataSource.show = false; // propriétés que nous arrivons pas à faire fonctionner
        return dataSource
    },
    
  // fonction d'import pour projet json
    CesiumImportProjet : function(){
        var dataSource = Cesium.GeoJsonDataSource.load(shared_project.data,{
          //show :true // propriétés que nous arrivons pas à faire fonctionner
          });
        this.viewer.dataSources.add(dataSource);
        //this.viewer.zoomTo(dataSource); // propriétés que nous arrivons pas à faire fonctionner
    },
  },

  mounted() {
    // add cesium ion token to the app
    Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiJiZDUzNGNhNC0wYmFmLTQ0MWMtYjAxNS1iNjY1ZmNkY2VhYTUiLCJpZCI6MzgxMjcsImlhdCI6MTYwNTk2NDc5Mn0.PYaP8WOSB4mIuk_kBnuIz1xcJc5rewQbB0xoyUjuW8I';
    //initialisation du viewer globe Cesium
    this.viewer = this.setupCesiumGlobe();
    // positionement de base de la caméra
    this.flytodirection(this.center,this.defaultheight,this.viewer);
    //import de couches de bases qui concerne les restrictions
    this.CesiumImportJson("geojson/Aire_implantation_3D_transfo_WGS84_Helli.geojson")
    // this.CesiumImportJson("geojson/MNT_coupe_transfo_WGS84_Helli.geojson")
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