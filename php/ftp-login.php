<?php
                     
$ftp_server = $_POST['ftpServer'];
$ftp_user = $_POST['ftpUser'];
$ftp_pass = $_POST['ftpPass'];
$ftp_currentdir = '/';

// Set up a connection or die
$ftp_cnx = ftp_connect($ftp_server) or die('Couldn\'t connect to $ftp_server'); 

// Try to login
if (@ftp_login($ftp_cnx, $ftp_user, $ftp_pass)) {
  echo 'Connected as $ftp_user@$ftp_server'."\n";
} else {
  echo 'Couldn\'t connect as $ftp_user'."\n".'<br/><a onclick="loadFtpConnectionData()">Back</a>';
}

// Fill document data
ftp_chdir($ftp_cnx,$ftp_currentdir);
$list = ftp_nlist($ftp_cnx,'.');
echo '<h2>'.ftp_pwd($ftp_cnx).'</h2><ul>';
foreach ($list as $value){
  if(@ftp_chdir($ftp_cnx, $value)){
    ftp_chdir($ftp_cnx, $ftp_currentdir);
    echo '<li style="color:blue">'.$value.'</li>';
  }
  else
    echo '<li>'.$value.'</li>';
}
echo '</ul>';

// Close the connection
ftp_close($ftp_cnx);  
?>
