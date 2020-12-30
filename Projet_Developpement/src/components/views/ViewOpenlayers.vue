<template>
  <div id="ol-container" class="map">
          <li v-for="user in users" :key="user.id">         
            {{user.name}}       
          </li>
    <!--Menu de gauche - situation de base-->
    <div id="menu_gauche">
		  	<div id="situation">
			  	<h1 class="title is-4">Situation</h1>
			  	<h2 class="subtitle is-6 has-text-left">Gestion des couches :</h2>
			  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Fond de plan</U></h3>
          <!-- boutons permettant l'affichage des fonds de carte mapbox -->
			  	<p><label class="radio is-size-7 has-text-black"><input type="radio" v-on:click="changeBaselayer('mapbox_rues')" checked> Fond Rues</label></p>
		  		<p><label class="radio is-size-7 has-text-black"><input type="radio" v-on:click="changeBaselayer('mapbox_satellite')" /> Fond Satellite</label></p>
		    	<p><label class="radio is-size-7 has-text-black"><input type="radio" v-on:click="changeBaselayer('blanc')" /> Fond Blanc</label></p>
		  		<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Mensuration officielle :</U></h3>
          <!-- bouton permettant l'affichage ou non des données de la MO -->
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" id="bien_fond" v-on:click="ChangeLayerVisibility('bien_fond')"> Biend-fonds</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" id="batiment" v-on:click="ChangeLayerVisibility('batiment')"> Bâtiment</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" id="od_lineaire" v-on:click="ChangeLayerVisibility('od_lineaire')"> Objets linéaires</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" id="od_surfacique" v-on:click="ChangeLayerVisibility('od_surfacique')"> Objets surfaciques</label></p>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" id="surface_cs" v-on:click="ChangeLayerVisibility('surface_cs')"> Couverture du sol</label></p>
			  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Restrictions :</U></h3>
          <!-- bouton permettant l'affichage ou non des restrictions de police des construction -->
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" id="aire_implantation" v-on:click="ChangeLayerVisibility('aire_implantation')"> Aire d'implantation</label></p>
		  	</div>
  	</div>



    <!--Menu de droite - information sur le projet-->
		<div id="menu_droite">
			<div id="information_projet">
        <h1 class="title is-4">Informations</h1>
        <!-- bouton d'import du projet à contrôler -->
        <input hidden= "true" type="file" id="file-input" />
        <pre hidden=true id="file-content"></pre>
				<button class="button is-small" type="button" id="import_j" v-on:click="import_projet(getJSONcontent)">Importer .json</button>
		  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Projet :</U></h3>
        <!-- affichage des données du projet sur clic du bouton validation -->
		  	<p><label class="is-size-7 has-text-black">Nom du projet : {{name}}</label></p>
				<p><label class="is-size-7 has-text-black">Surface au sol : {{surface}} m²</label></p>
				<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Respect des restrictions 2D :</U></h3>
        <!-- contrôle du projet par rapport au aire d'implantation -->
				<p><label class="is-size-7 has-text-black">Implantation : {{validation}}</label></p>
        <!-- bouton qui affiche le nom du projet, calcul sa surface et contrôle son implantation -->
        <button class="button is-small" type="button" name="validation" id="validation" v-on:click="intersection()">Validation</button>
			</div>
		</div>
  </div>

</template>

<script>
// outils de base
import 'ol/ol.css';
import * as ol from 'ol';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import XYZ from 'ol/source/XYZ';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import Vector from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import GeoJSON from 'ol/format/GeoJSON';
import * as olProj from 'ol/proj';
// fichier js externes
import * as import_json from './import_json.js';
import * as import_base from './import_base.js';
import * as import_projet from './import_projet.js';
import * as chaine_json from './chaine_json.js';
import * as air_implant from './air_implantation.js';
// constantes globales
import { sharejson } from './json_data.js';
import { sharedproject } from './json_data.js';
// librairies de calcul turf
import * as turf from '@turf/turf';
import { intersect } from '@turf/intersect';
import { feature, polygon } from '@turf/helpers';
import { area } from '@turf/area';
import { booleanContains } from '@turf/boolean-contains';
import { polygonize } from '@turf/polygonize';






export default {
  data() {
    return{
      // variables de base
      center: [7.40, 46.23],
      olmap:null,
      mapbox_rues:null,
      mapbox_satellite:null,
      zoom: 12,
      mapbox_url_rues: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVyaWNjaGV2cmllciIsImEiOiJjazhzbDVvZm4wZDdkM2RvNXI2d2FjdXNxIn0.bje3c5XWbhb_eNI-PTx5cg',
      mapbox_name_rues: 'mapbox_rues',
      mapbox_url_satellite: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVyaWNjaGV2cmllciIsImEiOiJjazhzbDVvZm4wZDdkM2RvNXI2d2FjdXNxIn0.bje3c5XWbhb_eNI-PTx5cg',
      mapbox_name_satellite: 'mapbox_satellite',
      validation: ''
    }
  },
  computed:{
    /**
     * Transform coordinate from EPSG:4326 to EPSG:3857
     *
     * @use center in EPSG:4326
     * @return center in EPSG:3857
     */
    center3857(){
      return olProj.transform(this.center, 'EPSG:4326', 'EPSG:3857');
    }
  },
  methods: {

    
    /**
     * Init Openlayers map
     *
     * @param {number[]} mapcenter center of the map in EPSG:3857
     * @param {number} mapzoom zommlevel
     * @returns {Map} initmap new openlayers map
     */
    setupOpenlayersMap (mapcenter,mapzoom) {
      return new Map({
        target: 'ol-container',
        view: new View({
          center: mapcenter,
          zoom: mapzoom
        })
      })
    },


    //changement de fond de carte
		changeBaselayer : function (layer) {
      console.log("changeBaselayer(\"" + layer + "\")");


        switch (layer) {
          case "mapbox_rues":
            this.mapbox_rues.setVisible(true);
				  	this.mapbox_satellite.setVisible(false);
				  	break;
          case "mapbox_satellite":
            this.mapbox_satellite.setVisible(true);
						this.mapbox_rues.setVisible(false);
						break;
          case "blanc":
            this.mapbox_satellite.setVisible(false);
						this.mapbox_rues.setVisible(false);
            break;
        }
    },

    //Affichage/désaffichage des couches de la MO
		ChangeLayerVisibility : function (layer) {
      switch (layer) {
        case "bien_fond":
          console.log(document.getElementById(layer).checked)
          if(document.getElementById(layer).checked == true){
            this.bien_fond.setVisible(true);
          }
          else {
            this.bien_fond.setVisible(false);
          }
				  break;
        case "ddp":
          if(document.getElementById(layer).checked == true){
            this.ddp.setVisible(true);
          }
          else {
            this.ddp.setVisible(false);
          }
          break;
        case "batiment":
          if(document.getElementById(layer).checked == true){
            this.batiment.setVisible(true);
          }
          else {
            this.batiment.setVisible(false);
          }
          break;
        case "surface_cs":
          if(document.getElementById(layer).checked == true){
            this.surface_cs.setVisible(true);
          }
          else {
            this.surface_cs.setVisible(false);
          }
          break;
        case "od_lineaire":
          if(document.getElementById(layer).checked == true){
            this.od_lineaire.setVisible(true);
          }
          else {
            this.od_lineaire.setVisible(false);
          }
          break;
        case "od_surfacique":
          if(document.getElementById(layer).checked == true){
            this.od_surfacique.setVisible(true);
          }
          else {
            this.od_surfacique.setVisible(false);
          }
          break;
        case "aire_implantation":
          if(document.getElementById(layer).checked == true){
            this.aire_implantation.setVisible(true);
          }
          else {
            this.aire_implantation.setVisible(false);
          }
				  break;
        }
    },
 

    //import projet en json
    import_projet : import_projet.import_json,
    //
    getJSONcontent : function(json){
      sharejson.data=JSON.parse(json)
      sharejson.object=json
      this.projet = chaine_json.AddVectorLayer2(this.olmap);
    },

    intersection : function(){
      // création d'un polygone avec le projet importé
      var projet = polygon(sharejson.data.features[0].geometry.coordinates);
      // récupération du nom du projet
      this.name = sharejson.data.name;
      // calcul de la surface du projet => ne fonctionne que pour les projets 2D
      var surface_calc = turf.area(projet);
      if (surface_calc){this.surface = turf.round(surface_calc, 2)}
      // validation du projet par rapport aux aires d'implantation de la commune
      var count = 0
      for (const features in sharedproject.data.features) {
        var air_implant = polygon(sharedproject.data.features[features].geometry.coordinates[0]);
        var contains = turf.booleanContains(air_implant, projet);
        if (contains == true){count += 1}
      }
      if (count == 1){this.validation = 'validé'}
      else {this.validation = 'fausse'};
      },
    },

  mounted() {

    // création de la carte avec couches de bases
    this.olmap = this.setupOpenlayersMap(this.center3857,this.zoom);
    this.mapbox_rues = import_base.setupmapbox(this.mapbox_url_rues, this.mapbox_name_rues, true, this.olmap)
    this.mapbox_satellite = import_base.setupmapbox(this.mapbox_url_satellite, this.mapbox_name_satellite, false, this.olmap)
    // ajout de nos couches geojson affichables
    this.surface_cs = import_json.AddVectorLayer( "geojson/MO_CS_WGS84.geojson",this.olmap, false, 'surface_cs');
    this.od_lineaire = import_json.AddVectorLayer( "geojson/MO_OD_Autre_lineaire_WGS84.geojson",this.olmap, false, 'od_lineaire');
    this.od_surfacique = import_json.AddVectorLayer( "geojson/MO_OD_Autre_Surfacique_WGS84.geojson",this.olmap, false, 'od_surfacique');
    this.aire_implantation = import_json.AddVectorLayer( "geojson/Aire_Implantation.geojson",this.olmap);
    this.batiment = import_json.AddVectorLayer('geojson/MO_CS_Batiment_WGS84.geojson',this.olmap, false, 'batiment');
    this.bien_fond = import_json.AddVectorLayer( "geojson/MO_BF_Parcelle_WGS84.geojson",this.olmap, false, 'bien_fond');
    // création des variables d'affichage des données du projet
    var name = '';
    var surface = '';
    // création des aires d'implantation compatibles avec les calculs turf
    air_implant.init();
  }

}
</script>

<style scoped>
#ol-container {
  height: 100%;
  width: 100%;
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
  width : 270px;
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
	width : 300px;
}

#file_content {
  background-color: #ffffff ;
	box-shadow: 1px 1px 12px #555;
	z-index: 1;
  padding: 5px 20px;
  position: absolute;
	top : 0px;
	right: 0px;
	float: right;
	height : 100%;
	width : 300px;
}
</style>