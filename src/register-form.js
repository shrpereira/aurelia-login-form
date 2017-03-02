import {WebAPI} from "./web-api";

export class RegisterForm {

	static inject() {
		return [WebAPI]
	};

	constructor(api) {
		this.api = api;

		this.name = "";
		this.surname = "";
		this.email = "";
		this.password = "";
		this.repeatpassword = "";
	}

	attached() {
		this.hasFocus = true;
	}

	register() {
		let user = {
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
	}

	get canSave() {
		return this.name && this.surname && this.email && this.password && this.repeatpassword && !this.api.isRequesting;
	}
}