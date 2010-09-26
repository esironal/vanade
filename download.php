<?php
// Set name and content
$filename = "index.html";
$mycode = $_POST['hiddenInput'];

// Send file headers
header('Content-type: text/html');
header('Content-Disposition: attachment;filename='.$filename);
header('Content-Transfer-Encoding: binary');
header('Pragma: no-cache');
header('Expires: 0');
// Send the file contents.
echo $mycode;
?>
