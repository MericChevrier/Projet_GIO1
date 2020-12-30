// fonction asynchrone permettant l'import du projet via le bouton d'import (on utilise le bloc de texte présent à l'intérieur du json)
export function import_json(callback) {
  var jsonfile=document.getElementById('file-input');
    jsonfile.addEventListener('change', function (e) {
      var file = e.target.files[0];
      if (!file) {
        return;
      }
      var reader = new FileReader();
      reader.onload = function (e) {
        var contents = e.target.result;
        callback(contents);
      };
      reader.readAsText(file);
    }, false)
    jsonfile.click();
}
