var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.render('users', { 
    title: 'Users', 
    userName: 'Daniel Ayoub'
   });
});

module.exports = router;
