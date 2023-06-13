export class ExpiredTokensErro extends Error {
	constructor() {
		super('expired token.');
	}
}
