// load modules
const mongoose 		= 	require('mongoose');
const _ 			= 	require('lodash');
const async 		= 	require('async');
const progressBar 	= 	require('progress');

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
		trim : true,
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
	timestamps 	: 	true,
	toObject 	: 	{virtuals : true, getters:true},
	toJSON 		: 	{virtuals : true, getters:true}
});

// export schema
module.exports = exports = citySchema;