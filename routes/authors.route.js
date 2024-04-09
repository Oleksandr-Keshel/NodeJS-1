const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authors.controller');


router.get("/", authorController.getAuthors);
router.get("/:authorId", authorController.getAuthor);
router.post("/", authorController.createAuthor);
router.patch("/:authorId", authorController.updateAuthor);
router.delete("/:authorId", authorController.deleteAuthor);

module.exports = router;