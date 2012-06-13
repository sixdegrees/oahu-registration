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
  
  <script src="//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js"></script>
  <script src="//<?php echo $oahu_host; ?>/assets/oahu.js" type="text/javascript"></script>
  <script src="//<?php echo $oahu_host; ?>/assets/oahu-apps.js" type="text/javascript"></script>
  <link href="//<?php echo $oahu_host; ?>/assets/oahu-apps.css" media="screen" rel="stylesheet" type="text/css" />
  <link href="./style.css" media="screen" rel="stylesheet" type="text/css" />
  <script type="text/javascript" charset="utf-8">
    $(function() {
      var renderTemplate = function(tpl) {
        $('#pathe_formulaire').attr("class", "pathe_formulaire_" + tpl);
        $('#pathe_formulaire').html($("#" + tpl + "_template").html());
      };
      var render = function(account) {
        try {
          if (account && account.player.extra.email) {
            renderTemplate("confirmation");
          } else {
            renderTemplate("inscription");
          }
        } catch (e) {
          renderTemplate("inscription");
        }
      };
      
      var register = function(extra) {
        Oahu.account.player.extra = extra;
        Oahu.app.updatePlayer({ extra: extra }, function() {
          render(Oahu.account);
        });
      };
      
      $('form').live('submit', function(e) {
        e.preventDefault();
        var val, extra = {}, fields = _.clone(Oahu.app.registration_fields);
        while (field = fields.pop()) {
          val = $('#' + field + "_field").val();
          if (val.length == 0 ) {
            alert("Tous les champs sont obligatoires");
            return false;
          } else if (field=="email" && !/[A-Z0-9._%-]+@[A-Z0-9.-]+\.[A-Z]{2,4}/i.test(val)) {
            alert("Veuillez saisir un email valide");
            return false;            
          } else {
            extra[field] = val;
          }
        }
        
        if (Oahu.account) {
          register(extra);
        } else {
          Oahu.once('oahu:account', function() { register(extra); });
          Oahu.login('facebook');
        }
      });
      
      $('.pathe_formulaire_partager').live('click', function() {
        Oahu.ui.share('facebook', { 
          link: '<?php echo $page_url; ?>',
          description: "Gagnez votre place pour une projetion test d'un film Pathé à Paris !",
          name: "Projection test Pathé",
          picture: "https://pathe-projections.herokuapp.com/img/logo-fondjaune.png"
        });
      });
      
      Oahu.bind("oahu:account", function(msg, account) {
        render(account);
      });
      _oahu_config = { appId: '<?php echo $oahu_app_id ?>' };
      <?php if ($fb_app_id) : ?>
      _oahu_config.facebook = { appId: "<?php echo $fb_app_id; ?>", status:true, cookie:true, xfbml:true, oauth:true, logging:true, frictionlessRequests : true };
      <?php endif ?>
      <?php if ($ga_code) :  ?>
      _oahu_config.ga = { code: "<?php echo $ga_code ?>" };
      <?php endif ?>
      Oahu.init(_oahu_config);
    })
  </script>
</head>

<body>
  <div id="pathe_formulaire"></div>
  <script type="text/template" id="inscription_template">
  <?php require('templates/inscription.html'); ?>
  </script>
  <script type="text/template" id="confirmation_template">
  <?php require('templates/confirmation.html'); ?>
  </script>
</body>

</html>