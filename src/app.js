export class App {
	constructor() {
	}

	configureRouter(config, router) {
		config.title = '';
		config.map([
			{route: '', moduleId: 'login-form', title: 'Login'},
			{route: 'login', moduleId: 'login-form', name: 'login', title: 'Login'},
			{route: 'register', moduleId: 'register-form', name: 'register', title: 'Register'},
			{route: 'forget', moduleId: 'forget-form', name: 'forget', title: 'Forget'},
			{route: 'forget/:email', moduleId: 'forget-form', name: 'forget', title: 'Forget'}
		]);

		this.router = router;
	}

}
