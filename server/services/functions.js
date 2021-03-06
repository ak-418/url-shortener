const db = require('../database');
const { generateAlphaNumericString } = require("../utils");

const addNewUrl = async (data) => {
	try {
		return db.Redirection.create(data);
	} catch (err) {
		throw new Error(err);
	}
};

const generateShortUrl = async (shortened) => {
	try {
		const from = shortened || generateAlphaNumericString(10);
		const existing = await db.Redirection.findOne({ where: { from }, raw: true });
		if (!existing) {
			return from;
		}
		generateShortUrl(generateAlphaNumericString(10));
	} catch (err) {
		throw new Error(err);
	}
};

const fetchRedirection = async (from) => {
	try {
		const response = await db.Redirection.findOne({ where: { from }, raw: true });
		return response;
	} catch (err) {
		throw new Error(err);
	}
};

const incrementClickCount = async (id) => {
	try {
		const response = await db.Redirection.increment('clicks', { by: 1, where: { id } });
		return response;
	} catch (err) {
		throw new Error(err);
	}
}

const parseResponseItem = (item) =>{
	return {
		from: item.from,
		to: item.to,
		createdAt: item.createdAt,
		clicks: item.clicks,
	}
}

const fetchAllRedirections = async () => {
	try {
		const response = await db.Redirection.findAll({ order: [['createdAt', 'desc']] });
		return response;
	} catch (err) {
		throw new Error(err);
	}
};

module.exports = {
	addNewUrl,
	generateShortUrl,
	fetchRedirection,
	incrementClickCount,
	parseResponseItem,
	fetchAllRedirections,
}