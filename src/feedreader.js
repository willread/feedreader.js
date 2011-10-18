var sax = require("sax");

var Feed = function(){

	return {
		spec: "",
		version: 0,
		title: "",
		link: "",
		description: "",
		image: "",
		copyright: "",
		items: []
	}

}

var Item = function(){

	return {
	
		title: "",
		link: "",
		content: "",
		author: "",
		categories: [],
		pubdate: ""
	
	}

}

var feedreader = function(data, callback){

	var parser = sax.parser(false);
	var feed = new Feed();
	var tags = [];
	var error = false;
	
	var currentTag = "";
	
	parser.onerror = function(e){
		
		error = e;
	
	}
	
	parser.ontext = function(t){
	
		try{
		
			switch(tags[tags.length - 1]){
			
				case "TITLE":
					
					if(feed.spec == "RSS"){
	
						if(tags[tags.length - 2] == "CHANNEL"){
						
							feed.title += t;
						
						}
						
						if(tags[tags.length - 2] == "ITEM"){
						
							feed.items[feed.items.length - 1].title += t;
						
						}
	
					}
					
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "FEED"){
						
							feed.title += t;
						
						}
						
						if(tags[tags.length - 2] == "ENTRY"){
						
							feed.items[feed.items.length - 1].title += t;
						
						}
					
					}
				
				break;
				
				case "LINK":
				
					if(feed.spec == "RSS"){
					
						if(tags[tags.length - 2] == "CHANNEL"){
						
							feed.link += t;
						
						}
						
						if(tags[tags.length - 2] == "ITEM"){
						
							feed.items[feed.items.length - 1].link += t;
						
						}
							
					}
				
				break;
				
				case "DESCRIPTION":
				
					if(feed.spec == "RSS"){
						
						if(tags[tags.length - 2] == "CHANNEL"){
						
							feed.description += t;
						
						}
						
						if(tags[tags.length - 2] == "ITEM"){
						
							feed.items[feed.items.length - 1].content += t;
						
						}
							
					}
				
				break;
				
				case "PUBDATE":
				
					if(feed.spec == "RSS"){
						
						if(tags[tags.length - 2] == "ITEM"){
						
							feed.items[feed.items.length - 1].pubdate += t;
						
						}
							
					}
				
				break;
				
				case "PUBLISHED":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "ENTRY"){
						
							feed.items[feed.items.length - 1].pubdate += t;
						
						}
					
					}
				
				break;
				
				case "SUBTITLE":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "FEED"){
						
							feed.description += t;
						
						}
					
					}
				
				break;
				
				case "URL":
				
					if(feed.spec == "RSS"){
					
						if(tags[tags.length - 2] == "IMAGE" && tags[tags.length - 3] == "CHANNEL"){
						
							feed.image += t;
						
						}
					
					}
				
				break;
				
				case "ID":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "FEED"){
						
							feed.link += t;
						
						}
					
					}
				
				break;
				
				case "ICON":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "FEED"){
						
							feed.image += t;
						
						}
					
					}
				
				break;
				
				case "CONTENT":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "ENTRY"){
						
							feed.items[feed.items.length - 1].content += t;
						
						}
					
					}
				
				break;
				
				case "RIGHTS":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "FEED"){
						
							feed.copyright += t;
						
						}
					
					}
				
				break;
				
				case "COPYRIGHT":
				
					if(feed.spec == "RSS"){
					
						if(tags[tags.length - 2] == "CHANNEL"){
						
							feed.copyright += t;
						
						}
					
					}
				
				break;
				
				case "CATEGORY":
				
					if(feed.spec == "RSS"){
					
						if(tags[tags.length - 2] == "ITEM"){
						
							feed.items[feed.items.length - 1].categories.push(t);
						
						}
					
					}
				
				break;
				
				case "NAME":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "AUTHOR" && tags[tags.length - 3] == "ENTRY"){
						
							feed.items[feed.items.length - 1].author += t;
						
						}
					
					}
				
				break;
				
				case "AUTHOR":
				
					if(feed.spec == "RSS"){
					
						if(tags[tags.length - 2] == "ITEM"){
						
							feed.items[feed.items.length - 1].author += t;
						
						}
					
					}
				
				break;
						
			}
			
		}catch(e){
			
			error = e;
		
		}
	
	}
	parser.oncdata = parser.ontext;
	
	parser.onopentag = function(n){

		try{
	
			tags.push(n.name.toUpperCase());
			
			switch(n.name.toUpperCase()){
			
				case "RSS":
				
					feed.spec = "RSS";
					feed.version = parseFloat(n.attributes.version);					
				
				break;
				
				case "FEED":
				
					feed.spec = "ATOM"; // FIXME: Should do some more elegant detection
					feed.version = 1; // FIXME: Only one version of the spec, for now!
				
				break;
				
				case "ITEM":
				
					if(feed.spec == "RSS"){
					
						var item = new Item();
						feed.items.push(item);
						
					}
				
				break;
				
				case "ENTRY":
				
					if(feed.spec == "ATOM"){
					
						var item = new Item();
						feed.items.push(item);
						
					}
				
				break;
				
				case "LINK":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "ENTRY"){
							
							if(n.attributes.rel && n.attributes.rel.toUpperCase() == "ALTERNATE"){
	
								feed.items[feed.items.length - 1].link = n.attributes.href;
								
							}
						
						}
					
					}
				
				break;
				
				case "CATEGORY":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 2] == "ENTRY"){
						
							feed.items[feed.items.length - 1].categories.push(n.attributes.term);
						
						}
					
					}
				
				break;
			
			}
			
		}catch(e){
			
			error = e;
		
		}
	
	}
	
	parser.onclosetag = function(n){
		
		try{
		
			var tag = tags.pop();
			
			switch(tag){
			
				case "PUBDATE":
				
					if(feed.spec == "RSS"){
					
						if(tags[tags.length - 1] == "ITEM"){
					
							feed.items[feed.items.length - 1].pubdate = new Date(feed.items[feed.items.length - 1].pubdate); // Convert the string we got from the xml for a javascript date
							
						}
						
					}
				
				break;
				
				case "PUBLISHED":
				
					if(feed.spec == "ATOM"){
					
						if(tags[tags.length - 1] == "ENTRY"){
					
							feed.items[feed.items.length - 1].pubdate = new Date(feed.items[feed.items.length - 1].pubdate); // Convert the string we got from the xml for a javascript date
							
						}
					
					}
				
				break;
			
			}
			
		}catch(e){
			
			error = e;
		
		}
	
	}
	
	parser.onattribute = function(a){

	}
	
	parser.onprocessinginstruction = function(i){

	}
	
	parser.onend = function(){
		
		if(!error)
			callback(null, feed);
		else
			callback(error, null);
	
	}
	
	parser.write(data).close();
	
}

module.exports = feedreader;