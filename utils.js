const generateAlphaNumericString = (size = 8) => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < size; i += 1) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
}

const isUrlValid = (url) => {
	try {
		return new URL(url);
	} catch (e) {
		return false;
	}
}

module.exports = {
	generateAlphaNumericString,
	isUrlValid,
}