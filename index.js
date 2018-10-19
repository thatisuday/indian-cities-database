// load modules
const mongoose 		= 	require('mongoose');
const _ 			= 	require('lodash');
const async 		= 	require('async');
const progressBar 	= 	require('progress');

// export database as array
exports.cities = require('./cities.js');

// create new progress bar
var bar = new progressBar('populating [:bar] :percent :etas', {
	total : exports.cities.length,
	clear : true
});

// export city schema
exports.citySchema = require('./citySchema');

// export function to push database in mongodb database
exports.pushToDatabase = function(database, collection, callback, options){
	
	// default storage
	database 	= (database) 	? database 		: 'indian-cities';
	collection 	= (collection) 	? collection 	: 'cities';

	// connect to local instance
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://127.0.0.1/' + database);
	
	// catach error
	mongoose.connection.on('error', function(){
		return console.log('failed to connect mongodb database on local machine.');
	});

	// start pushing
	mongoose.connection.on('open', function(){
		
		// require citySchema and set collection
		var citySchema = exports.citySchema;
		citySchema.set('collection', collection);

		// create model
		var City = mongoose.model('City', citySchema);

		// drop old collection
		// run loop on cities
		mongoose.connection.db.dropCollection(collection, function(err, result){
			// save each city in database
			async.each(exports.cities, function(city, cb){
				var cityMongoDoc = new City({
					cityId 		: 	city.city+city.state,
					cityName 	: 	city.city,
					keywords 	: 	city.city,
					stateId 	: 	city.state,
					stateName 	: 	city.state
				});

				cityMongoDoc.save(function(err){
					if(err){
						cb(new Error());
					}
					else{
						if(_.get(options, 'showOutput') != false){
							bar.tick();
						}
						
						cb(null);
					}
				});
			}, function(err){
				if(_.get(options, 'showOutput') != false){
					if(err){
						console.log('Some error occured while saving the document');
					}
					else{
						console.log('Done! Populated in : ' + database + ' -> ' + collection)
					}
				}

				// call callback
				(callback) ? callback() : _.noop();
			});
		});
	});
}