# Indian Cities Database [![Build Status](https://travis-ci.org/thatisuday/indian-cities-database.svg?branch=master)](https://travis-ci.org/thatisuday/indian-cities-database) ![dependencies](https://david-dm.org/thatisuday/indian-cities-database.svg) [![npm version](https://badge.fury.io/js/indian-cities-database.svg)](https://badge.fury.io/js/indian-cities-database)
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

Data fetched from [gist](https://gist.github.com/ankitnetwork18/4509792) by [ankitnetwork18](https://github.com/ankitnetwork18) and other websites

***

To add more cities, create an issue and paste cities in following array format
```
[
	{city:'Kolhapur', state:'Maharashtra'},
	{city:'Port Blair', state:'Andaman & Nicobar Islands'},
	{city:'Adilabad', state:'Andhra Pradesh'},
]
````
