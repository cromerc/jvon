var fileContents = new Array();
var fileNames = new Array();

function handleFileSelect(evt) {
    evt.stopPropagation();
    evt.preventDefault();

    var files = evt.dataTransfer.files;
    for (var i = 0, f; f = files[i]; i++) {
        var file = files[i];

        if (file) {
        var reader = new FileReader();
            reader.onload = (function(theFile) {
                return function (e) {
                    fileNames[fileNames.length] = theFile.name;
                    fileContents[fileContents.length] = e.target.result.substring(0,128);
                    if (fileContents.length == files.length) {
                        compareFiles(fileContents, fileNames);
                    }
                };
            })(f);

            reader.readAsText(file);
        }
        else {
            alert("No se pude abrir los archivos!");
        }
    }
}

function compareFiles(fileContents, fileNames) {
    var found = false;
    for (var i = 0; i < fileContents.length; i++) {
        for (var j = i + 1; j < fileContents.length; j++) {
            if (fileContents[i] == fileContents[j]) {
                alert(fileNames[i] + "\r\n\r\n" + fileNames[j] + "\r\n\r\nTienen los mismos identificadores!");
                found = true;
            }
        }
    }
    if (found == false) {
        alert("Ningun identificador era lo mismo!");
    }
    resetArrays();
}

function resetArrays() {
    fileNames = new Array();
    fileContents = new Array();
}

function handleDragOver(evt) {
    evt.stopPropagation();
    evt.preventDefault();
    evt.dataTransfer.dropEffect = 'copy';
}

function initialize() {
    var dropZone = document.getElementById('drop_zone');
    dropZone.addEventListener('dragover', handleDragOver, false);
    dropZone.addEventListener('drop', handleFileSelect, false);
}