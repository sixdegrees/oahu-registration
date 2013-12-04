<?php
set_include_path(dirname(__FILE__) . ":");
require('vendor/autoload.php');


define("OAHU_CLIENT_ID", "4eb130165a14284095000005");
define("OAHU_APP_ID", "528f8aff873b0c5a18001145");
define("OAHU_APP_SECRET", "46a75869da4ae3c42d7a2f111c488192");
define("OAHU_QUIZ_ID","528f8b38873b0c5a18001146");
define("PAGE_URL","http://facebook.com/page");
define("RULES_URL", 'http://www.pathefilms.com/reglementjeuxconcours2012');


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
