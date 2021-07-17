const Sequelize = require('sequelize');
const sequelize = new Sequelize(process.env.DB_SCHEMA || 'url_shortener',
	process.env.DB_USER || 'amritha',
	process.env.DB_PASSWORD || '',
	{
		host: process.env.DB_HOST || 'localhost',
		port: process.env.DB_PORT || 5432,
		dialect: 'postgres',
		dialectOptions: {
			ssl: process.env.DB_SSL == "true"
		}
	});
const Redirection = sequelize.define('redirections', {
	id: {
		type: Sequelize.INTEGER,
		primaryKey: true,
		autoIncrement: true,
	},
	from: {
		type: Sequelize.STRING,
		allowNull: true
	},
	to: {
		type: Sequelize.STRING,
		allowNull: true
	},
	clicks: {
		type: Sequelize.INTEGER,
	},
	createdAt: {
		type: Sequelize.DATE,
	},
	updatedAt: {
		type: Sequelize.DATE,
	}
});
module.exports = {
	sequelize: sequelize,
	Redirection: Redirection
};