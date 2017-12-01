var express = require('express');
var bookRouter = express.Router();
var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var router = function(nav){
    var bookService = 
        require('../services/goodreadsService')();
    console.log(bookService);
    
    var bookController =
        require('../controllers/bookController.js')(bookService, nav);
    
    bookRouter.use(bookController.middleware);
    
    bookRouter.route('/:id')
        .get(bookController.getById);
    
    bookRouter.route('/')
        .get(bookController.getIndex);
    
    return bookRouter;
};

module.exports = router;