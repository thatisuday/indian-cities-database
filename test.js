// load modules
const
	mongoose 				= 	require('mongoose'),
	expect 					= 	require('chai').expect,
	_ 						= 	require('lodash'),
	indianCitiesDatabase 	= 	require('./')
;


describe('Main', function(){
	before(function(done){
		indianCitiesDatabase.pushToDatabase('citydb', 'cities', done, {
			showOutput : false
		});
	});

	it('should return ' + indianCitiesDatabase.cities.length + ' entries in database', function(done){
		// Import mongoose city model
		var City = mongoose.model('City');

		City.count({}, function(err, count){
			if(err) done(err);

			expect(count).to.equal(indianCitiesDatabase.cities.length);
			done();
		});
	});
});



