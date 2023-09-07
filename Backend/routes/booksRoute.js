import express from 'express'
import { Books } from '../models/bookModels.js';


const router = express.Router()




//route for save a new book

router.post("/", async (req, res) => {
  try {
    if (!req.body.title || !req.body.title || !req.body.title) {
      return res.status(400).send({
        message: "send all requires fields : title , author , publishYear",
      });
    }
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      publishYear: req.body.publishYear,
    };
    console.log(newBook);
    const books = await Books.create(newBook);
    return res.status(201).send(books);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route for get all books from dataBase
router.get("/", async (req, res) => {
  try {
    const books = await Books.find({});
    return res.status(200).json({
      count: books.length,
      data: books,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route for get one books from dataBase
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const book = await Books.findById(id);
    console.log(book);
    return res.status(200).json(book);
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route for update a book from dataBase

router.put("/:id", async (req, res) => {
  try {
    if (!req.body.title || !req.body.title || !req.body.title) {
      return res.status(400).send({
        message: "send all requires fields : title , author , publishYear",
      });
    }

    const { id } = req.params;
    const result = await Books.findByIdAndUpdate(id, req.body);
    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).send({ message: "book updated succecfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

// route for update a book from dataBase
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const result = await Books.findByIdAndDelete(id);
    if (!result) {
      return res.status(404).json({ message: "book not found" });
    }
    return res.status(200).send({ message: "book deleted succecfully" });
  } catch (error) {
    console.log(error.message);
    res.status(500).send({ message: error.message });
  }
});

export default router