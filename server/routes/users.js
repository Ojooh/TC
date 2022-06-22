const express = require('express');

const UserController = require('../controllers/userController');
const verifyUserSession = require('../middleware/authenticate').verifyUserSession;

const controller = new UserController();
const userRouter = express.Router();
userRouter.post('/test', controller.test);
// userRouter.use(verifyUserSession);

userRouter.get('/:id', controller.getUser);
userRouter.get('/users/all', controller.getAllUsers);
// userRouter.get(':sub_unit/all', controller.getAllSubUsers);
userRouter.post('/create', controller.createUser);
userRouter.patch('/update/:id', controller.updateUser);
userRouter.delete('/delete/:id', controller.deleteUser);



module.exports = userRouter;