<?php
// Set name and content
$filename = $_POST['filename'];
$mimetype = $_POST['filetype'];
$mycode = $_POST['filecode'];

// Send file headers
header('Content-Type: '.$mimetype);
header('Content-Disposition: attachment;filename='.$filename);
header('Content-Transfer-Encoding: binary');
header('Pragma: no-cache');
header('Expires: 0');
// Send the file contents.
echo $mycode;
?>
