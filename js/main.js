/* Main script for Vanade WEO */
// Requires filemanager.js, localstorage.js, ftp-connect.js, openfile.js
var infoabout='';
var newfile=
'<h2>New File</h2>\n'+
'<form action="javascript:addFileData()" method="get" id="filedata">\n'+
'<p><label for="filetype">File type: </label>\n<select id="filetype" onchange="offerData()">\n'+
'<option>Blank Text</option>\n'+
'<option>HTML5 Webpage</option>\n'+
'<option>XHTML Webpage</option>\n'+
'<option>CSS Style</option>\n'+
'<option>SVG Image</option>\n'+
'<option>Javascript Script</option>\n'+
'<option>PHP Code</option>\n'+
'</select><select id="xhtmltype" style="visibility:hidden" onchange="offerName()">\n'+
'<option>1.1</option>\n'+
'<option>1.0 Strict</option>\n'+
'<option>1.0 Transitional</option>\n'+
'<option>1.0 Frameset</option>\n'+
'</select></p>\n'+
'<p><label for="filename">File name: </label><input type="text" id="filename" value="file.txt" /></p>\n'+
'<p><label for="filepath">File path: </label><input type="text" id="filepath" /></p>\n'+
'<p><label for="fileftp">FTP path: </label><input type="text" id="fileftp" /></p>\n'+
'<p><label for="filemime">Mime-type: </label><input type="text" id="filemime" value="text/plain" /></p>\n'+
'<p><button type="button" onclick="display(\'none\')">Cancel</button> <input type="submit" value="Create" /></p>\n'+
'</form>';
var openfile=
'<h2>Open File</h2>\n'+
'<form action="javascript:openFile()" method="get" id="filedata">\n'+
'<p><label for="fileurl">URL: </label><br/><select id="fileloc">\n'+
'<option>http://</option>\n'+
'<option>file://</option>\n'+
'<option></option>\n'+
'</select><input type="text" id="fileurl" /></p>\n'+
'<p><button type="button" onclick="display(\'none\')">Cancel</button> <input type="submit" value="Open" /></p>\n'+
'</form>';
var templates=
'<h2>Templates</h2>\n'+
'<h3>HTML5</h3><ul><li onclick="addTemplate(\'HTML5\',\'basic\')">Basic</li></ul>\n'+
'<p><button type="button" onclick="display(\'none\')">Cancel</button></p>';

function init(){
  infoabout=document.getElementById('infobox').innerHTML;
  document.getElementById('menubar').addEventListener('click',displayMenu,false);
  for(var i=0;i<databases.length;i++){
    database[i]=getTSV(databases[i]);
    debug('Loaded '+databases[i]);
  }
  loadLocalStorage(); // Requires localstorage.js
  loadFtpConnectionData(); // Requires ftp-connect.js
}

/** STATUSBAR **/
function showCode(){
  document.getElementById('editor').style.width='100%';
  document.getElementById('editor').style.height='100%';
  if(opSplit.charAt(0)=='H'){
    document.getElementById('preview').style.height='0';
  }
  else{
    document.getElementById('preview').style.width='0';
  }
}

function showSplit(){
  if(opSplit.charAt(0)=='H'){
    document.getElementById('editor').style.width='100%';
    document.getElementById('editor').style.height='50%';
    document.getElementById('preview').style.width='100%';
    document.getElementById('preview').style.height='50%';
  }
  else{
    document.getElementById('editor').style.width='50%';
    document.getElementById('editor').style.height='100%';
    document.getElementById('preview').style.width='50%';
    document.getElementById('preview').style.height='100%';
  }
}

function showPreview(){
  if(opSplit.charAt(0)=='H'){
    document.getElementById('editor').style.height='0';
  }
  else{
    document.getElementById('editor').style.width='0';
  }
  document.getElementById('preview').style.width='100%';
  document.getElementById('preview').style.height='100%';
}

/* ACTIONS */
function display(info){
  if(info=='none'){
    document.getElementById('blackarea').style.display='none';
    document.getElementById('splash').style.display='none';
    document.getElementById('infobox').style.display='none';
    document.getElementById('todo').style.display='none';
  }
  else if(info=='about'){
    document.getElementById('blackarea').style.display='block';
    var infobox=document.getElementById('infobox');
    infobox.innerHTML=infoabout;
    infobox.style.width='600px';
    infobox.style.height='400px';
    infobox.style.marginTop='-200px';
    infobox.style.marginLeft='-300px';
    infobox.style.display='block';
  }
  else if(info=='newfile'){
    document.getElementById('blackarea').style.display='block';
    var infobox=document.getElementById('infobox');
    infobox.innerHTML=newfile;
    infobox.style.width='480px';
    infobox.style.height='320px';
    infobox.style.marginTop='-160px';
    infobox.style.marginLeft='-240px';
    infobox.style.display='block';
  }
  else if(info=='openfile'){
    document.getElementById('blackarea').style.display='block';
    var infobox=document.getElementById('infobox');
    infobox.innerHTML=openfile;
    infobox.style.width='480px';
    infobox.style.height='320px';
    infobox.style.marginTop='-160px';
    infobox.style.marginLeft='-240px';
    infobox.style.display='block';
  }
  else if(info=='templates'){
    document.getElementById('blackarea').style.display='block';
    var infobox=document.getElementById('infobox');
    infobox.innerHTML=templates;
    infobox.style.width='480px';
    infobox.style.height='320px';
    infobox.style.marginTop='-160px';
    infobox.style.marginLeft='-240px';
    infobox.style.display='block';
  }
  else if(info=='options'){
    document.getElementById('blackarea').style.display='block';
    var infobox=document.getElementById('infobox');
    isOpClosetabs=(opClosetabs)? ' checked="true"':'';
    infobox.innerHTML=
'<h2>Preferences</h2>\n'+
'<p><label>Split Code &amp; Preview: <select id="opSplit"><option>Vertical</option><option>Horizontal</option></select></label> [default: Vertical]</p>\n'+
'<p><label><input type="checkbox" id="opClosetabs"'+isOpClosetabs+' /> Alert on closing tabs*.</label> [default: Yes]</p>\n'+
'<p class="important">*Closed tabs will be lost forever; download before closing is encouraged to prevent losing data.</p>\n'+
'</div><p><button type="button" onclick="display(\'none\')">Cancel</button> <button type="button" onclick="saveOptions()">Save</button></p>\n'+

'<h3>Highlight Colors:</h3><div id="hl">\n'+
'<p><label for="hlGcomment">Comments: </label>#<input type="text" id="hlGcomment" value="'+hlGcomment+'" onchange="document.getElementById(\'hlGcommentBox\').style.background=\'#\'+this.value" /> <span id="hlGcommentBox" class="hlbox" style="background:#'+hlGcomment+'"></span> [default: 999]</p>\n'+
'<p><label for="hlGstring">Strings: </label>#<input type="text" id="hlGstring" value="'+hlGstring+'" onchange="document.getElementById(\'hlGstringBox\').style.background=\'#\'+this.value" /> <span id="hlGstringBox" class="hlbox" style="background:#'+hlGstring+'"></span> [default: a22]</p>\n'+

'<h4>XML &amp; HTML</h4>\n'+
'<p><label for="hlXdoct">DOCTYPE: </label>#<input type="text" id="hlXdoct" value="'+hlXdoct+'" onchange="document.getElementById(\'hlXdoctBox\').style.background=\'#\'+this.value" /> <span id="hlXdoctBox" class="hlbox" style="background:#'+hlXdoct+'"></span> [default: 48a]</p>\n'+
'<p><label for="hlXtag">Tags: </label>#<input type="text" id="hlXtag" value="'+hlXtag+'" onchange="document.getElementById(\'hlXtagBox\').style.background=\'#\'+this.value" /> <span id="hlXtagBox" class="hlbox" style="background:#'+hlXtag+'"></span> [default: a0b]</p>\n'+
'<p><label for="hlXattri">Attribute: </label>#<input type="text" id="hlXattri" value="'+hlXattri+'" onchange="document.getElementById(\'hlXattriBox\').style.background=\'#\'+this.value" /> <span id="hlXattriBox" class="hlbox" style="background:#'+hlXattri+'"></span> [default: 281]</p>\n'+
'<p><label for="hlXattnam">Attribute Name: </label>#<input type="text" id="hlXattnam" value="'+hlXattnam+'" onchange="document.getElementById(\'hlXattnamBox\').style.background=\'#\'+this.value" /> <span id="hlXattnamBox" class="hlbox" style="background:#'+hlXattnam+'"></span> [default: 00f]</p>\n'+
'<p><label for="hlXcdata">CDATA: </label>#<input type="text" id="hlXcdata" value="'+hlXcdata+'" onchange="document.getElementById(\'hlXcdataBox\').style.background=\'#\'+this.value" /> <span id="hlXcdataBox" class="hlbox" style="background:#'+hlXcdata+'"></span> [default: d18]</p>\n'+
'<p><label for="hlXproces">Processing: </label>#<input type="text" id="hlXproces" value="'+hlXproces+'" onchange="document.getElementById(\'hlXprocesBox\').style.background=\'#\'+this.value" /> <span id="hlXprocesBox" class="hlbox" style="background:#'+hlXproces+'"></span> [default: a70]</p>\n'+
'<p><label for="hlXent">Entity: </label>#<input type="text" id="hlXent" value="'+hlXent+'" onchange="document.getElementById(\'hlXentBox\').style.background=\'#\'+this.value" /> <span id="hlXentBox" class="hlbox" style="background:#'+hlXent+'"></span> [default: a22]</p>\n'+

'<h4>CSS</h4>\n'+
'<p><label for="hlSat">@: </label>#<input type="text" id="hlSat" value="'+hlSat+'" onchange="document.getElementById(\'hlSatBox\').style.background=\'#\'+this.value" /> <span id="hlSatBox" class="hlbox" style="background:#'+hlSat+'"></span> [default: 708]</p>\n'+
'<p><label for="hlSunit">Unit: </label>#<input type="text" id="hlSunit" value="'+hlSunit+'" onchange="document.getElementById(\'hlSunitBox\').style.background=\'#\'+this.value" /> <span id="hlSunitBox" class="hlbox" style="background:#'+hlSunit+'"></span> [default: 281]</p>\n'+
'<p><label for="hlSval">Value: </label>#<input type="text" id="hlSval" value="'+hlSval+'" onchange="document.getElementById(\'hlSvalBox\').style.background=\'#\'+this.value" /> <span id="hlSvalBox" class="hlbox" style="background:#'+hlSval+'"></span> [default: 708]</p>\n'+
'<p><label for="hlSid">Identifier: </label>#<input type="text" id="hlSid" value="'+hlSid+'" onchange="document.getElementById(\'hlSidBox\').style.background=\'#\'+this.value" /> <span id="hlSidBox" class="hlbox" style="background:#'+hlSid+'"></span> [default: 000]</p>\n'+
'<p><label for="hlSsel">Selector: </label>#<input type="text" id="hlSsel" value="'+hlSsel+'" onchange="document.getElementById(\'hlSselBox\').style.background=\'#\'+this.value" /> <span id="hlSselBox" class="hlbox" style="background:#'+hlSsel+'"></span> [default: 11b]</p>\n'+
'<p><label for="hlSimp">Important: </label>#<input type="text" id="hlSimp" value="'+hlSimp+'" onchange="document.getElementById(\'hlSimpBox\').style.background=\'#\'+this.value" /> <span id="hlSimpBox" class="hlbox" style="background:#'+hlSimp+'"></span> [default: 00f]</p>\n'+
'<p><label for="hlScolor">Color Code: </label>#<input type="text" id="hlScolor" value="'+hlScolor+'" onchange="document.getElementById(\'hlScolorBox\').style.background=\'#\'+this.value" /> <span id="hlScolorBox" class="hlbox" style="background:#'+hlScolor+'"></span> [default: 299]</p>\n'+

'<h4>JavaScript</h4>\n'+
'<p><label for="hlJkword">Keyword: </label>#<input type="text" id="hlJkword" value="'+hlJkword+'" onchange="document.getElementById(\'hlJkwordBox\').style.background=\'#\'+this.value" /> <span id="hlJkwordBox" class="hlbox" style="background:#'+hlJkword+'"></span> [default: 90b]</p>\n'+
'<p><label for="hlJatom">Atom: </label>#<input type="text" id="hlJatom" value="'+hlJatom+'" onchange="document.getElementById(\'hlJatomBox\').style.background=\'#\'+this.value" /> <span id="hlJatomBox" class="hlbox" style="background:#'+hlJatom+'"></span> [default: 291]</p>\n'+
'<p><label for="hlJdef">Variable Definition: </label>#<input type="text" id="hlJdef" value="'+hlJdef+'" onchange="document.getElementById(\'hlJdefBox\').style.background=\'#\'+this.value" /> <span id="hlJdefBox" class="hlbox" style="background:#'+hlJdef+'"></span> [default: 00f]</p>\n'+
'<p><label for="hlJloc">Local Variable: </label>#<input type="text" id="hlJloc" value="'+hlJloc+'" onchange="document.getElementById(\'hlJlocBox\').style.background=\'#\'+this.value" /> <span id="hlJlocBox" class="hlbox" style="background:#'+hlJloc+'"></span> [default: 049]</p>\n'+

'<h4>PHP</h4>\n'+
'<p><label for="hlPkword">Keyword: </label>#<input type="text" id="hlPkword" value="'+hlPkword+'" onchange="document.getElementById(\'hlPkwordBox\').style.background=\'#\'+this.value" /> <span id="hlPkwordBox" class="hlbox" style="background:#'+hlPkword+'"></span> [default: 90b]</p>\n'+
'<p><label for="hlPnum">Number: </label>#<input type="text" id="hlPnum" value="'+hlPnum+'" onchange="document.getElementById(\'hlPnumBox\').style.background=\'#\'+this.value" /> <span id="hlPnumBox" class="hlbox" style="background:#'+hlPnum+'"></span> [default: 291]</p>\n'+
'<p><label for="hlPpre">Preprocessor: </label>#<input type="text" id="hlPpre" value="'+hlPpre+'" onchange="document.getElementById(\'hlPpreBox\').style.background=\'#\'+this.value" /> <span id="hlPpreBox" class="hlbox" style="background:#'+hlPpre+'"></span> [default: 049]</p>\n'+
'<p><label for="hlPvar">Variable: </label>#<input type="text" id="hlPvar" value="'+hlPvar+'" onchange="document.getElementById(\'hlPvarBox\').style.background=\'#\'+this.value" /> <span id="hlPvarBox" class="hlbox" style="background:#'+hlPvar+'"></span> [default: 22b]</p>\n'+

'</div><p><button type="button" onclick="display(\'none\')">Cancel</button> <button type="button" onclick="saveOptions()">Save</button></p>';
    document.getElementById('opSplit').value=opSplit;
    infobox.style.width='600px';
    infobox.style.unopuheight='400px';
    infobox.style.marginTop='-200px';
    infobox.style.marginLeft='-300px';
    infobox.style.display='block';
  }
  else if(info=='filedata'){
   if(fileTabs.length>0){
    document.getElementById('blackarea').style.display='block';
    var infobox=document.getElementById('infobox');
    infobox.innerHTML=
'<h2>File Properties</h2>\n'+
'<form action="javascript:saveFileData()" method="get" id="filedata">\n'+
'<p><label for="filename">File name: </label><input type="text" value="'+fileTabs[currentTab][0]+'" id="filename" /></p>\n'+
'<p><label for="filepath">File path: </label><input type="text" value="'+fileTabs[currentTab][1]+'" id="filepath" /></p>\n'+
'<p><label for="fileftp">FTP path: </label><input type="text" value="'+fileTabs[currentTab][2]+'" id="fileftp" /></p>\n'+
'<p><label for="filemime">Mime-type: </label><input type="text" value="'+fileTabs[currentTab][3]+'" id="filemime" /></p>\n'+
'<button type="button" onclick="display(\'none\')">Cancel</button> <input type="submit" value="Save" />\n'+
'</form>';
    infobox.style.width='480px';
    infobox.style.height='280px';
    infobox.style.marginTop='-140px';
    infobox.style.marginLeft='-240px';
    infobox.style.display='block';
   }
  }// Requires filemanager.js
  else{
    document.getElementById('blackarea').style.display='block';
    document.getElementById(info).style.display='block';
  }
  debug('Displayed '+info);
}

function saveFileData(){
  fileTabs[currentTab][0]=document.getElementById('filename').value;
  fileTabs[currentTab][1]=document.getElementById('filepath').value;
  fileTabs[currentTab][2]=document.getElementById('fileftp').value;
  fileTabs[currentTab][3]=document.getElementById('filemime').value;
  updateFileTabs();
  display('none');
  debug('Saved File Data');
}// Requires filemanager.js

function offerData(){
  var ftype=document.getElementById('filetype').value;
  var mtype=document.getElementById('filemime');
  var xtype=document.getElementById('xhtmltype');
  var fname=document.getElementById('filename');
  xtype.style.visibility='hidden';
  if(ftype.indexOf('HTML5')>=0){
    fname.value='index.html';
    mtype.value='text/html';
  }
  else if(ftype.indexOf('XHTML')>=0){
    if(xtype.value.indexOf('1.1')>=0){
      fname.value='index.xhtml'
      mtype.value='application/xhtml+xml';
    }else{
      fname.value='index.html';
      mtype.value='text/html';
    }
    xtype.style.visibility='visible';
  }
  else if(ftype.indexOf('CSS')>=0){
    fname.value='style.css';
    mtype.value='text/css';
  }
  else if(ftype.indexOf('SVG')>=0){
    fname.value='image.svg';
    mtype.value='image/svg+xml';
  }
  else if(ftype.indexOf('Javascript')>=0){
    fname.value='script.js';
    mtype.value='application/javascript';
  }
  else if(ftype.indexOf('PHP')>=0){
    fname.value='code.php';
    mtype.value='application/x-httpd-php';
  }
  else if(ftype.indexOf('Text')>=0){
    fname.value='file.txt';
    mtype.value='text/plain';
  }
}

function insertComment(){
  var mtype=fileTabs[currentTab][3];
  if(mtype.indexOf('html')>0||mtype.indexOf('xml')>0||mtype.indexOf('svg')>0){visualHS.replaceSelection('<!-- '+visualHS.getSelection()+' -->');}
  else{visualHS.replaceSelection('/* '+visualHS.getSelection()+' */');}
}

function insertTag(tag){
  visualHS.replaceSelection('<'+tag+'>'+visualHS.getSelection()+'</'+tag+'>');
}

function insertOmitag(tag){
  if(tag=='img'){visualHS.replaceSelection(visualHS.getSelection()+'<'+tag+' src="" alt="" />');}
  else{visualHS.replaceSelection(visualHS.getSelection()+'<'+tag+' />');}
}

function displayMenu(){
  if(document.getElementById('jsaddable').innerHTML=='')
    document.getElementById('jsaddable').innerHTML='#menubar li:hover ul{display:block}';
  else
    document.getElementById('jsaddable').innerHTML='';
}
