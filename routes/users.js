var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
  console.log('Get users')
  res.render('users')
});

module.exports = router;
