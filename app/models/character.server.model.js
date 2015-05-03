'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

/**
 * Character Schema
 */
var CharacterSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill Character name',
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
    realm: {
        type: String,
        default: ''
    },
    race: {
        type: String,
        default: ''
    },
    class: {
        type: String,
        default: ''
    },
    achievements: {
        type: Number,
        default: '0'
    },
    level: {
        type: Number,
        default: '0'
    },
    thumbnail: {
        type: String,
        default: ''
    },
    guildName: {
        type: String,
        default: ''
    },
    guildMembers: {
        type: Number,
        default: null
    },
    guildRealm: {
        type: String,
        default: ''
    },
    lastUpdated: {
        type: Date,
        default: ''
    },
    guild: {
        type: Schema.ObjectId,
        ref: 'Guild'
    },
    guildPageRank: {
        type: Number,
        default: null
    }
});

mongoose.model('Character', CharacterSchema);