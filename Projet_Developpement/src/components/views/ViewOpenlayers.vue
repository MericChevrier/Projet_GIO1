<template>
  <div id="ol-container" class="map">
          <li v-for="user in users" :key="user.id">         
            {{user.name}}       
          </li>
    <!--Menu de gauche - situation de base-->
    <div id="menu_gauche">
		  	<div id="situation">
			  	<h1 class="title is-4">Situation</h1>
			  	<input class="input is-primary is-small" type="text" placeholder="Text" id="search" name="barre_recherche">
          <button class="button is-small" type="button">Recherche</button>
			  	<h2 class="subtitle is-6 has-text-left">Gestion des couches :</h2>
			  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Fond de plan</U></h3>
			  	<p><label class="radio is-size-7 has-text-black"><input type="radio" v-on:click="changeBaselayer('mapbox_rues')" checked> Fond Rues</label></p>
		  		<p><label class="radio is-size-7 has-text-black"><input type="radio" v-on:click="changeBaselayer('mapbox_satellite')" /> Fond Satellite</label></p>
		    	<p><label class="radio is-size-7 has-text-black"><input type="radio" v-on:click="changeBaselayer('blanc')" /> Fond Blanc</label></p>
		  		<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Mensuration officielle :</U></h3>
		  		<!-- <p><label class="is-size-7 has-text-black"><input type="checkBox" name="point_limite" onclick="change_point_limite(this.checked)"> Point limite</label></p> -->
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" id="bien_fond" v-on:click="ChangeLayerVisibility('bien_fond')"> Biend-fonds</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" id="batiment" v-on:click="ChangeLayerVisibility('batiment')"> Bâtiment</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" id="od_lineaire" v-on:click="ChangeLayerVisibility('od_lineaire')"> Objets linéaires</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" id="od_surfacique" v-on:click="ChangeLayerVisibility('od_surfacique')"> Objets surfaciques</label></p>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" id="surface_cs" v-on:click="ChangeLayerVisibility('surface_cs')"> Couverture du sol</label></p>
			  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Restrictions :</U></h3>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" id="aire_implantation" v-on:click="ChangeLayerVisibility('aire_implantation')"> Aire d'implantation</label></p>
          <!--<button type="button" name="import_projet" id="import_projet" onclick="poly_draw()">Importer un nouveau projet</button>-->
		  	</div>
  	</div>



    <!--Menu de droite - information sur le projet-->
		<div id="menu_droite">
			<div id="information_projet">
        <h1 class="title is-4">Informations</h1>
        <input hidden= "true" type="file" id="file-input" />
        <h3>Contents of the file:</h3>
        <pre id="file-content"></pre>
				<button class="button is-small" type="button" id="import_j" v-on:click="import_json(getJSONcontent)">Importer .json</button>
        <h2 class="subtitle is-5 has-text-weight-semibold">Général :</h2>
		  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Mensuration officielle :</U></h3>
		  	<p><label class="is-size-7 has-text-black">Propriétaire :</label></p>
				<p><label class="is-size-7 has-text-black">Porteur du projet :</label></p>
				<p><label class="is-size-7 has-text-black">Parcelle:</label></p>
				<p><label class="is-size-7 has-text-black">Date de mise à l'enquête :</label></p>
				<p><label class="is-size-7 has-text-black">Zone d'affectation :</label></p>
				<p><label class="is-size-7 has-text-black">Surface de plancher :</label></p>
				<p><label class="is-size-7 has-text-black">Surface au sol :</label></p>
				<button class="button is-small" type="button" name="validation" id="validation" v-on:click="intersection()">Validation</button>
				<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Respect des restrictions 2D :</U></h3>
				<p><label class="is-size-7 has-text-black">Implantation</label></p>
				<p><label class="is-size-7 has-text-black">Surface de plancher (xxm² sur xxm²)</label></p>
				<p><label class="is-size-7 has-text-black">Surface au sol (xxm² sur xxm²)</label></p>
				<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Géométrie 3D :</U></h3>
				<button class="button is-small" type="button" name="3D" id="3D" onclick="poly_draw()">Passer en mode 3D</button>
			</div>
		</div>
  </div>

</template>

<script>
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
import * as import_json from './import_json.js';
import * as import_base from './import_base.js';
import * as import_p from './import.js';
import * as chaine_json from './chaine_json.js';
import { sharejson } from './json_data.js';
import { sharedproject } from './json_data.js';
import * as turf from '@turf/turf';
import { intersect } from '@turf/intersect';
import { polygon } from '@turf/helpers';
import { booleanContains } from '@turf/boolean-contains';
import { polygonize } from '@turf/polygonize';
import * as air_implant from './air_implantation.js';





export default {
  data() {
    return{
      center: [7.40, 46.23],
      olmap:null,
      mapbox_rues:null,
      mapbox_satellite:null,
      zoom: 12,
      mapbox_url_rues: 'https://api.mapbox.com/styles/v1/mapbox/streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVyaWNjaGV2cmllciIsImEiOiJjazhzbDVvZm4wZDdkM2RvNXI2d2FjdXNxIn0.bje3c5XWbhb_eNI-PTx5cg',
      mapbox_name_rues: 'mapbox_rues',
      mapbox_url_satellite: 'https://api.mapbox.com/styles/v1/mapbox/satellite-streets-v11/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWVyaWNjaGV2cmllciIsImEiOiJjazhzbDVvZm4wZDdkM2RvNXI2d2FjdXNxIn0.bje3c5XWbhb_eNI-PTx5cg',
      mapbox_name_satellite: 'mapbox_satellite',
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


    //Affichage du fond de carte
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

    //Affichage du fond de carte
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
      console.log(document.getElementById(layer).checked);
      console.log("ChangeLayerVisibility(\"" + layer + "\")");
    },
 








    //import projet en json
    import_json : import_p.import_json,

    getJSONcontent : function(json){
      sharejson.data=JSON.parse(json)
       console.log(sharejson.data)
//       console.log({
// "type": "FeatureCollection",
// "name": "Projet_test",
// "crs": { "type": "name", "properties": { "name": "urn:ogc:def:crs:OGC:1.3:CRS84" } },
// "features": [
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.40042411742963, 46.235248176940573, 552.1520 ], [ 7.400535281373425, 46.235282474621698, 552.1520 ], [ 7.40042411742963, 46.235248176940573, 562.1537 ], [ 7.40042411742963, 46.235248176940573, 552.1520 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400535281373425, 46.235282474621698, 562.1537 ], [ 7.40042411742963, 46.235248176940573, 562.1537 ], [ 7.400535281373425, 46.235282474621698, 552.1520 ], [ 7.400535281373425, 46.235282474621698, 562.1537 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400535281373425, 46.235282474621698, 552.1520 ], [ 7.400519814267865, 46.235306614719399, 552.1520 ], [ 7.400535281373425, 46.235282474621698, 562.1537 ], [ 7.400535281373425, 46.235282474621698, 552.1520 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400519814267865, 46.235306614719399, 562.1537 ], [ 7.400535281373425, 46.235282474621698, 562.1537 ], [ 7.400519814267865, 46.235306614719399, 552.1520 ], [ 7.400519814267865, 46.235306614719399, 562.1537 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400519814267865, 46.235306614719399, 552.1520 ], [ 7.400408650284502, 46.235272317023053, 552.1520 ], [ 7.400519814267865, 46.235306614719399, 562.1537 ], [ 7.400519814267865, 46.235306614719399, 552.1520 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400408650284502, 46.235272317023053, 562.1537 ], [ 7.400519814267865, 46.235306614719399, 562.1537 ], [ 7.400408650284502, 46.235272317023053, 552.1520 ], [ 7.400408650284502, 46.235272317023053, 562.1537 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400408650284502, 46.235272317023053, 552.1520 ], [ 7.40042411742963, 46.235248176940573, 552.1520 ], [ 7.400408650284502, 46.235272317023053, 562.1537 ], [ 7.400408650284502, 46.235272317023053, 552.1520 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.40042411742963, 46.235248176940573, 562.1537 ], [ 7.400408650284502, 46.235272317023053, 562.1537 ], [ 7.40042411742963, 46.235248176940573, 552.1520 ], [ 7.40042411742963, 46.235248176940573, 562.1537 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400535281373425, 46.235282474621698, 562.1537 ], [ 7.400408650284502, 46.235272317023053, 562.1537 ], [ 7.40042411742963, 46.235248176940573, 562.1537 ], [ 7.400535281373425, 46.235282474621698, 562.1537 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400535281373425, 46.235282474621698, 562.1537 ], [ 7.400519814267865, 46.235306614719399, 562.1537 ], [ 7.400408650284502, 46.235272317023053, 562.1537 ], [ 7.400535281373425, 46.235282474621698, 562.1537 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400535281373425, 46.235282474621698, 552.1520 ], [ 7.400408650284502, 46.235272317023053, 552.1520 ], [ 7.400519814267865, 46.235306614719399, 552.1520 ], [ 7.400535281373425, 46.235282474621698, 552.1520 ] ] ] } },
// { "type": "Feature", "properties": { "Layer": "Objets_3DReshaper", "PaperSpace": null, "SubClasses": null, "Linetype": null, "EntityHandle": null, "Text": null }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.400535281373425, 46.235282474621698, 552.1520 ], [ 7.40042411742963, 46.235248176940573, 552.1520 ], [ 7.400408650284502, 46.235272317023053, 552.1520 ], [ 7.400535281373425, 46.235282474621698, 552.1520 ] ] ] } }
// ]
// }),
      sharejson.object=json
      this.projet = chaine_json.AddVectorLayer2(this.olmap);
    },

intersection : function(){
    
    
    
    var projet = polygon(sharejson.data.features[0].geometry.coordinates);
    //turf.polygonize
    //geojsonObject.features[0].geometry.coordinates
    console.log(projet);

    var air_implant = polygon(sharedproject.data.features[0].geometry.coordinates);
        console.log(air_implant);
    
    // {
    // "type": "FeatureCollection",
    // "name": "Projet_test",
    // "crs": { "type": "name", "properties": { "name": "EPSG:4326" } },
    // "features": [
    // { "type": "Feature", "properties": { }, "geometry": { "type": "Polygon", "coordinates": [ [ [ 7.401150372542284, 46.235605880314871 ], [ 7.399830108041084, 46.235331953263326 ], [ 7.399914698308324, 46.235136647041486 ], [ 7.401224726130267, 46.235405242285502 ], [ 7.401150372542284, 46.235605880314871 ] ] ] } }
    // ]
    // }




    //var limite_construction = polygon(air_implant.features[0].geometry.coordinates);

    // polygon([[
    //     [2, 2],
    //     [3, 2],
    //     [3, 10],
    //     [2, 3],
    //     [2, 2]
    // ]]);

    var intersectionnn = turf.booleanContains(air_implant, projet);
    console.log(intersectionnn);
    },



  },

  mounted() {



    //faire une liste et une boucle
    this.olmap = this.setupOpenlayersMap(this.center3857,this.zoom);
    this.mapbox_rues = import_base.setupmapbox(this.mapbox_url_rues, this.mapbox_name_rues, true, this.olmap)
    this.mapbox_satellite = import_base.setupmapbox(this.mapbox_url_satellite, this.mapbox_name_satellite, false, this.olmap)
    
    this.surface_cs = import_json.AddVectorLayer( "geojson/MO_CS_WGS84.geojson",this.olmap, false, 'surface_cs');
    this.od_lineaire = import_json.AddVectorLayer( "geojson/MO_OD_Autre_lineaire_WGS84.geojson",this.olmap, false, 'od_lineaire');
    this.od_surfacique = import_json.AddVectorLayer( "geojson/MO_OD_Autre_Surfacique_WGS84.geojson",this.olmap, false, 'od_surfacique');
    this.aire_implantation = import_json.AddVectorLayer( "geojson/Aire_Implantation.geojson",this.olmap);
    this.batiment = import_json.AddVectorLayer('geojson/MO_CS_Batiment_WGS84.geojson',this.olmap, false, 'batiment');
    this.bien_fond = import_json.AddVectorLayer( "geojson/MO_BF_Parcelle_WGS84.geojson",this.olmap, false, 'bien_fond');
    //this.projet = import_json.AddVectorLayer( "geojson/cesium_projet_test.geojson",this.olmap,true);
    this.air_implant=air_implant.init();
    // console.log(sharedproject.data);
    // console.log(sharejson.data);
    
    
    //sharejson.data = "HELLO"
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