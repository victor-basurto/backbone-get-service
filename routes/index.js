var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index', { title: 'Express' });
});
/* GET order page. */
// router.get('/order', function( req, res, next ) {
//     res.render('order', { title: 'Order' });
// });

/* POST order page */
router.post('/', function(req, res, next) {
	
	var name = req.body.service || false;
	var price = req.body.price || false;
	console.log(name);


});

module.exports = router;
