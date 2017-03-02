import {EventAggregator} from "aurelia-event-aggregator";
import {WebAPI} from "./web-api";

export class LoginForm {
	static inject() {
		return [WebAPI, EventAggregator]
	};

	constructor(api, ea) {
		this.api = api;
		this.ea = ea;

		this.email = "";
		this.password = "";
		this.remember = false;
	}

	attached() {
		this.hasFocus = true;
	}

	login() {
		if (this.api.validateLogin(this.email, this.password)) {
			alert("Usuário encontrado. Sucesso ao realizar o Login!");
		} else {
			alert("Usuário/Senha inválidos");
		}
	}

	get canSave() {
		return this.email && this.password && !this.api.isRequesting;
	}
}