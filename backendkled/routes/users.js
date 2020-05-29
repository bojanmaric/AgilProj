var express = require('express');
var router = express.Router();

const AuthController =require('../controllers/AuthController');

const authenticate =require('../config/authenticate');   
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/register', AuthController.register);

router.post('/login',AuthController.login);

module.exports = router;
