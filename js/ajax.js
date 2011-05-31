function loadAjax(url,id){
  var xhr=createXMLHttpRequest();
  xhr.onreadystatechange=function(){
    if(xhr.readyState==4 && (xhr.status==200 || window.location.href.indexOf("http")==-1))
      document.getElementById(id).innerHTML=xhr.responseText;
  }
  xhr.open('GET',url,true);
  xhr.send(null);
}

function getTSV(url){
  var xhr=createXMLHttpRequest();
  xhr.open('GET',url,false);
  xhr.send(null);
  var txt=xhr.responseText.split('\n');

  var tsvArray=new Array;
  for(var i=0;i<txt.length;i++){
    tsvArray[i]=txt[i].split('\t');
  }
  return tsvArray;
}

function createXMLHttpRequest() {
  var xmlHttp=null;
  if(window.ActiveXObject) xmlHttp=new ActiveXObject("Microsoft.XMLHTTP");
  else if(window.XMLHttpRequest) xmlHttp=new XMLHttpRequest();
  return xmlHttp;
}
