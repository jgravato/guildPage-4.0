'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Guild Schema
 */
var GuildSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Guild name',
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	},
    level: {
        type: Number,
        default: 0
    },
    achievements: {
        type: Number,
        default: 0
    },
    guildRealm: {
        type: String,
        default: null
    },
    emblem: {
        type: Object
    },
    membersNum: {
        type: Number,
        default: null
    },
    members: {
        type: Object
    },
    wallPosts: {
        type: Schema.ObjectId,
        ref: 'Article'
    },
});

mongoose.model('Guild', GuildSchema);