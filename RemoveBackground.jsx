var sourceFolder = Folder("C:\\ps\\src");

docLay=app.activeDocument.layers;
l=app.activeDocument.layers.length;


  if (sourceFolder != null)
  {
     var fileList = sourceFolder.getFiles();
	 //comment the above line and uncomment the following line to filter specific file types. the script will not work if you have any non-image file in the src folder so try filtering files types if the script fails.
	 // var fileList = sourceFolder..getFiles(/\.(jpg|tif|psd|crw|cr2|nef|dcr|dc2|raw|heic)$/i);
  }

for(var a = 0 ;a < fileList.length; a++){
    
app.open(fileList[a]);

// Select subject


var idautoCutout = stringIDToTypeID( "autoCutout" );
var desc01 = new ActionDescriptor();
var idsampleAllLayers = stringIDToTypeID( "sampleAllLayers" );
desc01.putBoolean( idsampleAllLayers, false );
try{
executeAction( idautoCutout, desc01, DialogModes.NO );
}


catch(err){}


// Invert the selection
app.activeDocument.selection.invert();

/* Uncomment this code for a solid color background and comment the code from 57 to 85


// Create a color to be used with the fill command

var colorRef = new SolidColor

colorRef.rgb.red = 255

colorRef.rgb.green = 255

colorRef.rgb.blue = 255



// Now apply fill to the current selection

app.activeDocument.selection.fill(remove);
//Uncomment the line below if you want to close the document.
//app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

*/



var topLayer = app.activeDocument.layers[0];
app.activeDocument.activeLayer = topLayer;


//remove the lock from the layer
do{
    unlockLayer();
    selectLayerBelow();
}while(topLayer != app.activeDocument.activeLayer)
function unlockLayer(){
    if(app.activeDocument.activeLayer.isBackgroundLayer ) app.activeDocument.activeLayer.name = 'From Background';
    if(app.activeDocument.activeLayer.allLocked) app.activeDocument.activeLayer.allLocked = false;
    if(app.activeDocument.activeLayer.pixelsLocked) app.activeDocument.activeLayer.pixelsLocked = false;
    if(app.activeDocument.activeLayer.positionLocked) app.activeDocument.activeLayer.positionLocked = false;
    if(app.activeDocument.activeLayer.transparentPixelsLocked) app.activeDocument.activeLayer.transparentPixelsLocked = false;
};
function selectLayerBelow(){
    var desc = new ActionDescriptor();
        var ref = new ActionReference();
        ref.putEnumerated( charIDToTypeID( "Lyr " ), charIDToTypeID( "Ordn" ), charIDToTypeID( "Bckw" ) );
    desc.putReference( charIDToTypeID( "null" ), ref );
    desc.putBoolean( charIDToTypeID( "MkVs" ), false );
    executeAction( charIDToTypeID( "slct" ), desc, DialogModes.NO );
};
//clear the selection 
app.activeDocument.selection.clear();


var Name = decodeURI(app.activeDocument.name).replace(/\.[^\.]+$/, '');
var saveFile = new Folder("C:\\ps\\out");
sfwPNG24(saveFile);
//Uncomment the line below if you want to close the document.
//app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);

 }
 
 sfwPNG24(saveFile);
 





function sfwPNG24(saveFile){

var pngOpts = new PNGSaveOptions;

pngOpts.compression = 9;

pngOpts.interlaced = false;

activeDocument.saveAs(saveFile, pngOpts, true, Extension.LOWERCASE);

}



