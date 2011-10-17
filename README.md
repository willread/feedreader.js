Installation
------------

```
npm install feedreader
```

Usage
-----

```javascript
var feedreader = require("feedreader");
var request = require("request");

request("http://www.engadget.com/rss.xml", function (err, response, xml) {
				
	if (!err && response.statusCode == 200) {

		feedreader(xml, function(err, feed){
		
			// Should output something like: "RSS 2.0 feed has 40 items"
			console.log(feed.spec + " " + feed.version + " feed has " + feed.items.length + " items");
		
		});
	
	}
	
});
```

Feed Object
-----------

feedreader returns a normalized javascript object in the following format, regardless of whether the source XML was RSS or ATOM.

```javascript
{
	spec: 			String		// RSS or ATOM
	version:		Number		// Detected version (ie: 2.0) if RSS, ATOM is always 1.0
	title:			String		// Title of the feed
	link:			URL			// Link back to homepage of feed
	description:	String		// Short description of feed
	image:			URL			// URL of an image used to represent the feed
	copyright:		String		// Copyright text for feed
	items:			Array		// Array of items in the feed
}
```

Individual feed items ```feed.items[x]``` are in the following format:

```javascript
{
	title:			String		// Item title
	link:			URL			// Link associated with item
	content:		String		// Main item content
	author:			String		// Author name, email, etc..
	categories:		Array		// Array of string containing categories for this item
	pubdate:		Date		// Javascript date object representing when item was posted
}
```

Running Tests
-------------

feedreader includes a couple of unit tests which should be helpful if you're planning to make your own additions. Run them like so:

```
npm test feedreader
```

Tests are included in the ```/test``` directory.