<?php
$url = $_POST['fileurl'];
if($url){
  $headers = get_headers($url);
  foreach($headers as $head){
    if(substr($head,0,14)=='Content-Type: ') $mimetype = substr($head,14);
  }
  $sourcecode = file_get_contents($url); 
  echo $mimetype.'|||'.$sourcecode;
}
else echo 'no-url';
?>
