import { sharedproject } from './json_data.js';
function loadJSON(callback) {

    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'geojson/Aire_Implantation.geojson', true)
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == "200") {
            // Required use of an anonymous callback as .open will NOT return a value but simply returns undefined in asynchronous mode
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
};
export function init() {
    let that = this
    loadJSON(function (response) {
        // Parse JSON string into object
        sharedproject.data = JSON.parse(response);
        //sharedproject.data = data;
        console.log(sharedproject.data);
        //that.messages = data.messages
    });
};