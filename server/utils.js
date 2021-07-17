const generateAlphaNumericString = (size = 10) => {
	let text = '';
	const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for (let i = 0; i < size; i += 1) {
		text += possible.charAt(Math.floor(Math.random() * possible.length));
	}
	return text;
};

const isUrlValid = (url) => {
	try {
		return new URL(url);
	} catch (e) {
		return false;
	}
};

const isValidShortForm = (string) => {
	return string.match(/[A-Za-z0-9]/);
};

module.exports = {
	generateAlphaNumericString,
	isUrlValid,
	isValidShortForm,
}