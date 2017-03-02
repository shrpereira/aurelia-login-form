let latency = 200;
let id = 0;

function getId() {
	return ++id;
}

let users = [
	{
		id: getId(),
		firstName: 'John',
		lastName: 'Tolkien',
		email: 'tolkien@inklings.com',
		password: '123'
	},
	{
		id: getId(),
		firstName: 'Clive',
		lastName: 'Lewis',
		email: 'lewis@inklings.com',
		password: '123'
	},
	{
		id: getId(),
		firstName: 'Owen',
		lastName: 'Barfield',
		email: 'barfield@inklings.com',
		password: '123'
	},
	{
		id: getId(),
		firstName: 'Charles',
		lastName: 'Williams',
		email: 'williams@inklings.com',
		password: '123'
	},
	{
		id: getId(),
		firstName: 'Roger',
		lastName: 'Green',
		email: 'green@inklings.com',
		password: '123'
	}
];

export class WebAPI {
	isRequesting = false;

	getUserList() {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let results = users.map(x => {
					return {
						id: x.id,
						firstName: x.firstName,
						lastName: x.lastName,
						email: x.email,
						password: x.password
					}
				});
				resolve(results);
				this.isRequesting = false;
			}, latency);
		});
	}

	saveUser(user) {
		this.isRequesting = true;
		return new Promise(resolve => {
			setTimeout(() => {
				let instance = JSON.parse(JSON.stringify(user));
				let found = users.filter(x => x.email == user.email)[0];

				if (found) {
					this.isRequesting = false;
					return false;
				} else {
					instance.id = getId();
					users.push(instance);
				}

				this.isRequesting = false;
				resolve(instance);
				return true;
			}, latency);
		});
	}

	validateLogin(email, password) {
		return users.filter(x => x.email == email && x.password == password)[0];
	}
}
