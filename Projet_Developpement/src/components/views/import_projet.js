import * as import_json from './import_json.js';
export function dispFile(contents) {
    document.getElementById('contents').innerHTML=contents
    }
    function clickElem(elem) {
        // Thx user1601638 on Stack Overflow (6/6/2018 - https://stackoverflow.com/questions/13405129/javascript-create-and-save-file )
        var eventMouse = document.createEvent("MouseEvents")
        eventMouse.initMouseEvent("click", true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
        elem.dispatchEvent(eventMouse)
    }
    function readFile(e) {
        var file = e.target.files[0];
        if (!file) {
            return;
        }
        var reader = new FileReader();
        reader.onload = function(e) {
            var contents = e.target.result;
            fileInput.func(contents)
            document.body.removeChild(fileInput)
        }
        reader.readAsText(file)
    }
    export function openFile(func) {

        fileInput = document.createElement("input")
        fileInput.type='file'
        fileInput.style.display='none'
        fileInput.onchange=readFile
        fileInput.func=func
        document.body.appendChild(fileInput)
        clickElem(fileInput)
    }

export let fileInput

export function importJSON(olmap){
    var file = readSingleFile(e);
    console.log(file);
}