var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * User Model
 * ==========
 */
var BotCustomers = new keystone.List('BotCustomers', {
	defaultSort: 'done'
});

BotCustomers.add({
	username: String,
	lastUpvote: Types.Datetime
});

// Provide access to Keystone

/**
 * Registration
 */

BotCustomers.defaultColumns = 'username, lastUpvote';

BotCustomers.register();
