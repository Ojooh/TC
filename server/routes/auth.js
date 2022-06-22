const express = require('express');

const AuthController = require('../controllers/authController.js');
const verifyUserSession = require('../middleware/authenticate.js').verifyUserSession;

const controller = new AuthController();
const authRouter = express.Router();

authRouter.post('/login', controller.logInUser);
authRouter.use(verifyUserSession);

authRouter.get('/logout', controller.logOutUser);
authRouter.get('/role/all', controller.getAllRoles);
authRouter.post('/role/create', controller.createRole);
authRouter.patch('/role/update/:id', controller.updateRole);
authRouter.delete('/role/delete/:id', controller.deleteRole);
authRouter.post('/role/give_permission', controller.givePermission);
authRouter.get('/perm/all', controller.getAllPerms);
authRouter.post('/perm/create', controller.createPerm);
authRouter.patch('/perm/update/:id', controller.updatePerm);
authRouter.delete('/perm/delete/:id', controller.deletePerm);

module.exports = authRouter;