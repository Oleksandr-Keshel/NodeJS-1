const express = require('express');
const router = express.Router();
const authorController = require('../controllers/authors.controller');
const authorMiddleware = require('../middlewares/authors.middleware');


router.get("/", authorController.getAuthors);
router.get("/:authorId",authorMiddleware.authorByIdValidation, authorController.getAuthor);
router.post("/", authorMiddleware.authorCreationDataValidation, authorController.createAuthor);
router.patch("/:authorId",authorMiddleware.authorByIdValidation, authorMiddleware.authorUpdateDataValidation, authorController.updateAuthor);
router.delete("/:authorId",authorMiddleware.authorByIdValidation, authorController.deleteAuthor);


router.put("/:authorId/profilePicture", authorMiddleware.authorByIdValidation, authorMiddleware.authorUploadProfilePicture, authorController.updateAuthorProfilePicture);

router.post("/upload", authorMiddleware.authorsUpload, authorController.uploadAuthors);

module.exports = router;