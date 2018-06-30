var jquery = require('jquery')
var Nightmare = require("nightmare"),
nightmare = Nightmare({show:true})

var targetItem = {
    name: "World Famous",
    color: "Red",
    size: "medium",
    type: "jackets",
}

var url
var links="";
//var itemType = process.argv[2]
//uses furst arguement passed to determine ITEM TYPE

nightmare.goto('http://www.supremenewyork.com/shop/all/' + targetItem.type)
//visits desired page for item type
.wait(1000)
//waits 1 second for page to load
.evaluate(function() { 
    
    var searchMatches = [];
    //create array to hold possible item matches
     

    $(".inner-article").each(function(){

       

        item = {};
        item["title"] = $(this).find('.name-link').text();
        item["link"] ='http://www.supremenewyork.com' + $(this).find('a').attr('href');
        
        
        searchMatches.push(item)
    })
    // create a searchMatches ojbect with title and link, then adds to the 'searchMatches' array
    return searchMatches
    //pass the searchMatches array forward so it can be looped through later on
})

.end()
.then(function(result){
    for(match in result) {
       if (result[match].title.includes(targetItem.color)) {
        console.log(result[match].title)
        console.log(result[match].link)
        console.log("\n")
       }
       //if statement to check if item.title matches targetItem
        
    };

})