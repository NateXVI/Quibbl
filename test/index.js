console.log('Qapi testing');

class Qapi {
	url = 'http://localhost:3001';

	constructor() {
		this.token = localStorage.getItem('auth-token') || '';
		console.log(this.token);
	}

	checkToken = async () => {
		if (this.token == '') return false;
		const response = await fetch(this.url + '/api/check', {
			headers: {
				'auth-token': this.token,
			},
		});
		if (response.status != 200) this.logout();
		return response.status == 200;
	};

	login = async (info) => {
		const response = await fetch(this.url + '/api/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(info),
		});
		const text = await response.text();
		if (response.status == 200) {
			this.token = text;
			localStorage.setItem('auth-token', text);
		}
		return { status: response.status, text };
	};

	logout = () => {
		qapi.token = '';
		location.replace('/');
	};

	register = async (info) => {
		const response = await fetch;
	};
}

qapi = new Qapi();

(async function () {
	await qapi.checkToken().then((res) => console.log(res));
	await qapi
		.login({ account: 'slayer4000', password: 'asdfasdf' })
		.then((res) => console.log(res));
	await qapi.checkToken().then((res) => console.log(res));

	// localStorage.removeItem('auth-token');
})();
