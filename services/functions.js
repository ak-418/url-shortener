const db = require('../database');
const { generateAlphaNumericString } = require("../utils");

const addNewUrl = async (data) => {
	try {
		return db.Redirection.create(data);
	} catch (err) {
		throw new Error();
	}
}

const generateShortUrl = async (shortened) => {
	try {
		let from = shortened || generateAlphaNumericString(8);
		const existing = await db.Redirection.findOne({ where: { from }, raw: true });
		if (!existing) {
			return from;
		}
		generateShortUrl(generateAlphaNumericString(8));
	} catch (err) {
		throw new Error();
	}
}

module.exports = {
	addNewUrl,
	generateShortUrl,
}