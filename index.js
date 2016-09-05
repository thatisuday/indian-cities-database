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
exports.pushToDatabase = function(database, collection){
	
	// default storage
	database = (database) 	? database : 'indian-cities';
	collection = (collection) ? collection : 'cities';

	// connect to local instance
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

		// run loop on cities
		// save each city in database
		async.each(exports.cities, function(city, callback){
			var cityMongoDoc = new City({
				cityId 		: 	city.city,
				cityName 	: 	city.city,
				keywords 	: 	city.city,
				stateId 	: 	city.state,
				stateName 	: 	city.state
			});

			cityMongoDoc.save(function(err){
				if(err){
					callback(new Error());
				}
				else{
					bar.tick();
					callback(null);
				}
			});
		}, function(err){
			if(err){
				console.log('Some error occured while saving the document');
			}
			else{
				console.log('Done! Populated in : ' + database + ' -> ' + collection)
			}

			// exit node process
			process.exit(0);
		});
	});
}