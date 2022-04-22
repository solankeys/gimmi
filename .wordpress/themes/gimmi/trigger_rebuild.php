<?php

define('WP_USE_THEMES', false);
require_once '../../../wp-load.php';
header("HTTP/1.1 200 OK");


if( is_user_logged_in() )
{
	$ch = curl_init('https://api.vercel.com/v1/integrations/deploy/prj_s6H28fFDnWKyCe3ovuX8MSbMfF8G/GwIo9TOAJ7');  
    curl_setopt($ch, CURLOPT_TIMEOUT, 5);  
    curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, 5);  
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);  
    $data = curl_exec($ch);  
    curl_close($ch);  

	header('Location: ' . $_SERVER['HTTP_REFERER']);
	exit();
}