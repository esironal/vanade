// Requires filemanager.js
var opSplit,opClosetabs;
var hlGcomment,hlGstring;
var hlXtag,hlXattri,hlXattnam,hlXcdata,hlXproces,hlXent,hlXdoct;
var hlSat,hlSunit,hlSval,hlSid,hlSsel,hlSimp,hlScolor;
var hlJkword,hlJatom,hlJdef,hlJloc;
var hlPkword,hlPnum,hlPpre,hlPvar;

function saveLocalStorage(){
  var tabsdata=new Array();
  for(var i=0;i<fileTabs.length;i++){
    tabsdata[i]=fileTabs[i].join('[||]');
  }
  tabsdata=tabsdata.join('[|||]');
  localStorage.tabsData=tabsdata;
  debug('Saved localStorage');
}

function loadLocalStorage(){
  loadOptions();
  if(localStorage.tabsData){
    var tabsdata=localStorage.tabsData;
    tabsdata=tabsdata.split('[|||]');
    for(var i=0;i<tabsdata.length;i++){
      fileTabs[i]=tabsdata[i].split('[||]');
    }
    debug('Loaded localStorage');
  }
  else{
    debug('No previous localStorage found');
  }
  loadFileTab(0);
}

function saveOptions(){
  opSplit=document.getElementById('opSplit').value;
  opClosetabs=document.getElementById('opClosetabs').checked;

  hlGcomment=document.getElementById('hlGcomment').value;
  hlGstring=document.getElementById('hlGstring').value;
  hlXtag=document.getElementById('hlXtag').value;
  hlXattri=document.getElementById('hlXattri').value;
  hlXattnam=document.getElementById('hlXattnam').value;
  hlXcdata=document.getElementById('hlXcdata').value;
  hlXproces=document.getElementById('hlXproces').value;
  hlXent=document.getElementById('hlXent').value;
  hlXdoct=document.getElementById('hlXdoct').value;
  hlSat=document.getElementById('hlSat').value;
  hlSunit=document.getElementById('hlSunit').value;
  hlSval=document.getElementById('hlSval').value;
  hlSid=document.getElementById('hlSid').value;
  hlSsel=document.getElementById('hlSsel').value;
  hlSimp=document.getElementById('hlSimp').value;
  hlScolor=document.getElementById('hlScolor').value;
  hlJkword=document.getElementById('hlJkword').value;
  hlJatom=document.getElementById('hlJatom').value;
  hlJdef=document.getElementById('hlJdef').value;
  hlJloc=document.getElementById('hlJloc').value;
  hlPkword=document.getElementById('hlPkword').value;
  hlPnum=document.getElementById('hlPnum').value;
  hlPpre=document.getElementById('hlPpre').value;
  hlPvar=document.getElementById('hlPvar').value;

  showSplit();
  setHlcolors();
  display('none');

  localStorage.opSplit=opSplit;
  localStorage.opClosetabs=opClosetabs? 'yes':'no';

  localStorage.hlGcomment=hlGcomment;
  localStorage.hlGstring=hlGstring;
  localStorage.hlXtag=hlXtag;
  localStorage.hlXattri=hlXattri;
  localStorage.hlXattnam=hlXattnam;
  localStorage.hlXcdata=hlXcdata;
  localStorage.hlXproces=hlXproces;
  localStorage.hlXent=hlXent;
  localStorage.hlXdoct=hlXdoct;
  localStorage.hlSat=hlSat;
  localStorage.hlSunit=hlSunit;
  localStorage.hlSval=hlSval;
  localStorage.hlSid=hlSid;
  localStorage.hlSsel=hlSsel;
  localStorage.hlSimp=hlSimp;
  localStorage.hlScolor=hlScolor;
  localStorage.hlJkword=hlJkword;
  localStorage.hlJatom=hlJatom;
  localStorage.hlJdef=hlJdef;
  localStorage.hlJloc=hlJloc;
  localStorage.hlPkword=hlPkword;
  localStorage.hlPnum=hlPnum;
  localStorage.hlPpre=hlPpre;
  localStorage.hlPvar=hlPvar;

  debug('Saved options');
}

function loadOptions(){
  opSplit=(localStorage.opSplit)? localStorage.opSplit:'Vertical';
  showSplit();
  opClosetabs=(localStorage.opClosetabs)? (localStorage.opClosetabs=='yes'):true;

  hlGcomment=(localStorage.hlGcomment)? localStorage.hlGcomment:'999';
  hlGstring=(localStorage.hlGstring)? localStorage.hlGstring:'a22';
  hlXtag=(localStorage.hlXtag)? localStorage.hlXtag:'a0b';
  hlXattri=(localStorage.hlXattri)? localStorage.hlXattri:'281';
  hlXattnam=(localStorage.hlXattnam)? localStorage.hlXattnam:'00f';
  hlXcdata=(localStorage.hlXcdata)? localStorage.hlXcdata:'d18';
  hlXproces=(localStorage.hlXproces)? localStorage.hlXproces:'a70';
  hlXent=(localStorage.hlXent)? localStorage.hlXent:'a22';
  hlXdoct=(localStorage.hlXdoct)? localStorage.hlXdoct:'48a';
  hlSat=(localStorage.hlSat)? localStorage.hlSat:'708';
  hlSunit=(localStorage.hlSunit)? localStorage.hlSunit:'281';
  hlSval=(localStorage.hlSval)? localStorage.hlSval:'708';
  hlSid=(localStorage.hlSid)? localStorage.hlSid:'000';
  hlSsel=(localStorage.hlSsel)? localStorage.hlSsel:'11b';
  hlSimp=(localStorage.hlSimp)? localStorage.hlSimp:'00f';
  hlScolor=(localStorage.hlScolor)? localStorage.hlScolor:'299';
  hlJkword=(localStorage.hlJkword)? localStorage.hlJkword:'90b';
  hlJatom=(localStorage.hlJatom)? localStorage.hlJatom:'291';
  hlJdef=(localStorage.hlJdef)? localStorage.hlJdef:'00f';
  hlJloc=(localStorage.hlJloc)? localStorage.hlJloc:'049';
  hlPkword=(localStorage.hlPkword)? localStorage.hlPkword:'90b';
  hlPnum=(localStorage.hlPnum)? localStorage.hlPnum:'291';
  hlPpre=(localStorage.hlPpre)? localStorage.hlPpre:'049';
  hlPvar=(localStorage.hlPvar)? localStorage.hlPvar:'22b';
  setHlcolors();

  debug('Loaded options');
}

function setHlcolors(){
  document.getElementById('hlcolors').innerHTML=
'span.xml-tag{color:#'+hlXtag+'}\n'+
'span.xml-attribute{color:#'+hlXattri+'}\n'+
'span.xml-attname{color:#'+hlXattnam+'}\n'+
'span.xml-comment{color:#'+hlGcomment+';font-style:italic}\n'+
'span.xml-cdata{color:#'+hlXcdata+'}\n'+
'span.xml-processing{color:#'+hlXproces+'}\n'+
'span.xml-entity{color:#'+hlXent+'}\n'+
'span.xml-doctype{color:#'+hlXdoct+'}\n'+
'span.css-at{color:#'+hlSat+'}\n'+
'span.css-unit{color:#'+hlSunit+'}\n'+
'span.css-value{color:#'+hlSval+'}\n'+
'span.css-identifier{color:#'+hlSid+'}\n'+
'span.css-selector{color:#'+hlSsel+'}\n'+
'span.css-important{color:#'+hlSimp+'}\n'+
'span.css-colorcode{color:#'+hlScolor+'}\n'+
'span.css-comment{color:#'+hlGcomment+';font-style:italic}\n'+
'span.css-string{color:#'+hlGstring+'}\n'+
'span.js-keyword{color:#'+hlJkword+'}\n'+
'span.js-atom{color:#'+hlJatom+'}\n'+
'span.js-variabledef{color:#'+hlJdef+'}\n'+
'span.js-localvariable{color:#'+hlJloc+'}\n'+
'span.js-comment{color:#'+hlGcomment+';font-style:italic}\n'+
'span.js-string{color:#'+hlGstring+'}\n'+
'span.c-like-keyword{color:#'+hlPkword+'}\n'+
'span.c-like-number{color:#'+hlPnum+'}\n'+
'span.c-like-comment{color:#'+hlGcomment+';font-style:italic}\n'+
'span.c-like-string{color:#'+hlGstring+'}\n'+
'span.c-like-preprocessor{color:#'+hlPpre+'}\n'+
'span.c-like-var{color:#'+hlPvar+'}';
}
