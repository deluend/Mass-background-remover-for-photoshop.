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
var topLayer = app.activeDocument.layers[0];
app.activeDocument.activeLayer = topLayer;
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
};//remove lock
app.activeDocument.selection.invert();
app.activeDocument.selection.clear();




// Create a color to be used with the fill command




// Now apply fill to the current selection









//fileList[a].remove();
 }
 
 
/*function ExportPNG()
{
    // Confirm the document has already been saved and so has a path to use
    try 
    {
        app.activeDocument.save()
    } catch(e) {
        alert("Could not export PNG as the document is not saved.\nPlease save and try again.")
        return
    }

    // Store the active doc handle in variable
    var originalDoc = app.activeDocument
    
    // Check there is at least 1 visible layer.
	var foundVisible = false
    for (i = 0; i < originalDoc.layers.length; i++)
    {
        if (originalDoc.layers[i].visible)
        {
            foundVisible = true
			break
        }
    }
	
	if (!foundVisible){
		alert("No visible layers found. PNG export failed.")
		return
	}
	
    // Duplicate. We'll save the duplicate as a .png and close it.
    var newDoc = originalDoc.duplicate()
    
    // Photoshop must have a visible layer selected to merge visible layers, so we ensure there is one selected.
    var dummyVisibleLayer = newDoc.artLayers.add();
    newDoc.activeLayer = dummyVisibleLayer
    
    // Merge the layers.
    newDoc.mergeVisibleLayers()
    
    // Remove all empty layers.
    for (i = newDoc.layers.length-1; i >=0; i--)
    {
        if (!newDoc.layers[i].visible)
        {
            newDoc.layers[i].remove()
        }
    }
    
    // Set up PNG save options.
    pngOptions = new PNGSaveOptions()
    pngOptions.compression = 0
    pngOptions.interlaced = false
    
    // Set up destination path.
    savePath = new Folder("C:\\ps\\out");
    
    // Save!
    newDoc.saveAs(savePath, pngOptions, false, Extension.LOWERCASE)
    
    // Close the duplicate.
    newDoc.close()
    
    // Just in case, make sure the active document is the orignal one.
    app.activeDocument=originalDoc
	app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);
}

ExportPNG() */ 

var Name = decodeURI(app.activeDocument.name).replace(/\.[^\.]+$/, '');


var saveFile = new Folder("C:\\ps\\out");


sfwPNG24(saveFile);


//Uncomment the line below if you want to close the document.


app.activeDocument.close(SaveOptions.DONOTSAVECHANGES);





function sfwPNG24(saveFile){


var pngOpts = new PNGSaveOptions;


pngOpts.compression = 9;


pngOpts.interlaced = false;


activeDocument.saveAs(saveFile, pngOpts, true, Extension.LOWERCASE); 


}

