const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');

const indexRouter = require('./routes/index');
const redirections = require('./routes/redirections');
const PORT = process.env.PORT || 3001;

const app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/', indexRouter);
app.use('/api/redirections', redirections);

app.listen(PORT, (error) => {
	if (error) {
		return console.log('Error starting server', error);
	}
	console.log(`Server started Listening on ${PORT}`);
});

module.exports = app;
