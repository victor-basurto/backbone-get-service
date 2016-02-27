var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function( req, res, next ) {
	res.render('index', { title: 'Express' });
});

/* POST order page */
router.post('/', function( req, res, next ) {
	var name = req.body.services || [];

	res.render('order', { 
		title: 'Order',
		data: name 
	});
});

module.exports = router;
