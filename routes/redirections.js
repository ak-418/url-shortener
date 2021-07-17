const express = require('express');
const router = express.Router();
const db = require('../database');
const services = require('../services');

router.get("/all", function (req, res) {
	db.Redirection.findAll()
		.then(redirections => {
			res.status(200).send(JSON.stringify(redirections));
		})
		.catch(err => {
			res.status(500).send(JSON.stringify(err));
		});
});

// create a new redirection
router.post("/create", services.shortenUrl);

module.exports = router;