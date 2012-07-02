<?php
  $oahu_host    = getenv('OAHU_HOST');
  $oahu_app_id  = getenv('OAHU_APP_ID');
  $page_url     = getenv('PAGE_URL');
  $fb_app_id    = getenv('FACEBOOK_APP_ID');
  $ga_code      = getenv('GOOGLE_ANALYTICS_CODE');
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml/video">
<head>
  <title>Pathe</title>
  <meta charset="utf-8" />  
  <meta property="og:url" content="<?php echo $page_url; ?>" />
  <meta property="og:title" content="Project test Pathé" />
  <meta property="og:description" content="Gagnez votre place pour une projetion test d'un film Pathé à Paris !" />
  <script type="text/javascript">
    page_url = '<?php echo $page_url?>'
    fb_app_id = '<?php echo $fb_app_id?>'
    oahu_app_id = '<?php echo $oahu_app_id?>'
    ga_code = '<?php echo $ga_code?>'
  </script>
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="//<?php echo $oahu_host; ?>/assets/oahu.js" type="text/javascript"></script>
  <script src="//<?php echo $oahu_host; ?>/assets/oahu-apps.js" type="text/javascript"></script>
  <script src="app.js" type="text/javascript"></script>
  <link href="//<?php echo $oahu_host; ?>/assets/oahu-apps.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="./style.css" media="screen" rel="stylesheet" type="text/css" />
</head>

<body id="pathe">
  <div class="registration form"></div>
  <script type="text/template" id="inscription_template" data-template="inscription">
  <?php require('templates/inscription.html'); ?>
  </script>
  <script type="text/template" id="confirmation_template"  data-template="confirmation">
  <?php require('templates/confirmation.html'); ?>
  </script>
</body>

</html>
