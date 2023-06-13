export class CustomError extends Error {
	private readonly _message: string;
	private readonly _statusCode: number;

	constructor(message: string, statusCode = 500) {
		super(message);
		this._message = message;
		this._statusCode = statusCode;
	}

	get message(): string {
		return this._message;
	}

	get statusCode(): number {
		return this._statusCode;
	}
}
