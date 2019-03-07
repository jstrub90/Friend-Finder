var friends = require('../data/friends.js');

// setting all API routes here
module.exports = function(app) {
    // for a raw list of friends in JSON format
    app.get('/api/friends', (req, res) => {
        res.json(friends);
    });

    // for posting and checking friend match
    app.post('/api/friends', (req, res) => {
        // Here we take the result of the user's survey POST and parse it.
        var userInput = req.body,
            userName = userInput.name,
            userAnswers = userInput.scores,
            answersArr = [], // this will store all the friend's score comparison, lowest score is the match
            answersDiff = 0; // this will store the current friend's total score

            console.log(userAnswers);

        friends.forEach( (item, index) => {
            let scores = item.scores; // scores of the current potential fiend

            scores.forEach( (item, index) => {
                let questionDiff = Math.abs(parseInt(item) - parseInt(userAnswers[index])); // diff for current question
                answersDiff += questionDiff; // adding the current question's diff to the total diff
                // console.log(scoreDiff);
            });
            answersArr.push(scoreDiff);
            answersDiff = 0;
        });

        var lowScore = Math.min(...answersArr), // determine the lowest score in the array
            indexOfLowScore = answersArr.indexOf(lowScore), // determine the index of first lowest score
            match = friends[indexOfLowScore];

        // adding new person to the friends list array
        friends.push(userInput);

        // sending back the friend match
        res.json(match);
    });
};