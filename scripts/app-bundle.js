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
define('messages',["exports"], function (exports) {
	"use strict";

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	function _classCallCheck(instance, Constructor) {
		if (!(instance instanceof Constructor)) {
			throw new TypeError("Cannot call a class as a function");
		}
	}

	var EmailChanged = exports.EmailChanged = function EmailChanged(email) {
		_classCallCheck(this, EmailChanged);

		this.email = email;
	};
});
define('text!styles.css', ['module'], function(module) { module.exports = ".small_top_redirect {\r\n    float: right;\r\n    font-size: 75%;\r\n    position: relative;\r\n    top: -20px;\r\n}\r\n\r\n.footer_register_redirect {\r\n    border-top: 1px solid #888;\r\n    padding-top: 15px;\r\n    font-size: 85%;\r\n}\r\n\r\n.main_panel {\r\n    margin-top: 50px;\r\n}\r\n\r\n.input-group {\r\n    margin-bottom: 15px;\r\n}\r\n\r\n.login_body_panel {\r\n    padding-top: 30px;\r\n    padding-bottom: 0px;\r\n}\r\n\r\n.login_button {\r\n    margin-top: 10px;\r\n    float: right;\r\n}\r\n\r\n.remember_checkbox {\r\n    float: left;\r\n}"; });
define('text!app.html', ['module'], function(module) { module.exports = "<template><require from=\"bootstrap/css/bootstrap.css\"></require><require from=\"./styles.css\"></require><div class=\"container\"><div class=\"row\"><router-view></router-view></div></div></template>"; });
define('text!forget-form.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 main_panel\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"panel-title\">Recuperar Acesso</div><div class=\"small_top_redirect\"><a route-href=\"route: login\">Entrar</a></div></div><div class=\"panel-body login_body_panel\"><form class=\"form-horizontal\" role=\"form\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"email\" placeholder=\"Digite seu E-mail\" focus.bind=\"hasFocus\"></div><div class=\"form-group login_button\"><div class=\"col-sm-12 controls\"><button class=\"btn btn-success\" click.delegate=\"recover()\">Recuperar</button></div></div></form></div></div></div></div></template>"; });
define('text!login-form.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 main_panel\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"panel-title\">Fazer Login</div><div class=\"small_top_redirect\"><a route-href=\"route: forget; params.bind: {email}\">Esqueceu sua senha?</a></div></div><div class=\"panel-body login_body_panel\"><form class=\"form-horizontal\" role=\"form\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-user\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"email\" placeholder=\"Digite seu e-mail\" focus.bind=\"hasFocus\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-lock\" aria-hidden=\"true\"></i></span> <input type=\"password\" class=\"form-control\" value.bind=\"password\" placeholder=\"Password\"></div><div class=\"checkbox remember_checkbox\"><label><input type=\"checkbox\" checked.bind=\"remember\"> Permanecer logado</label></div><div class=\"form-group login_button\"><div class=\"col-sm-12 controls\"><button class=\"btn btn-success\" click.delegate=\"login()\" disabled.bind=\"!canSave\">Entrar</button></div></div><div class=\"form-group\"><div class=\"col-md-12 control\"><div class=\"footer_register_redirect\">Não possui uma conta? <a route-href=\"route: register\">Registre-se aqui</a></div></div></div></form></div></div></div></div></template>"; });
define('text!register-form.html', ['module'], function(module) { module.exports = "<template><div class=\"container\"><div class=\"mainbox col-md-6 col-md-offset-3 col-sm-8 col-sm-offset-2 main_panel\"><div class=\"panel panel-info\"><div class=\"panel-heading\"><div class=\"panel-title\">Preencha seu Registro</div><div class=\"small_top_redirect\"><a route-href=\"route: login\">Entrar</a></div></div><div class=\"panel-body login_body_panel\"><form class=\"form-horizontal\" role=\"form\"><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"name\" placeholder=\"Digite seu nome\" focus.bind=\"hasFocus\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"surname\" placeholder=\"Digite seu sobrenome\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"text\" class=\"form-control\" value.bind=\"email\" placeholder=\"Digite seu E-mail\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"password\" class=\"form-control\" value.bind=\"password\" placeholder=\"Digite sua Senha\"></div><div class=\"input-group\"><span class=\"input-group-addon\"><i class=\"fa fa-plus-square-o\" aria-hidden=\"true\"></i></span> <input type=\"password\" class=\"form-control\" value.bind=\"repeatpassword\" placeholder=\"Repita sua Senha\"></div><div class=\"form-group login_button\"><div class=\"col-sm-12 controls\"><button class=\"btn btn-success\" click.delegate=\"register()\" disabled.bind=\"!canSave\">Registrar</button></div></div></form></div></div></div></div></template>"; });
//# sourceMappingURL=app-bundle.js.map