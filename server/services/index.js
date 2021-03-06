const {
	isUrlValid,
	isValidShortForm,
} = require('../utils');
const {
	addNewUrl,
	generateShortUrl,
	fetchRedirection,
	incrementClickCount,
	parseResponseItem,
	fetchAllRedirections,
} = require('./functions');

const shortenUrl = async (req, res) => {
	try {
		const { to } = req.body;
		if (!to || !isUrlValid(to)) {
			return res.status(400).json({ message: "Missing/invalid URL" });
		}
		const from = await generateShortUrl();

		const redirection = await addNewUrl({
			from,
			to,
		});

		return res.json(parseResponseItem(redirection));
	} catch (error) {
		console.log('Error shortening url', error);
		return res.status(500).json({ error });
	}
};

const getRedirection = async (req, res) => {
	try {
		const { from } = req.params;
		if (!from || from.length > 10 || !isValidShortForm(from)) {
			return res.status(400).json({ message: "Missing/invalid info" });
		}
		const redirection = await fetchRedirection(from);
		if (!redirection) {
			return res.sendStatus(404);
		}
		await incrementClickCount(redirection.id);
		return res.status(200).json({ redirectUrl: redirection.to })
	} catch (error) {
		console.log("Error fetching redirection", error);
		return res.status(500).json({ error })
	}
};

const getAllRedirections = async (req, res) => {
	try {
		const redirections = await fetchAllRedirections();
		return res.json(redirections);
	} catch (error) {
		console.log("Error fetching redirections", error);
		return res.status(500).json({ error })
	}
}

module.exports = {
	shortenUrl,
	getRedirection,
	getAllRedirections,
}