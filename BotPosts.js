var keystone = require('keystone');
var Types = keystone.Field.Types;

/**
 * User Model
 * ==========
 */
var BotPosts = new keystone.List('BotPosts', {
	defaultSort: 'done'
});

BotPosts.add({
	reported: Boolean,
	upvotedBy: { type: Types.Relationship, ref: 'BotSettings' },
	url: {
		type: String,
		alias: 'memo'
	},
	trx_id: String,
	memo: String,
	permlink: String,
	amount: String,
	to: String,
	from: String,
	tries: { type: Number, default: 0 },
	receivedRefund: {type: Boolean, default: false},
	receivedUpvote: {type: Boolean, default: false},
	doRefund: { type: Boolean, default: false },
	done: {type: Boolean, default: false}
});

BotPosts.schema.loadClass(
	class {
		set startProcess (a) {
			if (this.tries > 3) {
				this.doRefund = true
			}
		}
		
		set gotRefunded (a) {
			this.receivedUpvote = true
			this.done = true
		}
		
		set gotVoted (a) {
			this.receivedUpvote = true
			this.done = true
		}
	}
)

// Provide access to Keystone

/**
 * Registration
 */

BotPosts.defaultColumns = 'username, lastUpvote';

BotPosts.register();
