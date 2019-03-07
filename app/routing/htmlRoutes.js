var path = require('path');

// setting all html page routes here
module.exports = function(app) {
    // for home page home.html
    app.get('/', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/home.html'));
    });

    // for survey page survey.html
    app.get('/survey', (req, res) => {
        res.sendFile(path.join(__dirname, '../public/survey.html'));
    });

    // 404 page...
    app.use( (req, res) => {
        res.status(404).send("<h1 class='text-center'>The page you are looking for does not exits...</h1>").end();
    });
};