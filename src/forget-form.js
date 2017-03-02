export class ForgetForm {
	constructor() {
		this.email = "";
	}

	activate(params) {
		const email = params.email;
		if (email) {
			this.email = params.email;
		}
		return true;
	}

	attached() {
		if (!this.email) {
			this.hasFocus = true;
		}
	}

	recover() {
		alert("E-mail de recuperação enviado para o endereço: " + this.email);
		this.email = "";
	}
}