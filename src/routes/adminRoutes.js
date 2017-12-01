var express = require('express');
var adminRouter = express.Router();
var mongodb = require('mongodb').MongoClient;

var books = [
    {
        title: 'War and Peace',
        genre: 'Historical Fiction',
        author: 'Lev Nikolayevich Tolstoy',
        bookId: 656,
        read: false
    },
    {
        title: 'Les Miserables',
        genre: 'Historical Fiction',
        author: 'Victor Hugo',
        bookId: 24280,
        read: false
    },
    {
        title: 'To Kill a Mockingbird',
        genre: 'Historical Fiction',
        author: 'Harper Lee',
        read: true
    }
];

var router = function (nav) {
    
    adminRouter.route('/addBooks')
        .get(function(req, res) {
            var url = 
                'mongodb://user:password@ds235785.mlab.com:35785/books';
            
            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.insertMany(books,
                    function(err, results){
                       res.send(results);
                       db.close();
                    });
            });
        });
    
    return adminRouter;
}

module.exports = router;