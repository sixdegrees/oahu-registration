<?php
  $oahu_host    = getenv('OAHU_HOST');
  $page_url     = getenv('PAGE_URL');
?>

<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml/video">
<head>
  <title>Pathe</title>
  <meta charset="utf-8" />  
  <meta property="og:url"         content="<?php echo $page_url; ?>" />
  <meta property="og:title"       content="Projection test Pathé, Des Gens qui s'embrassent" />
  <meta property="og:description" content="Gagnez votre place pour une projetion test d'un film Pathé à Paris !" />  
  <meta property="og:image"       content="http://pathe-projections.herokuapp.com/img/logo-fondjaune.png" />
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="//<?php echo $oahu_host; ?>/assets/oahu.js" type="text/javascript"></script>
 <!-- <script src="//<?php echo $oahu_host; ?>/assets/oahu-apps.js" type="text/javascript"></script> -->
 <script src="//oahu.dev/assets/oahu-apps.js" type="text/javascript"></script>
  <link href="//<?php echo $oahu_host; ?>/assets/oahu-apps.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="./style.css" media="screen" rel="stylesheet" type="text/css" />
  <script>
    var share_displayed = false;
    Oahu.Apps.Registration.prototype.share = function() {
      if (share_displayed) return ;
      var page_url = "<?php echo $page_url ?>";
      div = document.createElement("div");
      div.innerHTML = Oahu.app.description;
      var description = div.textContent || div.innerText;
      share_displayed = true;
      _.delay(function() {
        Oahu.ui.share('facebook', {
          id: Oahu.app.id,
          description: description
        }, function() {
          share_displayed = false;
        }, 2000);
      });
    };
    $(function() {
      Oahu.init({ appId: "<?php echo getenv('OAHU_APP_ID') ?>" });
    });    
  </script>
</head>

<body id="pathe">
  <div class="registration form" data-oahu-widget="registration" data-oahu-on='{ "registration:complete" : "share" }'></div>

  <script type="text/template" data-oahu-template="registration_header">
  {{& app.description}}
  </script>

  <script type="text/template" data-oahu-template="registration_complete">
  <div id="pathe_formulaire_champs" class="pathe_formulaire_inscription view">
    <div class="summary">
      <div class="logo">Des Gens qui s'embrassent</div>
      <p class='main'>Nous avons bien enregistr&eacute; votre participation pour la projection du 15 janvier prochain.</p>
    </div>
    <a href="#" class='btn' data-oahu-action="registration.share">Partager avec mes amis</a>
  </div>
  </script>
</body>

</html>
