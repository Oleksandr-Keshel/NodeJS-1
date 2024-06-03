const express = require('express');
const router = express.Router();
const userController = require('../controllers/users.controller');
const userMiddleware = require('../middlewares/users.middleware');
const { authenticationCheck } = require('../middlewares/auth.middleware');


router.post("/",userMiddleware.userCreationDataValidation, userController.createUser);

router.use(authenticationCheck);

router.get("/", userController.getUsers);

router.get("/:userId",userMiddleware.userByIdValidation, userController.getUser);
router.patch("/:userId",userMiddleware.userByIdValidation, userMiddleware.userUpdateDataValidation, userController.updateUser);
router.delete("/:userId",userMiddleware.userByIdValidation, userController.deleteUser);


module.exports = router;