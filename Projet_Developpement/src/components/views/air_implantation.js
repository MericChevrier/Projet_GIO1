// constantes globales
import { shared_aire_implantation } from './const_globales.js';

// chargement du geojson des aires d'implantation de la commune et affectation à une constante globale
export function loadJSON() {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'geojson/Aire_Implantation.geojson', true)
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Parse JSON string into object
            shared_aire_implantation.data = JSON.parse(xobj.responseText);
        }
    };
    xobj.send(null);
};