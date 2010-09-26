/* Main script for Vanade XWEO */

var old = '';

var defaultHTML =
'<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\n' +
'<html xmlns="http://www.w3.org/1999/xhtml" xml:lang="en" lang="en">\n' +
'<head>\n<title>Title</title>\n</head>\n\n' +
'<body>\n<h1>Title</h1>\n' +
'<p>Welcome to Vanade XHTML code editor. Start creating your webpage.</p>\n' +
'</body>\n</html>';

function init(){
 if (localStorage.getItem('previewPage')){
  document.getElementById('code').value = localStorage.getItem('previewPage');
 }
 else{
  document.getElementById('code').value = defaultHTML;
 }
 document.getElementById('code').focus();
 update();
}

function update(){
  var code = document.getElementById('code').value;
  var prev = document.getElementById('previewframe').contentDocument; 

  if (old != code) {
    old = code;
    document.getElementById('visual').innerHTML = highlight(code); // Requires highlight.js
    prev.open();
    prev.write(old);
    prev.close();
  }

  window.setTimeout(update, 200);
}

/** STATUSBAR **/
function showCode(){
  document.getElementById('editor').style.width = '100%';
  document.getElementById('preview').style.width = '0';
}

function showSplit(){
  document.getElementById('editor').style.width = '50%';
  document.getElementById('preview').style.width = '50%';
}

function showPreview(){
  document.getElementById('editor').style.width = '0';
  document.getElementById('preview').style.width = '100%';
}

/* ACTIONS */
function display(area){
 if (area=='none'){
  document.getElementById('blackarea').style.display='none';
  document.getElementById('about').style.display='none';
  document.getElementById('todo').style.display='none';
 }
 else{
  document.getElementById('blackarea').style.display='block';
  document.getElementById(area).style.display='block';
 }
}

function savePreview(){
 localStorage.setItem('previewPage', document.getElementById('code').value);
}

function saveFile(){
document.getElementById('hiddenInput').value = document.getElementById('code').value;
document.getElementById('hiddenForm').submit();
}
