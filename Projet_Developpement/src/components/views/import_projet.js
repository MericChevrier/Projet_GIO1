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
        return reader
    }
    export function openFile(func) {

        fileInput = document.createElement("input")
        fileInput.type='file'
        fileInput.style.display='none'
        fileInput.func=func
        fileInput.onchange=readFile

        document.body.appendChild(fileInput)
        clickElem(fileInput)
        console.log(fileInput)
        
    }
export let fileInput

