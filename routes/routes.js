const express = require("express");
const router = express.Router();
const Book = require('../models/book');
const multer = require ('multer');


router.post("/add", (req, res) => {
    const book = new Book({
        bookName: req.body.bookName,
        publisherName: req.body.publisherName,
        publisherAge: req.body.publisherAge,
        pageNo: req.body.pageNo,
        publisherDate: req.body.publisherDate,
        bookType: req.body.bookType ? req.body.bookType : []
    });
    book.save((err) => {
        if (err) {
            res.json({ message: err.message, type: 'danger' });
        } else {
            req.session.message = {
                type: 'success',
                message: 'Book added successfully'
            };
            res.redirect("/add");
        }
    });
});


router.get("/search",(req,res)=>{
    res.render("search_book",{title: "Search Book"});
})

router.post('/api/books', async (req, res) => {
    try {
      const { keyword, publisherAge, bookType } = req.body;
  
      // Construct your Mongoose query based on the search parameters
      const filters = {};
  
      if (keyword) {
        filters.bookName = { $regex: keyword, $options: 'i' };
      }
  
      if (publisherAge) {
        filters.publisherAge = publisherAge;
      }
  
      if (bookType && Array.isArray(bookType)) {
        filters.bookType = { $in: bookType };
      }
  
      // Retrieve data from MongoDB
      const books = await Book.find(filters)
  
      res.json(books);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  });

router.get("/",(req,res)=>{
    
            res.redirect('/add')
});

router.get("/add",(req,res)=>{
    res.render('add_book',{title: "Add Book"});
});

module.exports=router;