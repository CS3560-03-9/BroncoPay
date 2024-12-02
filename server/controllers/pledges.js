const db = require("../utils/db");
const businessController = require("./businesses");

async function getPledges(handler) {
	return await db.query('SELECT * FROM `pledges` WHERE `handler` = ?', [handler]);
}

async function createPledge(body) {
	const businessExists = await this.businessExists(body.handler);
	if (!businessExists) {
		throw new Error('business does not exist');
	}
	return await db.query('INSERT INTO `pledges` (`handler`, `cost`, `pledge_interval`, `pledge_desc`) VALUES (?, ?, ?, ?)',
		[body.handler, body.cost, body.interval, body.description]);
}

module.exports = {
	getPledges,
	createPledge,
}