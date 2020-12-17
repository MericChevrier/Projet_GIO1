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
