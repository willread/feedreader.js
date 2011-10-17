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
		
			console.log(feed);
		
		});
	
	}
	
});

```

Feed Object
-----------

feedreader returns a normalized javascript object in the following format, regardless of whether the source XML was RSS or ATOM.

```

```

Running Tests
-------------

feedreader includes a couple of unit tests which should be helpful if you're planning to make your own additions. Run them like so:

```
npm test feedreader
```

Tests are included in the ```/test``` directory.