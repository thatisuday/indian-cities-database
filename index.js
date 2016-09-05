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

// export function to push database in mongodb database
exports.pushToDatabase = function(database, collection, callback, options){
	
	// default storage
	database = (database) 	? database : 'indian-cities';
	collection = (collection) ? collection : 'cities';

	// connect to local instance
	mongoose.Promise = global.Promise;
	mongoose.connect('mongodb://127.0.0.1/' + database);
	
	// catach error
	mongoose.connection.on('error', function(){
		return console.log('failed to connect mongodb database on local machine.');
	});

	// start pushing
	mongoose.connection.on('open', function(){
		// create city schema
		var citySchema = new mongoose.Schema({
			cityId : {
				type : String,
				unique : true,
				lowercase : true,
				trim : true,
				set : function(v){
					return _.kebabCase(v);
				}
			},
			cityName : {
				type : String,
				unique : true,
				trim : true
			},
			keywords : {
				type : [String],
				default : [],
				set : function(v){
					var kebabCity =_.kebabCase(v);
					return _.split(kebabCity, '-');
				}
			},
			stateId : {
				type : String,
				lowercase : true,
				trim : true,
				set : function(v){
					return _.kebabCase(v);
				}
			},
			stateName : {
				type : String,
				trim : true
			}
		}, 
		{
			collection 	: 	collection,
			timestamps 	: 	true,
			toObject 	: 	{virtuals : true, getters:true},
			toJSON 		: 	{virtuals : true, getters:true}
		});

		// create model
		var City = mongoose.model('City', citySchema);

		// drop old collection
		// run loop on cities
		mongoose.connection.db.dropCollection(collection, function(err, result){
			// save each city in database
			async.each(exports.cities, function(city, cb){
				var cityMongoDoc = new City({
					cityId 		: 	city.city,
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
				console.log(_.get(options, 'showOutput'));
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