$(document).ready(function() {
      if(isAPIAvailable()) {
        $('#files').bind('change', handleFileSelect);
      }
    });

function isAPIAvailable() {
      // Check for the various File API support.
      if (window.File && window.FileReader && window.FileList && window.Blob) {
        // Great success! All the File APIs are supported.
        return true;
      } else {
        // source: File API availability - http://caniuse.com/#feat=fileapi
        // source: <output> availability - http://html5doctor.com/the-output-element/
        document.writeln('The HTML5 APIs used in this form are only available in the following browsers:<br />');
        // 6.0 File API & 13.0 <output>
        document.writeln(' - Google Chrome: 13.0 or later<br />');
        // 3.6 File API & 6.0 <output>
        document.writeln(' - Mozilla Firefox: 6.0 or later<br />');
        // 10.0 File API & 10.0 <output>
        document.writeln(' - Internet Explorer: Not supported (partial support expected in 10.0)<br />');
        // ? File API & 5.1 <output>
        document.writeln(' - Safari: Not supported<br />');
        // ? File API & 9.2 <output>
        document.writeln(' - Opera: Not supported');
        return false;
      }
    }
function handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
      var file = files[0];
      printTable(file);
    }
    function printTable(file) {
        var header = parseInt(document.getElementById("value"));
      var reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function(event){
        var csv = event.target.result;
        var data = $.csv.toArrays(csv);
       var list;
       for(int i=0;i<data[header].length;i++){
       list[i]=data[header][i];
       }
       
      };
      reader.onerror = function(){ alert('Unable to read ' + file.fileName); };
    }
