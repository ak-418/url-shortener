const express = require('express');
const router = express.Router();
const db = require('../database');
const services = require('../services');

router.get("/all", services.getAllRedirections);

// create a new redirection
router.post("/create", services.shortenUrl);

// fetch redirections if any
router.get("/path/:from", services.getRedirection);

module.exports = router;