# Indian Cities Database
Database of Indian cities and their states for node applications.

***

### Get list

```
const indianCitiesDatabase = require('indian-cities-database');
var cities = indianCitiesDatabase.cities;

/*
	// cities array

	[
		{city:'Kolhapur', 	state:'Maharashtra'},
		{city:'Port Blair', state:'Andaman & Nicobar Islands'},
		{city:'Adilabad', 	state:'Andhra Pradesh'},
		{city:'Adoni', 		state:'Andhra Pradesh'},
		...
	]
*/
```

## Push to mongodb

You can push all cities to mongodb database running on local instance

```
const indianCitiesDatabase = require('indian-cities-database');
indianCitiesDatabase.pushToDatabase(databaseName, collectionName);
```

> Make sure you drop the collection (if you already have one) before populating it.

Data model will look like below

```
{
	"_id"       : ObjectId("57cd97d226c3a143f02cfaab"),
	"updatedAt" : ISODate("2016-09-05T16:05:38.905Z"),
	"createdAt" : ISODate("2016-09-05T16:05:38.905Z"),
	"cityId"    : "bodhan",
	"cityName"  : "Bodhan",
	"stateId"   : "andhra-pradesh",
	"stateName" : "Andhra Pradesh",
	"keywords"  : [
		"bodhan"
	],
	"__v"       : 0
}

```
***

Data fetched from [gist](https://gist.github.com/ankitnetwork18/4509792) by [ankitnetwork18](https://github.com/ankitnetwork18) and other websites