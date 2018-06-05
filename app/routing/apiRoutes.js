//required dependencies
var path = require('path');

//import friends data
var friends = require('../data/friends.js');

//API routes
module.exports = function(app) {

    //get route that display JSON of all friends 
    app.get('/api/friends', function(req, res) {
        res.json(friends);
    });
    //add new friend info
    app.post('/api/friends', function(req, res){
        //var the user input object
        var userInput = req.body;
        console.log('userInput = ' + JSON.stringify(userInput));
        var newFriendScores = req.body.scores;
        var userScores = []
        //set match data
        var firendsCount = 0;
        var match = 0;

        for(var i = 0; i < friends.length; i++){
            var scoresDiff = 0
            //run friends in list
            for(var j = 0; j < newFriendScores; j++){
                scoresDiff += Math.abs(parseInt(friends[i].scores[j]) - parseInt(newFriendScores[j]));
            }
            //push results into userScores
            userScores.push(scoresDiff);
        }

        var minVal = Math.min.apply(null, userScores);
        var indexMin = userScores.indexOf(minVal);

        var MatchingFriend = friends[indexMin];
        // //find best match
        // for(var i = 0; i < userScores; i++){
        //     if(userScores[i] <= userScores[match]){
        //         match = i
        //     }
        // }

        // //get bestMatch data
        // var bestFriend = friends[match];
        // res.json(bestFriend);

        //push new data into friends array
        // friends.push(res.body);
        res.json(MatchingFriend);
    });

}