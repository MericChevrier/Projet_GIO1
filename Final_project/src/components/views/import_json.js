// Ajouter les Geojson
export function AddVerctorLayer(layer_url){
	var layer = new Vector({
		source: new VectorSource({
		url: layer_url,
		format: new GeoJSON(),
    projection : 'EPSG:4326', 
    }),
		visible: false,
		});
this.olmap.addLayer(layer)
return layer
}
