/**
 * @author Joy Nag
 */
var Ti = Titanium;
var fileOpen = false;
var openFilePath = null;

$(document).ready(function() {
    $(window).resize(function(){
    var elem = $(this);
    var height = elem.height() - $('div#header').height() -  $('ul#buttons').height() - $('div.info').height() - 150;
    $('textarea.bangla').height(height);
    });
    $(window).resize();
    $("textarea.bangla").focus();
    $(".bangla").bnKb({
        'switchkey': {"webkit":"k","mozilla":"y","safari":"k","chrome":"k","msie":"y"},
        'driver': phonetic
    });
});
function saveToFile() {
    
    if (fileOpen) {
        var writeFile = Titanium.Filesystem.getFile(openFilePath);
        if (writeFile.exists()) {
            
            writeFile.write($('textarea.bangla').val());

            Ti.API.info('File Exists');

        }
        else {
            writeFile.write($('textarea.bangla').val());
            
        }
    }
    else {
        try {

            var options = {
                title: "Save file as...",
                defaultFile: "unnamed.txt",
                types: ['txt'],
                typesDescription: "Text Files",
                multiple: false,
                path: Titanium.Filesystem.getUserDirectory()
            }

            Titanium.UI.openSaveAsDialog(function(filenames) {

                if (filenames[0]) {
                    var writeFile = Titanium.Filesystem.getFile(filenames[0]);
                    
                    if (writeFile.exists()) {

                        writeFile.write($('textarea.bangla').val());
                        Ti.API.info('File Exists');

                    }
                    else {
                        writeFile.write($('textarea.bangla').val());
                       
                    }

                }
            }, options);
            $("textarea.bangla").focus();
        } catch (squash) {
            alert(squash);
        }
    }
}
function openFile() {
    var options = {
        multiple: false,
        title: "Select files to open...",
        types: ['txt'],
        typesDescription: "Documents",
        path: Titanium.Filesystem.getUserDirectory()
    }
    Titanium.UI.openFileChooserDialog(function(filenames) {
        if (filenames[0]) {
            var readFile = Titanium.Filesystem.getFile(filenames[0]);
            if (readFile.exists()) {
                var readContents = readFile.read();
                var doc = readContents;
                $('textarea.bangla').val(doc);
                fileOpen = true;
                openFilePath = filenames[0];
                Ti.API.info('File Exists');

            }
        $("textarea.bangla").focus();
        }
    }, options);
}


function copyToClipBoard() {
    var textToCopy = $('textarea.bangla').val();
    Titanium.API.debug("Data From: text area: " + textToCopy);
    Titanium.UI.Clipboard.setText(textToCopy);
    //alert(Titanium.UI.Clipboard.getText());
    Titanium.API.debug(Titanium.UI.Clipboard.getText());
    $("textarea.bangla").focus();
    //alert(textToCopy);
}

function clearSlate() {
    //Titanium.App.exit();
    $('textarea.bangla').val('');
}

function changeLayout(){
    val = $('#changelayout').val();
    Ti.API.debug("Value is: " + val);
    if(val && val == '1')
        enablePhonetic();
    else
        enableProbhat();
}
function enablePhonetic() {
    Titanium.API.debug("In Phonetic.");
    $(".bangla").bnKb(
    {'switchkey': {"webkit":"k","mozilla":"y","safari":"k","chrome":"k","msie":"y"},
        'driver': phonetic});
    $(".bangla").focus();
}

function enableProbhat() {
    Titanium.API.debug("In probhat.");
    $(".bangla").bnKb(
    {'switchkey': {"webkit":"k","mozilla":"y","safari":"k","chrome":"k","msie":"y"},
        'driver': probhat});
    $(".bangla").focus();
}
function increaseFont(){
    var currentFontSize = $('textarea.bangla').css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*1.2;
    $('textarea.bangla').css('font-size', newFontSize);
    $("textarea.bangla").focus();
    return false;
}

function decreaseFont(){
    var currentFontSize = $('textarea.bangla').css('font-size');
    var currentFontSizeNum = parseFloat(currentFontSize, 10);
    var newFontSize = currentFontSizeNum*0.8;
    $('textarea.bangla').css('font-size', newFontSize);
    $("textarea.bangla").focus();
    return false;
}