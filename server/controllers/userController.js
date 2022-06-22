const { decode } = require('jsonwebtoken');
const db = require('../db/models/index');
const Op = require('sequelize').Op;
const Authenticator = require('../helpers/auth');
const HelperFunctions = require('../helpers/utils');
const UserValidator = require('../validators/userValidator');
const jwt = require('jsonwebtoken');

class UserController {
  constructor() {
    this.User = db.User;
    this.auth =  new Authenticator();
    this.helpers = new HelperFunctions();
    this.userValidator = new UserValidator();
  }

  test = async (req, res) => {
    try {
        console.log(req.body);
        res.json({ status : true})
    } catch (err) {
        return res.errResponse(403, err.message);
    }
  };

  getUser = async (req, res) => {
    try {
        const id = req.params.id;
        const perm_name = 'view_user';
        let vmsg;
        const { state, msg, code, data } = await this.auth.checkPermission(req,perm_name, id);

        if (!state) return res.errResponse(code, msg);

        const user = await this.User.findByPk(id);
        user.password = undefined;
        vmsg = 'Fetched ' + user.username + ' User Record';
        this.helpers.recordActivity(vmsg, perm_name, data.user, id, false);
        return res.successResponse(200, vmsg, user );
    } catch (err) {
        return res.errResponse(403, err.message);
    }
  };

  getAllUsers = async (req, res) => {
    try {
        const { page, size } = req.query;
        const perm_name = 'view_users';
        const filter = {};
        let vmsg;
        const { state, msg, code, data } = await this.auth.checkPermission(req, perm_name,);

        if (!state) return res.errResponse(code, msg);
        
        const { limit, offset } = this.helpers.getPagination(page, size);
        if (data.user.user_id.split("-")[0] == 'UADM') {
            filter.where = { sub_unit : data.user.sub_unit };
            filter.order = [['createdAt', 'DESC']];
            filter.limit = limit;
            filter.offset = offset;
        } else {
          filter.order = [['createdAt', 'DESC']];
          filter.limit = limit;
          filter.offset = offset;
        }
        const users = await this.User.findAndCountAll(filter);

        vmsg = 'Fetched ' + users.count.toString() + ' Member Records';
        this.helpers.recordActivity(vmsg, perm_name, data.user, data.user.id, false);
        return res.successResponse(200, vmsg, this.helpers.getPagingData(users, page, limit) );
    } catch (error) {
      console.log(error);
        return res.errResponse(403, error.message);
    }
  };

  createUser = async (req, res) => {
    try {
        const perm_name = 'create_user';
        const { state, msg, code, data } = await this.auth.checkPermission(req,perm_name);

        if (!state) {
            return res.errResponse(code, msg);
        } else {
            const { vstate, vmsg, vdata } = await this.userValidator.validateUserInput(req,);

            if (vstate) {
                const body = req.body;
                console.log(vdata);
                const userData = {
                    email : body.email, fname : body.fname, lname : body.lname,
                    dob   : vdata.dob, age : vdata.age, gender : body.gender,
                    user_type : body.user_type,phone : body.phone, 
                    photo : body.photo, role_id : vdata.role_id, password : vdata.passhash,
                    is_active : body.is_active, is_verified : body.is_verified,
                    token : vdata.token, user_id : vdata.user_id, username : vdata.username
                }
                const user = await this.User.create(userData);
                this.helpers.recordActivity(vmsg, perm_name, data.user, user.id);

                return res.successResponse(201, vmsg, user);
            } else {
                return res.errResponse(404, vmsg);
            }
      }
    } catch (error) {
      console.log(error)
      return res.errResponse(403, error.message);
    }
  };

  activateUser = async (req, res) => {
    try {
        const token = req.params.token;
        const perm_name = 'activate_user';
        const { state, msg, code, data } = await this.auth.checkPermission(req, perm_name,);

        if (!state) return res.errResponse(code, msg);

        const decoded = jwt.verify(token, process.env.TOKEN_KEY);
        console.log(decoded)

        const user = await this.User.findOne({ where : { email : decoded.email }});

        if (!user) return res.errResponse(404, 'User not found');

        const userData = {
            is_active : true,
            token : '',
        }
        const vmsg = user.username + ' User Account has been Activated';
        const updatedUser = await user.update(userData);
        this.helpers.recordActivity(vmsg, perm_name, data.user, updatedUser.id);

        return res.successResponse(200, vmsg, updatedUser);
        
    } catch (err) {
      console.log(err);
      return res.errResponse(403, err.message);
    }
  };

  updateUser = async (req, res) => {
    try {
        const id = req.params.id;
        const perm_name = 'update_user';
        const { state, msg, code, data } = await this.auth.checkPermission(req, perm_name, id);

        if (!state) return res.errResponse(code, msg);

        const user = await this.User.findByPk(id);

        if (!user) return res.errResponse(404, 'User not found');

        const { vstate, vmsg, vdata } = await this.userValidator.validateUserInput(req, user);

        if (vstate) {
            const body = req.body;
            const userData = {
                email : body.email, fname : body.fname, lname : body.lname,
                dob   : vdata.dob, age : vdata.age, gender : body.gender,
                user_type : body.user_type,phone : body.phone, 
                photo : body.photo, role : vdata.role_id, password : vdata.passhash,
                is_active : body.is_active, is_verified : body.is_verified,
                token : vdata.token, user_id : vdata.user_id, username : vdata.username
            }

            const updatedUser = await user.update(userData);
            this.helpers.recordActivity(vmsg, perm_name, data.user, updatedUser.id);

            return res.successResponse(200, vmsg, updatedUser);
        } else {
            return res.errResponse(code, vmsg);
        }
    } catch (err) {
      return res.errResponse(403, err.message);
    }
  };

  deleteUser = async (req, res) => {
    try {
        const id = req.params.id;
        const perm_name = 'delete_user';
        let vmsg;
        const { state, msg, code, data } = await this.auth.checkPermission(req,perm_name, id);

        if (!state) return res.errResponse(code, msg);

        const user = await this.User.findByPk(id);

        if (!user) return res.errResponse(404, 'User not found');

        const deletedUser = await user.destroy();
        vmsg = `User '${deletedUser.username}'  deleted successfully`;
        this.helpers.recordActivity(vmsg, perm_name, data.user, id);

        return res.successResponse(200, vmsg, deletedUser);
    } catch (err) {
      return res.errResponse(403, err.message);
    }
  };
}

module.exports = UserController;
