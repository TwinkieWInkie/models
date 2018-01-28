var keystone = require('keystone');
var Types = keystone.Field.Types;
var steem = require('steem');
const pm2 = require('pm2')
/**
 * User Model
 * ==========
 */
var BotSettings = new keystone.List('BotSettings', {
	defaultSort: 'done'
});

BotSettings.add({
	username: String,
	postingKey: String,
	activeKey: String,
	commentMessage: String,
    bidAmount: Number,
    minCharacters: Number,
	minSeconds: Number,
	votePercentage: Number,
	blacklist: Types.TextArray,
	reportTitle: String,
	reportMessage: Types.Textarea,
	reportMainTag: String,
	reportTags: Types.TextArray
});

// Provide access to Keystone

BotSettings.schema.post('save', function() {
	pm2.restart('index', (err, res) => {
		console.log(err)
		console.log(res)
	})
})

/**
 * Registration
 */

BotSettings.defaultColumns = 'username, votePercentage';

BotSettings.register();
