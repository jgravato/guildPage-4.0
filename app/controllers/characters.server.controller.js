'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	errorHandler = require('./errors.server.controller'),
    User = mongoose.model('User'),
	Character = mongoose.model('Character'),
	_ = require('lodash');

/**
 * Create a Character
 */
exports.create = function(req, res) {
	var character = new Character(req.body);
	character.user = req.user;

	character.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
            var socketio = req.app.get('socketio'); // makes a socket instance
            socketio.emit('character.created', character); // sends the socket event to all current users
			res.jsonp(character);
		}
	});
};



//select character
exports.select = function(req, res) {
    var character = req.character;
    
    console.log('hey hoe');
    res.jsonp(req.character);
    
    
};



/**
 * Show the current Character
 */
exports.read = function(req, res) {
	res.jsonp(req.character);
};

/**
 * Update a Character
 */
exports.update = function(req, res) {
	var character = req.character ;

	character = _.extend(character , req.body);

	character.save(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(character);
		}
	});
};

/**
 * Delete an Character
 */
exports.delete = function(req, res) {
	var character = req.character ;

	character.remove(function(err) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(character);
		}
	});
};

/**
 * List of Characters
 */
exports.list = function(req, res) { 
	Character.find({ user: req.user }).sort('-created').populate('user', 'displayName').exec(function(err, characters) {
		if (err) {
			return res.status(400).send({
				message: errorHandler.getErrorMessage(err)
			});
		} else {
			res.jsonp(characters);
		}
	});
};

/**
 * Character middleware
 */
exports.characterByID = function(req, res, next, id) { 
	Character.findById(id).populate('user', 'displayName').exec(function(err, character) {
		if (err) return next(err);
		if (! character) return next(new Error('Failed to load Character ' + id));
		req.character = character ;
		next();
	});
};

/**
 * Character authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.character.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}
	next();
};
