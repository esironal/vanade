// Requires ajax.js
var ftpServer, ftpUser, ftpPass;
var defaultImg='<svg width="12" height="96" viewBox="0 0 12 96" id="ftpTab">\n'+
'  <rect x="0.5" y="0.5" rx="4" width="47" height="95" fill="#fec" stroke="#963" />\n'+
'  <path d="m 6.5,34 -4,4 4,4" fill="none" stroke="#963" />\n'+
'  <path d="m 9.5,34 -4,4 4,4" fill="none" stroke="#963" />\n'+
'  <path d="m 6.5,44 -4,4 4,4" fill="none" stroke="#963" />\n'+
'  <path d="m 9.5,44 -4,4 4,4" fill="none" stroke="#963" />\n'+
'  <path d="m 6.5,54 -4,4 4,4" fill="none" stroke="#963" />\n'+
'  <path d="m 9.5,54 -4,4 4,4" fill="none" stroke="#963" />\n'+
'</svg>';
var defaultConnection=defaultImg+
'<p>Connect to FTP Server:</p>\n'+
'<form action="javascript:loadFtpData()" method="post" id="ftpForm">\n'+
'<p><label for="ftpServer">Server: </label><input type="text" name="ftpServer" id="ftpServer" /></p>\n'+
'<p><label for="ftpUser">Username: </label><input type="text" name="ftpUser" id="ftpUser" /></p>\n'+
'<p><label for="ftpPassword">Password: </label><input type="password" name="ftpPass" id="ftpPass" /></p>\n'+
'<p><input type="submit" /></p>\n'+
'</form>\n';

function loadFtpConnectionData(){
  document.getElementById('filebrowser').innerHTML=defaultConnection;
  debug('Loaded Connection Data');
}

function ftpDisconnect(){
  ftpServer='';
  ftpUser='';
  ftpPass='';
  document.getElementById('filebrowser').innerHTML=defaultConnection;
  debug('FTP Disconnected');
}

function loadFtpData(){
  ftpServer=document.getElementById('ftpServer').value;
  ftpUser=document.getElementById('ftpUser').value;
  ftpPass=document.getElementById('ftpPass').value;
  if (ftpServer=='' || ftpUser=='' || ftpPass==''){
    filebrowser.innerHTML='<p>Data is missing</p>\n'+defaultConnection
    return false;
  }
  var xhr=createXMLHttpRequest();
  xhr.onreadystatechange=function(){
    if (xhr.readyState==4 && (xhr.status==200 || window.location.href.indexOf("http")==-1))
      document.getElementById('filebrowser').innerHTML = defaultImg + xhr.responseText;
  }
  xhr.open('POST','php/ftp-login.php',true);
  xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
  xhr.send('ftpServer='+ftpServer+'&ftpUser='+ftpUser+'&ftpPass='+ftpPass);
  debug('FTP Connected as '+ftpUser+'@'+ftpServer);
}
