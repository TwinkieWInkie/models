var keystone = require('keystone');
var Types = keystone.Field.Types;
var steem = require('steem');
const pm2 = require('pm2')
const schedule = require('node-schedule')
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
    voteValue: Number,
	reportTitle: String,
	reportMessage: Types.Textarea,
	reportMainTag: String,
	reportTags: Types.TextArray,
	blacklist: Types.TextArray,
	KeepOff: Boolean,
	DontStartUntil: Boolean,
	dontStartUntil: Types.Datetime,
	KillBotOn: Boolean,
	killBotOn: Types.Datetime
});

// Provide access to Keystone

BotSettings.schema.pre('save', function(next) {
	pm2.stop('index', function() {})
	
	if (!this.KeepOff) {
		if (!this.DontStartUntil) {
			pm2.start({
				script: 'transferBot/index.js'
			}, function () {})
		} else {
			schedule.scheduleJob(this.dontStartUntil, () => {
				pm2.start('transferBot/index.js', function() {})
			})
			this.DontStartUntil = false
		}

		if (this.KillBotOn) {
			schedule.scheduleJob(this.killBotOn, () => {
				pm2.stop('index', function () {})
			})
			this.KillBotOn = false
		}
	}
	
	
	next()
})

/**
 * Registration
 */

BotSettings.defaultColumns = 'username, votePercentage';

BotSettings.register();
