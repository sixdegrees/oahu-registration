<?php require_once('config.php'); ?>
<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml/video">
  <head>
    <title><?php echo $app->name ?></title>
    <meta charset="utf-8" />  
    <meta property="og:url"         content="<?php echo PAGE_URL; ?>" />
    <meta property="og:title"       content="<?php echo $app->name ?>" />
    <meta property="og:description" content="<?php echo $app->description ?>" />  
    <meta property="og:image"       content="http:<?php echo $oahu->imageUrl($app->id,'large'); ?>" />

    <script src='//ajax.googleapis.com/ajax/libs/jquery/1.10.2/jquery.min.js'></script>

    <script type="text/javascript" src="//app-staging.oahu.fr/assets/oahu.js"></script>
    <script type="text/javascript" src="//app-staging.oahu.fr/assets/oahu-apps.js"></script>
    <script type="text/javascript" src="./js/floatlabels.min.js"></script>
    <script type="text/javascript" src="./application.js"></script>

    <link rel="stylesheet" href="//netdna.bootstrapcdn.com/bootstrap/3.0.2/css/bootstrap.min.css">
    <link rel="stylesheet" href="/application.css">

    <script type="text/javascript">
      var page_url = "<?php echo PAGE_URL ?>";
      $(function() {
        Oahu.init({ appId: '<?php echo OAHU_APP_ID ?>' }, OahuInitCallback);
      });
    </script>
  </head>

  <body>
    <div class="container">
      <div class="row">
        <div class="col-sm-5">
          <div id="logo" class='center-block'><img src="/img/logo-fondjaune.png" alt=""></div>
        </div>
        <div class="col-sm-7">
          <div class="registration form" data-oahu-widget="registration" data-oahu-on='{ "registration:complete" : "shares" }'></div>
        </div>
      </div>
      <div class="row">
        <div class="col-xs-12 text-center">
          <div class="reglement"><a href="<?php echo RULES_URL ?>" target="_blank">Règlement</a></div>
        </div>
      </div>
    </div> <!-- /container -->


    <?php echo Oahu_Helpers::includeTemplates('templates'); ?>
  </body>

</html>
