var friends = require("../data/friends");

module.exports = function(app) {
  app.get("/api/friends", function(req, res) {
    res.json(friends);
  });

  app.post("/api/friends", function(req, res) {
    console.log(req.body.scores);

    var user = req.body;

    //parse user scores
    for(var i = 0; i < user.scores.length; i++) {
      user.scores[i] = parseInt(user.scores[i]);
    }

    //we'll compare the results to the difference in scores. Minimum is 40 and the default is the first object in the friends array
    var bestFriendIndex = 0;
    var minimumDifference = 40;

    //take the difference in each answer and total the differences
    for(var i = 0; i < friends.length; i++) {
      var totalDifference = 0;
      for(var j = 0; j < friends[i].scores.length; j++) {
        var difference = Math.abs(user.scores[j] - friends[i].scores[j]);
        totalDifference += difference;
      }

      if(totalDifference < minimumDifference) {
        bestFriendIndex = i;
        minimumDifference = totalDifference;
      }
    }

    //push user to friend array
    friends.push(user);

    //return friend index
    res.json(friends[bestFriendIndex]);
  });
};