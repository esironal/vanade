// Requires main.js, default-files.js, codemirror.js, ajax.js
var fileTabs=[];
var currentTab=0;
var visualHS;
var updateTimer;
var currentData;

// Update File Tabs
function updateFileTabs(){
  var tabs=document.getElementById('tabs');
  tabs.innerHTML='';
  for(var i=0;i<fileTabs.length;i++){
    if(i==currentTab)
      tabs.innerHTML+='<li class="current">'+fileTabs[i][0]+' <span class="close" onclick="closeFileTab('+i+')">x</span></li>';
    else
      tabs.innerHTML+='<li onclick="loadFileTab('+i+')">'+fileTabs[i][0]+'</li>';
  }
  debug('Updated File Tabs');
}

// Add File Data
function addFileData(){
  var ftype=document.getElementById('filetype').value;
  var filecontent='';
  if(ftype.indexOf('HTML5')>=0){
    filecontent=defaultHTML5;
  }
  else if(ftype.indexOf('XHTML')>=0){
    var xtype=document.getElementById('xhtmltype').value;
    if(xtype.indexOf('1.1')>=0) filecontent=defaultDX1;
    else if(xtype.indexOf('Transitional')>=0) filecontent=defaultDXT;
    else if(xtype.indexOf('Frameset')>=0) filecontent=defaultDXF;
    else filecontent=defaultDXS;
    filecontent+=defaultXHTML;
  }
  else if(ftype.indexOf('CSS')>=0){
    filecontent=defaultCSS;
  }
  else if(ftype.indexOf('SVG')>=0){
    filecontent=defaultSVG;
  }
  else if(ftype.indexOf('Javascript')>=0){
    filecontent=defaultJS;
  }
  else if(ftype.indexOf('PHP')>=0){
    filecontent=defaultPHP;
  }
  fileTabs.push([document.getElementById('filename').value,document.getElementById('filepath').value,document.getElementById('fileftp').value,document.getElementById('filemime').value,filecontent]);
  loadFileTab(fileTabs.length-1);
  display('none');
  debug('Added File Data');
}

// addTemplate
function addTemplate(ftype,template){
  var filename='file.txt';
  var filemime='text/plain';
  var filecontent='';
  if(ftype.indexOf('HTML5')>=0){
    filename='index.html';
    filemime='text/html';
    if(template=='basic'){
      filecontent=templateHTML5Basic+templateHTML5Body;
    }
  }
  fileTabs.push([filename,'','',filemime,filecontent]);
  loadFileTab(fileTabs.length-1);
  display('none');
  debug('Added File Data');
}

// Open File
function openFile(){
  fileLoc=document.getElementById('fileloc').value;
  fileUrl=fileLoc+document.getElementById('fileurl').value;
  if (fileUrl==fileLoc){
    document.getElementById('filedata').innerHTML+='<p>Data is missing</p>';
    return;
  }
  var xhr=createXMLHttpRequest();
  xhr.open('POST','php/openfile.php',false);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send('fileurl='+fileUrl);
  var resp=xhr.responseText.split('|||');
  fname=fileUrl.substring(fileUrl.lastIndexOf('/')+1);
  fpath=fileUrl.substring(0,fileUrl.lastIndexOf('/')+1);
  fileTabs.push([fname,fpath,'',resp[0],resp[1]]);
  loadFileTab(fileTabs.length-1);
  display('none');
  debug('Opened File '+fname+', Content-type: '+resp[0]);
}

// Load File Tab
function loadFileTab(num){
  currentTab=num;
  window.clearTimeout(updateTimer);
  if(visualHS!=null) document.getElementById('editor').removeChild(visualHS.getWrapperElement());
  updateFileTabs();
  if(fileTabs.length>0){
    document.getElementById('container').style.display='block';
    document.getElementById('code').value=fileTabs[currentTab][4];
    var prev=document.getElementById('previewframe').contentDocument;
    var mtype=fileTabs[currentTab][3];

    if(mtype.indexOf('html')>=0){
      visualHS=CodeMirror.fromTextArea(document.getElementById("code"),{mode:'text/html',indentUnit:2,indentWithTabs:true,enterMode:'keep',lineNumbers:true}); // Requires codemirror.js
      prev.open();
      prev.write('<base href="'+fileTabs[currentTab][1]+'" />'+fileTabs[currentTab][4]);
      prev.close();
      currentData='xhtml';
      updatePreview();
    }
    else if(mtype.indexOf('xml')>=0 || mtype.indexOf('svg')>=0){
      visualHS=CodeMirror.fromTextArea(document.getElementById("code"),{mode:'application/xml',indentUnit:2,indentWithTabs:true,enterMode:'keep',lineNumbers:true}); // Requires codemirror.js
      prev.open();
      prev.write('<base href="'+fileTabs[currentTab][1]+'" />'+fileTabs[currentTab][4]);
      prev.close();
      currentData=null;
      updatePreview();
    }
    else{
      visualHS=CodeMirror.fromTextArea(document.getElementById("code"),{mode:fileTabs[currentTab][3],indentUnit:2,indentWithTabs:true,enterMode:'keep',lineNumbers:true}); // Requires codemirror.js
      prev.open();
      prev.write('<h1>Content-type is '+fileTabs[currentTab][3]+'.<br/>Preview is unavailable</h1>');
      prev.close();
      currentData=null;
      updateCurrentData();
    }
    debug('Switched to tab '+fileTabs[currentTab][0]+'; Content-type '+fileTabs[currentTab][3]);
    ins=document.getElementById('menuinsert');
    ins.innerHTML='<li><a onclick="insertComment()">Comment</a></li>';
    if(currentData){
      var c;
      if(currentData=='xhtml') c=1;
      else if(currentData=='css') c=2;
      else c=0;
      var tsvdata=database[c];
      var forins='';
      var lastType='';
      for(var i=1;i<tsvdata.length;i++){
        if(tsvdata[i][2]!='Deprecated'&&tsvdata[i][2]!=null){
          if(lastType!=tsvdata[i][2]){
            if (lastType!='') forins+='</ul></li>';
            lastType=tsvdata[i][2];
            forins+='<li><a>'+lastType+'</a><ul>';
          }
          if(tsvdata[i][0]!='!DOCTYPE' && tsvdata[i][0]!='<!--comment-->'){
            (tsvdata[i][3]=='0')?forins+='<li><a onclick="insertTag(\''+tsvdata[i][0]+'\')">'+tsvdata[i][1].replace(/ /g,'&nbsp;')+'</a></li>':forins+='<li><a onclick="insertOmitag(\''+tsvdata[i][0]+'\')">'+tsvdata[i][1].replace(/ /g,'&nbsp;')+'</a></li>';
          }
        }
      }
      forins+='</ul></li>'
      ins.innerHTML+=forins;
      debug('Current Data is now '+currentData);
    }
  }
  else{
    visualHS=null;
    document.getElementById('container').style.display='none';
    if (document.getElementById('blackarea').style.display=='none')
      display('splash');
    debug('No opened files found');
  }
}

// Download File
function downloadFile(){
  if(fileTabs.length>0){
    document.getElementById('hia').value=fileTabs[currentTab][0];
    document.getElementById('hib').value=fileTabs[currentTab][3];
    document.getElementById('hic').value=fileTabs[currentTab][4];
    document.getElementById('hiddenForm').submit();
    /*var xhr=createXMLHttpRequest();
    xhr.open('POST','php/download.php',false);
    xhr.send('filename='+fileTabs[currentTab][0]+'&filetype='+fileTabs[currentTab][3]+'&filecode='+fileTabs[currentTab][4]);
    xhr.responseText;*/
    debug('Saved to file');
  }
}

// Close File Tab
function closeFileTab(num){
  if((opClosetabs)? confirm("This tab will be lost forever; download before to prevent losing data.\nDo you really want to close this tab?"):true){
    fileTabs.splice(num,1);
    (num<fileTabs.length)? loadFileTab(num):loadFileTab(fileTabs.length-1);
  }
}

// Update Current Data
function updateCurrentData(){
  window.clearTimeout(updateTimer);
  visualHS.save();
  var code=document.getElementById('code').value;

  if (fileTabs[currentTab][4]!=code) {
    fileTabs[currentTab][4]=code;
  }
  updateTimer=window.setTimeout(updateCurrentData,500);
}

// Update Preview
function updatePreview(){
  window.clearTimeout(updateTimer);
  visualHS.save();
  var code=document.getElementById('code').value;

  if (fileTabs[currentTab][4]!=code) {
    fileTabs[currentTab][4]=code;
    var prev=document.getElementById('previewframe').contentDocument; 
    prev.open();
    if(fileTabs[currentTab][1]!='')
      prev.write('<base href="'+fileTabs[currentTab][1]+'" />'+fileTabs[currentTab][4]);
    else
      prev.write(fileTabs[currentTab][4]);
    prev.close();
  }
  updateTimer=window.setTimeout(updatePreview,200);
}
