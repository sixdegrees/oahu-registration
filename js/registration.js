/**
 * Registration Widget:
 *
 * **A registration form, with validation and events**
 *
 * The form will remember if the user already has submitted data or not.
 *
 * **In the backend, you can define the fields for this form : ** 
 * 
 * The following types are available by default :
 * 
 * * Text
 * * Checkbox
 * * Select
 *
 * ** These fields can have the following properties**
 * 
 * * `name` The field's name as it will be stored.
 * * `type` The field's type : see above for supported types
 * * `label` The field's label
 * * `required` Wether this is required. On a checkbox, will require it to be checked. 
 * * `placeholder` Placeholder text
 * * `error` The error message to display if the field is invalid
 * * `pattern` A regexp for the field to validate against
 * * `options` For a select field, a hash of options
 * * `value` Default value.
 * 
 * Check out the examples in the kitchensink for how to build the fields object.
 *
*/

/**
 * Registration:
 *
 * **Display a registration form with validation**
 *
 * The registration widget displays a registration form, complete with live validation and events.
 * 
 * Validation will be performed with [h5Validate](http://ericleads.com/h5validate/), so yo can use any of the html5 attributes in markup's template
 * 
 * The Patterns and Errors fields are defined in the `Oahu.app.registrations_fields` variable. You can define this object in your app's preferences, or override it client-side
 * 
 * * The share button will automatically use the app's relevant data (URL, description, thumbs...)
 *
 * @param {string} editable wether to allow the user to edit the form once it's been sent once.
*/

var Registration, _ref,
  __bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

Registration = (function(_super) {
  __extends(Registration, _super);

  function Registration() {
    this.share = __bind(this.share, this);
    this.updated = __bind(this.updated, this);
    this.getData = __bind(this.getData, this);
    this.isComplete = __bind(this.isComplete, this);
    this.complete = __bind(this.complete, this);
    this.unComplete = __bind(this.unComplete, this);
    this.register = __bind(this.register, this);
    this.submit = __bind(this.submit, this);
    this.validate = __bind(this.validate, this);
    this.edit = __bind(this.edit, this);
    _ref = Registration.__super__.constructor.apply(this, arguments);
    return _ref;
  }

  Registration.prototype.namespace = 'registration';

  Registration.prototype.templates = ['registration', 'registration_form', 'registration_complete', 'registration_field', 'registration_header'];

  Registration.prototype.attrs = ["editable"];

  Registration.prototype.refresh_events = ['oahu:connect:login:success', 'oahu:connect:logout:success'];

  Registration.prototype.complete = false;

  Registration.prototype.default_fields = [
    {
      name: "name",
      type: "text",
      label: "Nom",
      value: "",
      placeholder: "Bob",
      error: "Please enter your name"
    }, {
      name: "email",
      type: "text",
      label: "Email",
      value: "",
      placeholder: "bob@host.com",
      error: "Invalid Email"
    }, {
      name: "phone",
      type: "text",
      label: "Phone Number",
      value: "",
      placeholder: "06-00-00-00-00",
      error: "Invalid Phone number"
    }, {
      name: "ville",
      type: "select",
      label: "City",
      options: [
        {
          value: 'paris',
          label: "Paris"
        }, {
          value: 'newyork',
          label: "New York"
        }
      ],
      value: "",
      error: "Vous devez sélectionner une ville"
    }
  ];

  Registration.prototype.name = function() {
    var _ref1, _ref2, _ref3;
    return (_ref1 = Oahu.account) != null ? (_ref2 = _ref1.player) != null ? (_ref3 = _ref2.extra) != null ? _ref3.name : void 0 : void 0 : void 0;
  };

  Registration.prototype.email = function() {
    var _ref1, _ref2, _ref3;
    return (_ref1 = Oahu.account) != null ? (_ref2 = _ref1.player) != null ? (_ref3 = _ref2.extra) != null ? _ref3.email : void 0 : void 0 : void 0;
  };

  Registration.prototype.phone = function() {
    var _ref1, _ref2, _ref3;
    return (_ref1 = Oahu.account) != null ? (_ref2 = _ref1.player) != null ? (_ref3 = _ref2.extra) != null ? _ref3.phone : void 0 : void 0 : void 0;
  };

  Registration.prototype.username = function() {
    var _ref1;
    return (_ref1 = Oahu.account) != null ? _ref1.player.name : void 0;
  };

  Registration.prototype.initialize = function(options, callback) {
    if (this.fields == null) {
      this.fields = _.clone(Oahu.app.registration_fields);
    }
    if (this.fields == null) {
      this.fields = this.default_fields;
    }
    $.h5Validate.addPatterns({
      phone: /^0[0-9]([-. ]?\d{2}){4}$/
    });
    return this.on("updated", this.updated);
  };

  Registration.prototype.edit = function(source, e, opts) {
    e.preventDefault();
    e.stopPropagation();
    this.unComplete();
    this.validate();
    this.render();
    return false;
  };

  Registration.prototype.validate = function() {
    var _ref1;
    if ((_ref1 = $.browser) != null ? _ref1.msie : void 0) {
      return true;
    } else {
      return this.$el.h5Validate('allValid');
    }
  };

  Registration.prototype.submit = function(source, e, opts) {
    var extra, field, fields, _fn, _i, _len,
      _this = this;
    fields = _.clone(this.fields);
    if (e) {
      e.preventDefault();
    }
    if (!this.validate()) {
      if (e) {
        e.stopPropagation();
      }
      if (e) {
        e.stopImmediatePropagation();
      }
      return false;
    }
    extra = {};
    _fn = function(field) {
      return extra[field.name] = (function() {
        switch (field.type) {
          case 'checkbox':
            return this.$el.find(".h5-" + field.name).is(':checked');
          default:
            return this.$el.find(".h5-" + field.name).val();
        }
      }).call(_this);
    };
    for (_i = 0, _len = fields.length; _i < _len; _i++) {
      field = fields[_i];
      _fn(field);
    }
    return this.register(extra);
  };

  Registration.prototype.register = function(extra) {
    var _ref1, _ref2,
      _this = this;
    if (Oahu.account) {
      if ((_ref1 = this.account().player) != null) {
        _ref1.extra = extra;
      }
      this.complete();
      Oahu.app.updatePlayer({
        extra: (_ref2 = this.account().player) != null ? _ref2.extra : void 0
      }, function() {
        Oahu.trigger("registration:register", _this);
        return _this.render();
      });
    } else {
      Oahu.once('oahu:account', function() {
        return _this.register(extra);
      });
      Oahu.login('facebook');
    }
    return false;
  };

  Registration.prototype.account = function() {
    return Oahu.account;
  };

  Registration.prototype.unComplete = function() {
    var _ref1, _ref2, _ref3;
    return (_ref1 = this.account()) != null ? (_ref2 = _ref1.player) != null ? (_ref3 = _ref2.extra) != null ? _ref3.complete = false : void 0 : void 0 : void 0;
  };

  Registration.prototype.complete = function() {
    var _ref1, _ref2, _ref3;
    return (_ref1 = this.account()) != null ? (_ref2 = _ref1.player) != null ? (_ref3 = _ref2.extra) != null ? _ref3.complete = true : void 0 : void 0 : void 0;
  };

  Registration.prototype.isComplete = function() {
    var _ref1, _ref2, _ref3;
    return (_ref1 = this.account()) != null ? (_ref2 = _ref1.player) != null ? (_ref3 = _ref2.extra) != null ? _ref3.complete : void 0 : void 0 : void 0;
  };

  Registration.prototype.getData = function(cb) {
    var field, _fn, _i, _len, _ref1,
      _this = this;
    if (this.isComplete()) {
      Oahu.trigger("registration:complete", this);
    } else {
      _ref1 = this.fields;
      _fn = function(field) {
        var _ref2, _ref3, _ref4, _ref5, _ref6, _ref7;
        field.value = (_ref2 = _this.account()) != null ? (_ref3 = _ref2.player) != null ? (_ref4 = _ref3.extra) != null ? _ref4[field.name] : void 0 : void 0 : void 0;
        field.value || (field.value = (_ref5 = _this.account()) != null ? (_ref6 = _ref5.player) != null ? _ref6[field.name] : void 0 : void 0);
        return field.value || (field.value = (_ref7 = _this.account()) != null ? _ref7[field.name] : void 0);
      };
      for (_i = 0, _len = _ref1.length; _i < _len; _i++) {
        field = _ref1[_i];
        _fn(field);
      }
    }
    return cb.call(this);
  };

  Registration.prototype.updated = function() {
    var _ref1;
    if ((_ref1 = $.browser) != null ? _ref1.msie : void 0) {
      return true;
    } else {
      return this.$el.h5Validate();
    }
  };

  Registration.prototype.share = function(source, e, opts) {
    var id, provider, shareObject, url, _ref1, _ref2, _ref3, _ref4,
      _this = this;
    if (opts == null) {
      opts = {};
    }
    provider = opts.provider || 'facebook';
    url = opts.url || this.app.url;
    id = opts.id || this.app.id;
    _ref = {
      provider: provider
    };
    Oahu.track("open_share", id, _ref);
    shareObject = {
      id: id,
      link: url
    };
    if ((_ref1 = this.resource) != null ? (_ref2 = _ref1.paths) != null ? _ref2.original : void 0 : void 0) {
      shareObject.picture = (_ref3 = this.resource) != null ? (_ref4 = _ref3.paths) != null ? _ref4.original : void 0 : void 0;
    }
    return Oahu.ui.share(provider, shareObject, function(res) {
      var trackObject;
      trackObject = _.clone(_ref);
      trackObject.post_id = res != null ? res.post_id : void 0;
      if (res != null ? res.post_id : void 0) {
        return Oahu.track("share", id, trackObject);
      }
    });
  };

  return Registration;

})(exports.Widget);
