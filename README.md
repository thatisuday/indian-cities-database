# Indian Cities Database [![Build Status](https://img.shields.io/travis/thatisuday/indian-cities-database.svg?style=flat-square)](https://travis-ci.org/thatisuday/indian-cities-database) [![npm downloads](https://img.shields.io/npm/dt/indian-cities-database.svg?style=flat-square)](https://www.npmjs.com/package/indian-cities-database) [![npm version](https://img.shields.io/npm/v/indian-cities-database.svg?style=flat-square)](https://www.npmjs.com/package/indian-cities-database) [![npm dependencies](https://img.shields.io/david/thatisuday/indian-cities-database.svg?style=flat-square)](https://www.npmjs.com/package/indian-cities-database)

Database of Indian cities and their states for node applications.

***

## Get list

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

***

## Automatically populate local mongodb

You can push all cities to mongodb database running on local instance

```
const indianCitiesDatabase = require('indian-cities-database');
indianCitiesDatabase.pushToDatabase(databaseName, collectionName, callback); // all args are optional
```

> **WARNING** : pushToDatabase first removes the collection (if exists) before populating the database.

Data model will look like below

```
{
	"_id"       : ObjectId("57cd99926c8f48577ce399cc"),
    "updatedAt" : ISODate("2016-09-05T16:13:06.722Z"),
    "createdAt" : ISODate("2016-09-05T16:13:06.722Z"),
    "cityId"    : "port-blair",
    "cityName"  : "Port Blair",
    "stateId"   : "andaman-nicobar-islands",
    "stateName" : "Andaman & Nicobar Islands",
    "keywords"  : [
        "port",
        "blair"
    ],
    "__v"       : 0
}
```

> Keywords are array elements of `cityId` field split by `-` character. This will help you in keyword based city search.

***

## Querying

Once you have the database, you can perform search the way you want using mongodb native module or mongojs. But if you wish to use mongoose, then you must need a `schema` which you can import like

```
const indianCitiesDatabase = require('indian-cities-database');
var citySchema = indianCitiesDatabase.citySchema;
citySchema.set('collection', 'my_cities_collection');

// create model to query
var myCity = mongoose.model('myCity', citySchema);
myCity.find({}, callback);
```

> Do not populate cities database (using `pushToDatabase` method) in your api code unless needed. While population, this module creates new db connection using mongoose. This may lead to db connection collision. Better, you first populate the db by simple execution `node populate.js` and then create custom model as above.

***

## Contribute

To add more cities, create an issue and paste cities in following array format.
```
[
	{city:'Kolhapur', state:'Maharashtra'},
	{city:'Port Blair', state:'Andaman & Nicobar Islands'},
	{city:'Adilabad', state:'Andhra Pradesh'},
]
```

***

## Data source

Data fetched from [gist](https://gist.github.com/ankitnetwork18/4509792) by [ankitnetwork18](https://github.com/ankitnetwork18) and other websites.
