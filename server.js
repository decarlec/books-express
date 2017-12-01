// server.js

// BASE SETUP
// =============================================================================

// call the packages we need
var express = require('express'); // call express
var app = express(); // define our app using express
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var bookModel = require('./app/models/book.js');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// create database connection
mongoose.connect('mongodb://user:password@ds235785.mlab.com:35785/books'); // connect to our database

var port = process.env.PORT || 8080; // set our port

// ROUTES FOR OUR API
// =============================================================================
var router = express.Router(); // get an instance of the express Router

//middleware used for all requests
router.use(function(req, res, next) {
    // do logging
    console.log('Something is happening.');
    next();
});

// test route to make sure everything is working (accessed at GET http://localhost:8080/api)
router.get('/', function(req, res) {
    res.json({ message: 'hooray! welcome to our api!' });
});

// more routes for our API will happen here

// on routes that end in /books
//----------------------------------------------------
router.route('/books')

    .post(function(req, res) {

        var book = new bookModel(); // create a new instance of the book model
        book.title = req.body.title; // set the books title (comes from the request)
        book.genre = req.body.genre;
        book.author = req.body.author;
        book.read = req.body.read;
        
        //save the book and check for errors
        book.save(function(err) {
            if (err) res.send(err);

            res.json({ message: 'book created!' });
        });
    })
    
    .get(function(req, res){
        book.find(function(err, books){
            if(err) res.send(err);
            
            res.json(books);
        });
    });
    
// on routes that end in /books/:book_id
// ---------------------------------------------------
router.route('/books/:book_id')

    
    //get the book with that id (accessed at GET http://localhost:8080/api/books/:book_id)
    .get(function(req, res){
        book.findById(req.params.book_id, function(err, book) {
            if(err) res.send(err);
            
            res.json(book);
        });
    })
    
    //update the book with that id (accessed at PUT http://localhost:8080/api/books/:book_id)
    .put(function(req, res){
        
        //use our book model to find the book we want
        book.findById(req.params.book_id, function(err, book){
            if (err) res.send(err);
            
            book.name = req.body.name;
            
            //save the book
            book.save(function(err){
                if(err) res.send(err);
                
                res.json({ message: 'book updated!'});
            });
            
        });
    })
    
    .delete(function(req, res) {
        book.remove({
            _id: req.params.book_id
        }, 
        
        function(err, book){
            if(err) res.send(err);
            
            res.json({ message: 'Successfully deleted'});    
            
        });
    });
    
// REGISTER OUR ROUTES -------------------------------
// all of our routes will be prefixed with /api
app.use('/api', router);

// START THE SERVER
// =============================================================================
app.listen(port);
console.log('Magic happens on port ' + port);
