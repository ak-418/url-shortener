const { isUrlValid } = require('../utils');
const {
	addNewUrl,
	generateShortUrl,
} = require('./functions');

const shortenUrl = async (req, res) => {
	try {
		const { to } = req.body;
		if (!to || !isUrlValid(to)) {
			return res.status(400).json({ message: "Missing/invalid URL" });
		}
		const from = await generateShortUrl();

		await addNewUrl({
			from,
			to,
		});

		return res.sendstatus(200);
	} catch (err) {
		console.log('Error shortening url', err);
		return res.status(500).send({ err });
	}
}

module.exports = {
	shortenUrl,
}