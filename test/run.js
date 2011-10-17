var assert = require("assert");
var fs = require("fs");
var feedreader = require("feedreader");

// Utility function for recursively comparing two objects and failing the test if they don't match exactly

var recursiveCompare = function(data, expected){

	for(ii in expected){
	
		if(typeof expected[ii] == "object"){ // Iterate over objects
		
			if(expected[ii].getTime){ // Special case for comparing dates
			
				assert.ok(data[ii].toString() === expected[ii].toString(), ii + " has an unexpected value (" + data[ii].toString() + ") expected (" + expected[ii].toString() + ")");
			
			}else{
			
				recursiveCompare(data[ii], expected[ii])
			
			}
		
		}else{
		
			assert.ok(data[ii] === expected[ii], ii + " has an unexpected value (" + data[ii] + ") expected (" + expected[ii] + ")");
		
		}
	
	}

}

// Test that feedreeder has loaded properly

assert.ok(typeof feedreader == "function", "feedreader failed to load");

// Test RSS 2.0 parsing

fs.readFile(__dirname + "/rss2.0.xml", "UTF8", function (err, data) {

	console.log("Testing RSS 2.0..");
	
	feedreader(data, function(err, feed){

		var expected = {
		
			spec: "RSS",
			version: 2,
			title: "Feed Reader",
			link: "http://feed.reader",
			description: "Feed Reader RSS Feed",
			image: "http://feed.reader/feed.gif",
			copyright: "Copyright &copy; 2011 Feed Reader",
			items: 
			[
				{
					title: "Item 1 Title",
					link: "http://feed.reader/item/1",
					content: "Feed reader item #1 content.",
					author: "",
					categories: [
						"Item",
						"Number One"
					],
					pubdate: new Date("Fri, 14 Oct 2011 22:58:00 GMT"),
					author: "FeedReader"
				},
				{
					title: "Item 2 Title",
					link: "http://feed.reader/item/2",
					content: "Feed reader item #2 content.",
					author: "",
					categories: [
						"Item",
						"Number Two"
					],
					pubdate: new Date("Mon, 17 Oct 2011 01:32:00 GMT"),
					author: "FeedReader"
				} 
			]
			
		};
		
		recursiveCompare(feed, expected);
		
		console.log("Passed!");
			
	});
	
});

// Test ATOM parsing

fs.readFile(__dirname + "/atom.xml", "UTF8", function (err, data) {

	console.log("Testing ATOM..");

	feedreader(data, function(err, feed){

		var expected = {
		
			spec: 'ATOM',
			version: 1,
			title: 'Feed Reader',
			link: 'http://feed.reader',
			description: 'Feed Reader ATOM Feed',
			image: 'http://feed.reader/feed.gif',
			copyright: "Copyright &copy; 2011 Feed Reader",
			items: [
				{
					title: 'Item 1 Title',
					link: 'http://feed.reader/item/1',
					content: 'Feed reader item #1 content.',
					author: '',
					categories: [
						"Item",
						"Number One"
					],
					author: "FeedReader",
					pubdate: new Date("Tue, 13 Dec 2011 23:30:02 GMT")
				},
				{
					title: 'Item 2 Title',
					link: 'http://feed.reader/item/2',
					content: 'Feed reader item #2 content.',
					author: '',
					categories: [
						"Item",
						"Number Two"
					],
					author: "FeedReader",
					pubdate: new Date("Wed, 14 Dec 2011 23:30:02 GMT")
				}
			]
			
		};

		recursiveCompare(feed, expected);
		
		console.log("Passed!");
			
	});
	
});

// Test error handling

fs.readFile(__dirname + "/error.xml", "UTF8", function (err, data) {

	console.log("Testing error handling..");

	feedreader(data, function(err, feed){
		
		assert.ok(err.message == "Unexpected end\nLine: 2\nColumn: 7\nChar: ", "Errors are not being handled correctly.");
		console.log("Passed!");
			
	});
	
});