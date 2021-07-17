// redirections.js

var express = require('express');
var router = express.Router();
var db = require('../database');

router.get("/all", function (req, res) {
	db.Redirection.findAll()
		.then(redirections => {
			res.status(200).send(JSON.stringify(redirections));
		})
		.catch(err => {
			res.status(500).send(JSON.stringify(err));
		});
});

router.get("/:id", function (req, res) {
	db.Redirection.findByPk(req.params.id)
		.then(redirection => {
			res.status(200).send(JSON.stringify(redirection));
		})
		.catch(err => {
			res.status(500).send(JSON.stringify(err));
		});
});

router.put("/", function (req, res) {
	db.Redirection.create({
		firstName: req.body.firstName,
		lastName: req.body.lastName,
		id: req.body.id
	})
		.then(redirection => {
			res.status(200).send(JSON.stringify(redirection));
		})
		.catch(err => {
			res.status(500).send(JSON.stringify(err));
		});
});

router.delete("/:id", function (req, res) {
	db.Redirection.destroy({
		where: {
			id: req.params.id
		}
	})
		.then(() => {
			res.status(200).send();
		})
		.catch(err => {
			res.status(500).send(JSON.stringify(err));
		});
});

module.exports = router;