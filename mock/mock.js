const data = require('./data.json')
function Mock(app) {
    app.get('/api/mock', function (req, res) {
        res.json(data);
    });
}  
module.exports = Mock;