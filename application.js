// // Custom application code here


function OahuInitCallback() {
  Oahu.app.registration_fields = [
  { name : "lastname", type : "text",  label : "", placeholder : "Prénom", required: false },
  { name : "name",  type : "text",     label : "", placeholder : "Nom",    required: true,  error : "Veuillez saisir votre nom" },
  { name : "email", type : "text",     label : "", placeholder : "Email",  required: true, error : "Veuillez saisir votre email" },
  { name : "ville", type : "text",     label : "", placeholder : "Ville",  required: true, error : "Veuillez saisir votre ville" },
  { name : "phone", type : "text",     label : "", placeholder : "Numéro de Téléphone", value : "", error : "Numéro de téléphone Invalide" },
  { name : "optin", type : "checkbox", label : "J'accepte les conditions d'utilisation",  required: true, error : "Veuillez accepter les conditions d'utilisation" },
  ];
  setTimeout(function(){
    $('input.form-control').floatlabel({labelClass:'floatlabel', labelEndTop:6});
  }, 100);
}

//Add a Helper to show the Absolute date for an object in a template
Handlebars.registerHelper('absoluteDate', function(date){
  return moment(date).lang('fr').format('LL');
});

//Custom sharing behaviour
var share_displayed = false;
Oahu.Apps.Registration.prototype.share = function() {
  if (share_displayed) return ;
  div = document.createElement("div");
  div.innerHTML = Oahu.app.description;
  var description = div.textContent || div.innerText;
  var _this = this;
  share_displayed = true;
  _.delay(function() {
    Oahu.ui.share('facebook', {
      id: Oahu.app.id,
      description: description
    }, function() {
      Oahu.track("registration", "share", _this.id, {provider: 'facebook'});
      share_displayed = false;
    }, 2000);
  });
};
