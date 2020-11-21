<template>
  <div id="ol-container" class="map">
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
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" name="point_limite" onclick="change_point_limite(this.checked)"> Point limite</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" name="biend_fonds" onclick="LayerVisibility(this.checked, this.name)"> Biend-fonds / DDP</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" name="batiment" onclick="change_batiment(this.checked)"> Bâtiment</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" name="objets_lineaire" onclick="change_objets_lineaire(this.checked)"> Objets linéaires</label></p>
		  		<p><label class="is-size-7 has-text-black"><input type="checkBox" name="objets_surfacique" onclick="change_objets_surfacique(this.checked)"> Objets surfaciques</label></p>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" name="couverture_du_sol" onclick="changecouverture_du_sol(this.checked)"> Couverture du sol</label></p>
			  	<h3 class="subtitle is-6 has-text-left has-text-weight-light"><U>Restrictions :</U></h3>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" name="distances_aux_limites" onclick="change_distances_aux_limites(this.checked)"> Distances aux limites</label></p>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" name="distances_aux_forêt" onclick="change_distances_aux_forêt(this.checked)"> Distances aux forêt</label></p>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" name="distances_cours_deau" onclick="change_distances_cours_deau(this.checked)"> Distances aux cours d'eau</label></p>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" name="alignements_routes" onclick="change_alignements_routes(this.checked)"> Alignements routes</label></p>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" name="aire_implantation" onclick="change_aire_implantation(this.checked)"> Aire d'implantation</label></p>
			  	<p><label class="is-size-7 has-text-black"><input type="checkBox" name="zone_affectation" onclick="change_zone_affectation(this.checked)"> Zone d'affectation</label></p>
          <!--<button type="button" name="import_projet" id="import_projet" onclick="poly_draw()">Importer un nouveau projet</button>-->
		  	</div>
  	</div>

    <!--Menu de droite - information sur le projet--> 
		<div id="menu_droite">
			<div id="information_projet">
				<h1 class="title is-4">Information</h1>
				<button class="button is-small" type="button" name="import_dxf" id="import_dxf" onclick="openFile(dispFile)">Importer .json</button>
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
import * as olProj from 'ol/proj';




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

    setupmapbox (url, name, visibility) {
      var name = new TileLayer({
        source: new XYZ({
          url: url
        }),
        visible: visibility,
      })
      
      this.olmap.addLayer(name)
      return name
     
    },

    //Affichage du fond de carte
		changeBaselayer : function (layer) {
      console.log("changeBaselayer(\"" + layer + "\")");
      console.log(this.mapbox_rues);

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

  },

  mounted() {
    this.olmap = this.setupOpenlayersMap(this.center3857,this.zoom);
    this.mapbox_rues = this.setupmapbox(this.mapbox_url_rues, this.mapbox_name_rues, true)
    this.mapbox_satellite = this.setupmapbox(this.mapbox_url_satellite, this.mapbox_name_satellite, false)

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
</style>