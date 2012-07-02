$(function() {

  var compileTemplate = function(content) {
    var ret = { 
      render: function() { 
        return "No templating engine found..."; 
      }
    };
    if (typeof Handlebars !== "undefined" && Handlebars !== null) {
      ret = { render: Handlebars.compile(content).apply(null, arguments) };
      return ret;
    } else if (typeof Hogan !== "undefined" && Hogan !== null) {
      return Hogan.compile(content);
    }
    return ret;
  };

  var templates = {};
  $('[data-template]').each(function(i,e) {
    var tpl = $(e), tpl_name = tpl.data("template");
    templates[tpl_name] = templates[tpl_name] || compileTemplate(tpl.html());
    tpl.remove();
  });

  var renderTemplate = function(tpl, data) {
    $('.form.registration').addClass("pathe_formulaire_" + tpl);
    // $('.form.registration').html($("#" + tpl + "_template").html());
    $('.form.registration').html(templates[tpl].render(data));
  };

  var render = function(account) {
    var name, email, phone;
    if (account.player && account.player.extra) {
      name  = account.player.extra.name || account.player.name || account.name;
      email = account.player.extra.email || account.email;
      phone = account.player.extra.phone;
    } else {
      name  = account.name;
      email = account.email;
    }
    data = { email: (email || ""), name: (name || ""), phone: (phone || "") };
    try {
      if (account && account.player.extra.email) {
        renderTemplate("confirmation", data);
      } else {
        renderTemplate("inscription", data);
      }
    } catch (e) {
      renderTemplate("inscription", data);
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
    // var val, extra = {}, fields = _.clone(Oahu.app.registration_fields);
    var val, key, field, extra = {}, fields = $('form', this.el).serializeArray();
    while (fields.length > 0) {
      field = fields.pop();
      key = field.name.replace(/^player_/, '');
      val  = field.value;
      if (val.length === 0) {
        alert("Tous les champs sont obligatoires");
        return false;
      } else if (field === "email" && !/[A-Z0-9._%\-]+@[A-Z0-9.\-]+\.[A-Z]{2,4}/i.test(val)) {
        alert("Veuillez saisir un email valide");
        return false;            
      } else {
        extra[key] = val;
      }
    }
    
    if (Oahu.account) {
      register(extra);
    } else {
      Oahu.once('oahu:account', function() { register(extra); });
      Oahu.login('facebook');
    }
  });
  
  $('.share').live('click', function() {
    Oahu.ui.share('facebook', { 
      link: page_url,
      description: "Venez découvrir en avant-première le film LOL USA avec Miley Cyrus et Demi Moore !",
      name: "Projection LOL USA le 12 juillet à Paris",
      picture: "https://pathe-projections.herokuapp.com/img/logo-fondjaune.png"
    });
  });
  
  Oahu.bind("oahu:account", function(msg, account) {
    render(account);
  });
  _oahu_config = { appId: oahu_app_id };

  if(fb_app_id){
    _oahu_config.facebook = { appId: fb_app_id, status:true, cookie:true, xfbml:true, oauth:true, logging:true, frictionlessRequests : true };
  }

  if(ga_code){
    _oahu_config.ga = { code: ga_code };
  }

  Oahu.init(_oahu_config);
});
