//Dependencies
var router = require('express').Router();

//Data
var users = require('../databases/users.js');

//routes
router.get('/', function(req, res){
  res.json({
    users : users
  });
});

//Module export
module.exports = router;
