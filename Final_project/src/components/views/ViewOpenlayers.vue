<template>
  <div id="ol-container" class="map"></div>
  <div id="menu_gauche">
			<div id="situation">
				<h1>Situation</h1>
				<input type="search" id="search" name="barre_recherche"><button>Recherche</button>
				<h2>Gestion des couches :</h2>
				<h3>Fond de plan</h3>
				<p><label><input type="radio" name="baselayer" value="mapbox_rues" onclick="changeBaselayer(this.value)" checked>Fond Rues</label></p>
				<p><label><input type="radio" name="baselayer" value="mapbox_satellite" onclick="changeBaselayer(this.value)" />Fond Satellite</label></p>
				<p><label><input type="radio" name="baselayer" value="blanc" onclick="changeBaselayer(this.value)" />Fond Blanc</label></p>
				<h3>Mensuration officielle :</h3>
				<p><label><input type="checkBox" name="point_limite" onclick="change_point_limite(this.checked)">Point limite</label></p>
				<p><label><input type="checkBox" name="biend_fonds" onclick="LayerVisibility(this.checked, this.name)">Biend-fonds / DDP</label></p>
				<p><label><input type="checkBox" name="batiment" onclick="change_batiment(this.checked)">Bâtiment</label></p>
				<p><label><input type="checkBox" name="objets_lineaire" onclick="change_objets_lineaire(this.checked)">Objets linéaires</label></p>
				<p><label><input type="checkBox" name="objets_surfacique" onclick="change_objets_surfacique(this.checked)">Objets surfaciques</label></p>
				<p><label><input type="checkBox" name="couverture_du_sol" onclick="changecouverture_du_sol(this.checked)">Couverture du sol</label></p>
				<h3>Restrictions :</h3>
				<p><label><input type="checkBox" name="distances_aux_limites" onclick="change_distances_aux_limites(this.checked)">Distances aux limites</label></p>
				<p><label><input type="checkBox" name="distances_aux_forêt" onclick="change_distances_aux_forêt(this.checked)">Distances aux forêt</label></p>
				<p><label><input type="checkBox" name="distances_cours_deau" onclick="change_distances_cours_deau(this.checked)">Distances aux cours d'eau</label></p>
				<p><label><input type="checkBox" name="alignements_routes" onclick="change_alignements_routes(this.checked)">Alignements routes</label></p>
				<p><label><input type="checkBox" name="aire_implantation" onclick="change_aire_implantation(this.checked)">Aire d'implantation</label></p>
				<p><label><input type="checkBox" name="zone_affectation" onclick="change_zone_affectation(this.checked)">Zone d'affectation</label></p>
        <button type="button" name="import_projet" id="import_projet" onclick="poly_draw()">Importer un nouveau projet</button>
			</div>
	</div>
</template>

<script>
import 'ol/ol.css';
import Map from 'ol/Map';
import OSM from 'ol/source/OSM';
import TileLayer from 'ol/layer/Tile';
import View from 'ol/View';
import * as olProj from 'ol/proj';

export default {
  data() {
    return{
      center: [6.659361,46.779389],
      olmap:null,
      zoom: 17
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
        layers: [
          new TileLayer({
            source: new OSM(),
          }) ],
        view: new View({
          center: mapcenter,
          zoom: mapzoom
        })
      })
    }
  },
  mounted() {
    this.olmap = this.setupOpenlayersMap(this.center3857,this.zoom);
  }

}
</script>

<style scoped>
#ol-container {
  height: 500px;
}
</style>