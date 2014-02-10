<?php
set_include_path(dirname(__FILE__) . ":");
require('vendor/autoload.php');


define("OAHU_CLIENT_ID", "");
define("OAHU_APP_ID", "");
define("OAHU_APP_SECRET", "");
define("PAGE_URL","http://facebook.com/page");
define("RULES_URL", "");


$config = array(
  'oahu' => array(
    "likeGate"  => false,
    "host"      => "app-staging.oahu.fr",
    "clientId"  => OAHU_CLIENT_ID,
    "appId"     => OAHU_APP_ID,
    "appSecret" => OAHU_APP_SECRET
  )
);

if(class_exists('Memcache')){
  $cache_config = array(
    "cache"     => "true",
    "cacheHost" => "127.0.0.1",
    "cachePort" => 11211,
    "cacheExpiration" => 120
  );
  $config['oahu'] = array_merge($config['oahu'],$cache_config);
}

$oahu = new Oahu_Client($config);
$app = $oahu->getApp(OAHU_APP_ID);
