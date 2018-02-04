var keystone = require('keystone');
var Types = keystone.Field.Types;
/**
 * User Model
 * ==========
 */
var BotCustomers = new keystone.List('BotLists');

BotCustomers.add({
	name: String,
	bidAmount: Number,
	voteValue: Number,
	members: Types.TextArray
});

// Provide access to Keystone

/**
 * Registration
 */

BotCustomers.defaultColumns = 'name, bidAmount, voteValue';

BotCustomers.register();
