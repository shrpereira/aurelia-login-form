define('app',['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var App = exports.App = function () {
		function App() {
			_classCallCheck(this, App);
		}

		App.prototype.configureRouter = function configureRouter(config, router) {
			config.title = '';
			config.map([{ route: '', moduleId: 'login-form', title: 'Login' }, { route: 'login', moduleId: 'login-form', name: 'login', title: 'Login' }, { route: 'register', moduleId: 'register-form', name: 'register', title: 'Register' }, { route: 'forget', moduleId: 'forget-form', name: 'forget', title: 'Forget' }, { route: 'forget/:email', moduleId: 'forget-form', name: 'forget', title: 'Forget' }]);

			this.router = router;
		};

		return App;
	}();
});
define('environment',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.default = {
    debug: true,
    testing: true
  };
});
define('forget-form',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var ForgetForm = exports.ForgetForm = function () {
		function ForgetForm() {
			_classCallCheck(this, ForgetForm);

			this.email = "";
		}

		ForgetForm.prototype.activate = function activate(params) {
			var email = params.email;
			if (email) {
				this.email = params.email;
			}
			return true;
		};

		ForgetForm.prototype.attached = function attached() {
			if (!this.email) {
				this.hasFocus = true;
			}
		};

		ForgetForm.prototype.recover = function recover() {
			alert("E-mail de recuperação enviado para o endereço: " + this.email);
			this.email = "";
		};

		return ForgetForm;
	}();
});
define('login-form',["exports", "aurelia-event-aggregator", "./web-api"], function (exports, _aureliaEventAggregator, _webApi) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.LoginForm = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var LoginForm = exports.LoginForm = function () {
		LoginForm.inject = function inject() {
			return [_webApi.WebAPI, _aureliaEventAggregator.EventAggregator];
		};

		function LoginForm(api, ea) {
			_classCallCheck(this, LoginForm);

			this.api = api;
			this.ea = ea;

			this.email = "";
			this.password = "";
			this.remember = false;
		}

		LoginForm.prototype.attached = function attached() {
			this.hasFocus = true;
		};

		LoginForm.prototype.login = function login() {
			if (this.api.validateLogin(this.email, this.password)) {
				alert("Usuário encontrado. Sucesso ao realizar o Login!");
			} else {
				alert("Usuário/Senha inválidos");
			}
		};

		_createClass(LoginForm, [{
			key: "canSave",
			get: function get() {
				return this.email && this.password && !this.api.isRequesting;
			}
		}]);

		return LoginForm;
	}();
});
define('main',['exports', './environment'], function (exports, _environment) {
  'use strict';

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;

  var _environment2 = _interopRequireDefault(_environment);

  function _interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
      default: obj
    };
  }

  Promise.config({
    warnings: {
      wForgottenReturn: false
    }
  });

  function configure(aurelia) {
    aurelia.use.standardConfiguration().feature('resources');

    if (_environment2.default.debug) {
      aurelia.use.developmentLogging();
    }

    if (_environment2.default.testing) {
      aurelia.use.plugin('aurelia-testing');
    }

    aurelia.start().then(function () {
      return aurelia.setRoot();
    });
  }
});
define('register-form',["exports", "./web-api"], function (exports, _webApi) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});
	exports.RegisterForm = undefined;

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var _createClass = function () {
		function defineProperties(target, props) {
			for (var i = 0; i < props.length; i++) {
				var descriptor = props[i];
				descriptor.enumerable = descriptor.enumerable || false;
				descriptor.configurable = true;
				if ("value" in descriptor) descriptor.writable = true;
				Object.defineProperty(target, descriptor.key, descriptor);
			}
		}

		return function (Constructor, protoProps, staticProps) {
			if (protoProps) defineProperties(Constructor.prototype, protoProps);
			if (staticProps) defineProperties(Constructor, staticProps);
			return Constructor;
		};
	}();

	var RegisterForm = exports.RegisterForm = function () {
		RegisterForm.inject = function inject() {
			return [_webApi.WebAPI];
		};

		function RegisterForm(api) {
			_classCallCheck(this, RegisterForm);

			this.api = api;

			this.name = "";
			this.surname = "";
			this.email = "";
			this.password = "";
			this.repeatpassword = "";
		}

		RegisterForm.prototype.attached = function attached() {
			this.hasFocus = true;
		};

		RegisterForm.prototype.register = function register() {
			var user = {
				firstName: this.name,
				lastName: this.surname,
				email: this.email,
				password: this.password
			};

			if (this.api.saveUser(user)) {
				this.name = "";
				this.surname = "";
				this.email = "";
				this.password = "";
				this.repeatpassword = "";

				alert("Usuário cadastrado com sucesso!");
			} else {
				alert("Este e-mail já está em uso");
			}
		};

		_createClass(RegisterForm, [{
			key: "canSave",
			get: function get() {
				return this.name && this.surname && this.email && this.password && this.repeatpassword && !this.api.isRequesting;
			}
		}]);

		return RegisterForm;
	}();
});
define('teste',[], function () {
  "use strict";

  !function (t) {
    function o(t) {
      return "undefined" == typeof t.which ? !0 : "number" == typeof t.which && t.which > 0 ? !t.ctrlKey && !t.metaKey && !t.altKey && 8 != t.which && 9 != t.which && 13 != t.which && 16 != t.which && 17 != t.which && 20 != t.which && 27 != t.which : !1;
    }function i(o) {
      var i = t(o);i.prop("disabled") || i.closest(".form-group").addClass("is-focused");
    }function n(o) {
      o.closest("label").hover(function () {
        var o = t(this).find("input");o.prop("disabled") || i(o);
      }, function () {
        e(t(this).find("input"));
      });
    }function e(o) {
      t(o).closest(".form-group").removeClass("is-focused");
    }t.expr[":"].notmdproc = function (o) {
      return t(o).data("mdproc") ? !1 : !0;
    }, t.material = { options: { validate: !0, input: !0, ripples: !0, checkbox: !0, togglebutton: !0, radio: !0, arrive: !0, autofill: !1, withRipples: [".btn:not(.btn-link)", ".card-image", ".navbar a:not(.withoutripple)", ".footer a:not(.withoutripple)", ".dropdown-menu a", ".nav-tabs a:not(.withoutripple)", ".withripple", ".pagination li:not(.active):not(.disabled) a:not(.withoutripple)"].join(","), inputElements: "input.form-control, textarea.form-control, select.form-control", checkboxElements: ".checkbox > label > input[type=checkbox]", togglebuttonElements: ".togglebutton > label > input[type=checkbox]", radioElements: ".radio > label > input[type=radio]" }, checkbox: function checkbox(o) {
        var i = t(o ? o : this.options.checkboxElements).filter(":notmdproc").data("mdproc", !0).after("<span class='checkbox-material'><span class='check'></span></span>");n(i);
      }, togglebutton: function togglebutton(o) {
        var i = t(o ? o : this.options.togglebuttonElements).filter(":notmdproc").data("mdproc", !0).after("<span class='toggle'></span>");n(i);
      }, radio: function radio(o) {
        var i = t(o ? o : this.options.radioElements).filter(":notmdproc").data("mdproc", !0).after("<span class='circle'></span><span class='check'></span>");n(i);
      }, input: function input(o) {
        t(o ? o : this.options.inputElements).filter(":notmdproc").data("mdproc", !0).each(function () {
          var o = t(this),
              i = o.closest(".form-group");0 === i.length && (o.wrap("<div class='form-group'></div>"), i = o.closest(".form-group")), o.attr("data-hint") && (o.after("<p class='help-block'>" + o.attr("data-hint") + "</p>"), o.removeAttr("data-hint"));var n = { "input-lg": "form-group-lg", "input-sm": "form-group-sm" };if (t.each(n, function (t, n) {
            o.hasClass(t) && (o.removeClass(t), i.addClass(n));
          }), o.hasClass("floating-label")) {
            var e = o.attr("placeholder");o.attr("placeholder", null).removeClass("floating-label");var a = o.attr("id"),
                r = "";a && (r = "for='" + a + "'"), i.addClass("label-floating"), o.after("<label " + r + "class='control-label'>" + e + "</label>");
          }(null === o.val() || "undefined" == o.val() || "" === o.val()) && i.addClass("is-empty"), i.append("<span class='material-input'></span>"), i.find("input[type=file]").length > 0 && i.addClass("is-fileinput");
        });
      }, attachInputEventHandlers: function attachInputEventHandlers() {
        var n = this.options.validate;t(document).on("change", ".checkbox input[type=checkbox]", function () {
          t(this).blur();
        }).on("keydown paste", ".form-control", function (i) {
          o(i) && t(this).closest(".form-group").removeClass("is-empty");
        }).on("keyup change", ".form-control", function () {
          var o = t(this),
              i = o.closest(".form-group"),
              e = "undefined" == typeof o[0].checkValidity || o[0].checkValidity();"" === o.val() ? i.addClass("is-empty") : i.removeClass("is-empty"), n && (e ? i.removeClass("has-error") : i.addClass("has-error"));
        }).on("focus", ".form-control, .form-group.is-fileinput", function () {
          i(this);
        }).on("blur", ".form-control, .form-group.is-fileinput", function () {
          e(this);
        }).on("change", ".form-group input", function () {
          var o = t(this);if ("file" != o.attr("type")) {
            var i = o.closest(".form-group"),
                n = o.val();n ? i.removeClass("is-empty") : i.addClass("is-empty");
          }
        }).on("change", ".form-group.is-fileinput input[type='file']", function () {
          var o = t(this),
              i = o.closest(".form-group"),
              n = "";t.each(this.files, function (t, o) {
            n += o.name + ", ";
          }), n = n.substring(0, n.length - 2), n ? i.removeClass("is-empty") : i.addClass("is-empty"), i.find("input.form-control[readonly]").val(n);
        });
      }, ripples: function ripples(o) {
        t(o ? o : this.options.withRipples).ripples();
      }, autofill: function autofill() {
        var o = setInterval(function () {
          t("input[type!=checkbox]").each(function () {
            var o = t(this);o.val() && o.val() !== o.attr("value") && o.trigger("change");
          });
        }, 100);setTimeout(function () {
          clearInterval(o);
        }, 1e4);
      }, attachAutofillEventHandlers: function attachAutofillEventHandlers() {
        var o;t(document).on("focus", "input", function () {
          var i = t(this).parents("form").find("input").not("[type=file]");o = setInterval(function () {
            i.each(function () {
              var o = t(this);o.val() !== o.attr("value") && o.trigger("change");
            });
          }, 100);
        }).on("blur", ".form-group input", function () {
          clearInterval(o);
        });
      }, init: function init(o) {
        this.options = t.extend({}, this.options, o);var i = t(document);t.fn.ripples && this.options.ripples && this.ripples(), this.options.input && (this.input(), this.attachInputEventHandlers()), this.options.checkbox && this.checkbox(), this.options.togglebutton && this.togglebutton(), this.options.radio && this.radio(), this.options.autofill && (this.autofill(), this.attachAutofillEventHandlers()), document.arrive && this.options.arrive && (t.fn.ripples && this.options.ripples && i.arrive(this.options.withRipples, function () {
          t.material.ripples(t(this));
        }), this.options.input && i.arrive(this.options.inputElements, function () {
          t.material.input(t(this));
        }), this.options.checkbox && i.arrive(this.options.checkboxElements, function () {
          t.material.checkbox(t(this));
        }), this.options.radio && i.arrive(this.options.radioElements, function () {
          t.material.radio(t(this));
        }), this.options.togglebutton && i.arrive(this.options.togglebuttonElements, function () {
          t.material.togglebutton(t(this));
        }));
      } };
  }(jQuery), function (t, o, i, n) {
    "use strict";
    function e(o, i) {
      r = this, this.element = t(o), this.options = t.extend({}, s, i), this._defaults = s, this._name = a, this.init();
    }var a = "ripples",
        r = null,
        s = {};e.prototype.init = function () {
      var i = this.element;i.on("mousedown touchstart", function (n) {
        if (!r.isTouch() || "mousedown" !== n.type) {
          i.find(".ripple-container").length || i.append('<div class="ripple-container"></div>');var e = i.children(".ripple-container"),
              a = r.getRelY(e, n),
              s = r.getRelX(e, n);if (a || s) {
            var l = r.getRipplesColor(i),
                p = t("<div></div>");p.addClass("ripple").css({ left: s, top: a, "background-color": l }), e.append(p), function () {
              return o.getComputedStyle(p[0]).opacity;
            }(), r.rippleOn(i, p), setTimeout(function () {
              r.rippleEnd(p);
            }, 500), i.on("mouseup mouseleave touchend", function () {
              p.data("mousedown", "off"), "off" === p.data("animating") && r.rippleOut(p);
            });
          }
        }
      });
    }, e.prototype.getNewSize = function (t, o) {
      return Math.max(t.outerWidth(), t.outerHeight()) / o.outerWidth() * 2.5;
    }, e.prototype.getRelX = function (t, o) {
      var i = t.offset();return r.isTouch() ? (o = o.originalEvent, 1 === o.touches.length ? o.touches[0].pageX - i.left : !1) : o.pageX - i.left;
    }, e.prototype.getRelY = function (t, o) {
      var i = t.offset();return r.isTouch() ? (o = o.originalEvent, 1 === o.touches.length ? o.touches[0].pageY - i.top : !1) : o.pageY - i.top;
    }, e.prototype.getRipplesColor = function (t) {
      var i = t.data("ripple-color") ? t.data("ripple-color") : o.getComputedStyle(t[0]).color;return i;
    }, e.prototype.hasTransitionSupport = function () {
      var t = i.body || i.documentElement,
          o = t.style,
          e = o.transition !== n || o.WebkitTransition !== n || o.MozTransition !== n || o.MsTransition !== n || o.OTransition !== n;return e;
    }, e.prototype.isTouch = function () {
      return (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)
      );
    }, e.prototype.rippleEnd = function (t) {
      t.data("animating", "off"), "off" === t.data("mousedown") && r.rippleOut(t);
    }, e.prototype.rippleOut = function (t) {
      t.off(), r.hasTransitionSupport() ? t.addClass("ripple-out") : t.animate({ opacity: 0 }, 100, function () {
        t.trigger("transitionend");
      }), t.on("transitionend webkitTransitionEnd oTransitionEnd MSTransitionEnd", function () {
        t.remove();
      });
    }, e.prototype.rippleOn = function (t, o) {
      var i = r.getNewSize(t, o);r.hasTransitionSupport() ? o.css({ "-ms-transform": "scale(" + i + ")", "-moz-transform": "scale(" + i + ")", "-webkit-transform": "scale(" + i + ")", transform: "scale(" + i + ")" }).addClass("ripple-on").data("animating", "on").data("mousedown", "on") : o.animate({ width: 2 * Math.max(t.outerWidth(), t.outerHeight()), height: 2 * Math.max(t.outerWidth(), t.outerHeight()), "margin-left": -1 * Math.max(t.outerWidth(), t.outerHeight()), "margin-top": -1 * Math.max(t.outerWidth(), t.outerHeight()), opacity: .2 }, 500, function () {
        o.trigger("transitionend");
      });
    }, t.fn.ripples = function (o) {
      return this.each(function () {
        t.data(this, "plugin_" + a) || t.data(this, "plugin_" + a, new e(this, o));
      });
    };
  }(jQuery, window, document);
});
define('web-api',['exports'], function (exports) {
	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var latency = 200;
	var id = 0;

	function getId() {
		return ++id;
	}

	var users = [{
		id: getId(),
		firstName: 'John',
		lastName: 'Tolkien',
		email: 'tolkien@inklings.com',
		password: '123'
	}, {
		id: getId(),
		firstName: 'Clive',
		lastName: 'Lewis',
		email: 'lewis@inklings.com',
		password: '123'
	}, {
		id: getId(),
		firstName: 'Owen',
		lastName: 'Barfield',
		email: 'barfield@inklings.com',
		password: '123'
	}, {
		id: getId(),
		firstName: 'Charles',
		lastName: 'Williams',
		email: 'williams@inklings.com',
		password: '123'
	}, {
		id: getId(),
		firstName: 'Roger',
		lastName: 'Green',
		email: 'green@inklings.com',
		password: '123'
	}];

	var WebAPI = exports.WebAPI = function () {
		function WebAPI() {
			_classCallCheck(this, WebAPI);

			this.isRequesting = false;
		}

		WebAPI.prototype.getUserList = function getUserList() {
			var _this = this;

			this.isRequesting = true;
			return new Promise(function (resolve) {
				setTimeout(function () {
					var results = users.map(function (x) {
						return {
							id: x.id,
							firstName: x.firstName,
							lastName: x.lastName,
							email: x.email,
							password: x.password
						};
					});
					resolve(results);
					_this.isRequesting = false;
				}, latency);
			});
		};

		WebAPI.prototype.saveUser = function saveUser(user) {
			var _this2 = this;

			this.isRequesting = true;
			return new Promise(function (resolve) {
				setTimeout(function () {
					var instance = JSON.parse(JSON.stringify(user));
					var found = users.filter(function (x) {
						return x.email == user.email;
					})[0];

					if (found) {
						_this2.isRequesting = false;
						return false;
					} else {
						instance.id = getId();
						users.push(instance);
					}

					_this2.isRequesting = false;
					resolve(instance);
					return true;
				}, latency);
			});
		};

		WebAPI.prototype.validateLogin = function validateLogin(email, password) {
			return users.filter(function (x) {
				return x.email == email && x.password == password;
			})[0];
		};

		return WebAPI;
	}();
});
define('resources/index',["exports"], function (exports) {
  "use strict";

  Object.defineProperty(exports, "__esModule", {
    value: true
  });
  exports.configure = configure;
  function configure(config) {}
});
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><div class=\"wrapper\"><div class=\"container\"><div class=\"row\" style=\"height:100%\"><router-view></router-view></div></div></div></template>"; });
define('text!styles.css', ['module'], function(module) { module.exports = "body {\r\n    zoom: 0.8;\r\n    width: 100%;\r\n    height: 100%;\r\n}\r\n\r\n.wrapper {\r\n    position: relative;\r\n    top: 0;\r\n    height: 100vh;\r\n}\r\n\r\n.wrapper {\r\n    -webkit-transform: translate3d(0px, 0, 0);\r\n    -moz-transform: translate3d(0px, 0, 0);\r\n    -o-transform: translate3d(0px, 0, 0);\r\n    -ms-transform: translate3d(0px, 0, 0);\r\n    transform: translate3d(0px, 0, 0);\r\n    -webkit-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);\r\n    -moz-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);\r\n    -o-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);\r\n    -ms-transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);\r\n    transition: all 0.33s cubic-bezier(0.685, 0.0473, 0.346, 1);\r\n    left: 0;\r\n    background-color: white;\r\n}\r\n\r\n.small_top_redirect {\r\n    float: right;\r\n    position: relative;\r\n    top: -20px;\r\n}\r\n\r\n.footer_register_redirect {\r\n    border-top: 1px solid #888;\r\n    padding-top: 15px;\r\n}\r\n\r\n.main_panel {\r\n    margin-top: 50px;\r\n}\r\n\r\n.input-group {\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.login_body_panel {\r\n    padding-top: 30px;\r\n    padding-bottom: 0px;\r\n}\r\n\r\n.login_button {\r\n    margin-top: 10px;\r\n    float: right;\r\n}\r\n\r\n.remember_checkbox {\r\n    float: left;\r\n}"; });
define('text!forget-form.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 main_panel\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"panel-title\">Recuperar Acesso</div><div class=\"small_top_redirect\"><a route-href=\"route: login\">Entrar</a></div></div><div class=\"panel-body login_body_panel\"><form class=\"form-horizontal\" role=\"form\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"email\" placeholder=\"Digite seu E-mail\" focus.bind=\"hasFocus\"></div><div class=\"form-group login_button\"><div class=\"col-sm-12 controls\"><button class=\"btn btn-success\" click.delegate=\"recover()\">Recuperar</button></div></div></form></div></div></div></div></template>"; });
define('text!login-form.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 main_panel\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"panel-title\">Fazer Login</div><div class=\"small_top_redirect\"><small class=\"form-text text-muted\"><a route-href=\"route: forget; params.bind: {email}\">Esqueceu sua senha?</a></small></div></div><div class=\"panel-body login_body_panel\"><form class=\"form-horizontal\" role=\"form\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"email\" placeholder=\"Digite seu e-mail\" focus.bind=\"hasFocus\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i></span> <input type=\"password\" class=\"form-control\" value.bind=\"password\" placeholder=\"Password\"></div><div class=\"checkbox remember_checkbox\"><label><input type=\"checkbox\" checked.bind=\"remember\"> Permanecer logado</label></div><div class=\"form-group login_button\"><div class=\"col-sm-12 controls\"><button class=\"btn btn-success\" click.delegate=\"login()\" disabled.bind=\"!canSave\">Entrar</button></div></div><div class=\"form-group\"><div class=\"col-md-12 control\"><div class=\"footer_register_redirect\"><small class=\"form-text text-muted\">Não possui uma conta? <a route-href=\"route: register\">Registre-se aqui</a></small></div></div></div></form></div></div></div></div></template>"; });
define('text!register-form.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 main_panel\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"panel-title\">Preencha seu Registro</div><div class=\"small_top_redirect\"><a route-href=\"route: login\">Entrar</a></div></div><div class=\"panel-body login_body_panel\"><form class=\"form-horizontal\" role=\"form\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"name\" placeholder=\"Digite seu nome\" focus.bind=\"hasFocus\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"surname\" placeholder=\"Digite seu sobrenome\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"email\" placeholder=\"Digite seu E-mail\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"password\" class=\"form-control\" value.bind=\"password\" placeholder=\"Digite sua Senha\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"password\" class=\"form-control\" value.bind=\"repeatpassword\" placeholder=\"Repita sua Senha\"></div><div class=\"form-group login_button\"><div class=\"col-sm-12 controls\"><button class=\"btn btn-success\" click.delegate=\"register()\" disabled.bind=\"!canSave\">Registrar</button></div></div></form></div></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map