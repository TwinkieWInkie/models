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
	url: String
});

// Provide access to Keystone

/**
 * Registration
 */

BotPosts.defaultColumns = 'username, lastUpvote';

BotPosts.register();
