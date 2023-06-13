export function generateNumberToken(length: number) {
	const digits = '0123456789';
	let token = '';

	for (let i = 0; i < length; i++) {
		const randomIndex = Math.floor(Math.random() * digits.length);
		token += digits[randomIndex];
	}

	return token;
}
