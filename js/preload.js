var doDebug=true; //Set true for debug
var styles=['css/main.css','css/codemirror.css'];
var scripts=['CodeMirror/lib/codemirror.js','CodeMirror/mode/xml/xml.js','CodeMirror/mode/css/css.js','CodeMirror/mode/javascript/javascript.js','CodeMirror/mode/htmlmixed/htmlmixed.js','CodeMirror/mode/clike/clike.js','CodeMirror/mode/php/php.js',
'js/main.js','js/default-files.js','js/templates.js','js/filemanager.js','js/localstorage.js','js/ajax.js','js/ftp-connect.js'];
var databases=['tsv/html5.tsv','tsv/xhtml.tsv']
var database=new Array();

// Don't edit from here...
var scriptsLoaded=0;

function preload(){
  if(doDebug) document.getElementsByTagName('body')[0].innerHTML+='<div id="debugger"><b>Debugger is ON</><br/></div>';
  var head = document.getElementsByTagName('head')[0];
  head.innerHTML+='<style type="text/css" id="jsaddable"></style>\n'+
  '<style type="text/css" id="hlcolors"></style>';
  for(var i=0;i<styles.length;i++){
    head.innerHTML+='<link rel="stylesheet" type="text/css" href="'+styles[i]+'" />';
    debug('Loaded '+styles[i]);
  }
  for(var i=0;i<scripts.length;i++){
    var script=document.createElement('script');
    script.setAttribute('type','text/javascript');
    script.setAttribute('src',scripts[i]);
    script.addEventListener("load",preloaded,false);
    head.appendChild(script);
  }
  window.setTimeout(splash,2000);
}

function preloaded(){
  scriptsLoaded++;
  debug('Loaded '+this.getAttribute('src'));
  if (scriptsLoaded < scripts.length){ }
  else{
    init();
    if(window.location.hash.length>1) display(window.location.hash.substring(1));
  }
}

function splash(){
  if(scriptsLoaded<scripts.length) window.setTimeout(splash,1000);
  else{
    document.getElementById('hiddeng').setAttribute('style','display:block');
    if (fileTabs.length>0 && window.location.hash.length<=1) display('none');
  }
}

function debug(string){
  if(doDebug){
    var now=new Date();
    var time='['+now.getHours()+':'+now.getMinutes()+':'+now.getSeconds()+']';
    document.getElementById('debugger').innerHTML+=time+' '+string+'<br/>';
  }
}
