const db = require('../db/models/index');
const bcrypt = require('bcrypt');
const moment = require('moment');
const Op = require('sequelize').Op;

class Authenticator {
  constructor() {
    this.config = process.env;
    this.User = db.User;
    this.Permission = db.Permission;
    this.Role = db.Role;
    this.Access = db.RolePerm;
  }

  authenticateUser = async (email, password, done) => {
    let user, response;
  

    if (!(email && password)) {
      response =  {
        state : false,
        msg : 'Invalid Input for Emaily and password',
        code: 404,
        data : user,
      }
      return done(response);
    }

    await this.User.findOne({ where: { [Op.or]: [ { email : email}, {username : email }], is_active: true } })
      .then(async data => {
        user = data;
       

        if (user && (await bcrypt.compare(password, user.password))) {
            let datetime = moment().format('YYYY-MM-DD  HH:mm:ss.000');
            await user.update({ last_login: datetime });
            user.password = undefined;
    
          response = {
            state: true,
            msg: user.username + ' User logged In',
            code: 200,
            data: { user: user},
          };
          return done(response);
        } else {
          response = {
            state: false,
            msg: 'Invalid Input for Email and password',
            code: 404,
            data: [],
          };
          return done(response);
        }
      })
      .catch(err => {
        console.log(err)
        response = {
            state: false,
            msg: 'Something Went Wrong ' + `${err.message}`,
            code: 404,
            data: [],
        };
        // console.log(response)
        return done(response);
      });

    // return response;
  };

  getUser = async (id, done) => {
    console.log(id);
    let response = {};
    let user;
    await this.User.findOne({ where: { email : id, is_active: true } })
    .then(async data => {
      user = data;
      done(null, user);
    })
    .catch(err => {
      console.log(err)
      response = {
          state: false,
          msg: 'Something Went Wrong ' + `${err.message}`,
          code: 404,
          data: [],
      };
      done(response);
    });

  }

  checkPermission = async (req, perm_name, param_id=0) => {
    const authUser = req.user;
    if (!authUser)
      return {
        state: false,
        msg: 'User not logged In to access ' + perm_name,
        code: 404,
        data: [],
      };

    if (authUser.is_active == '0')
      return {
        state: false,
        msg: 'Inactive User cannot access ' + perm_name,
        code: 404,
        data: [],
      };


    const role = await this.Role.findOne({ where: { id: authUser.role_id } });
    const roleId = role && role.id ? role.id : '';
    const perm = await this.Permission.findOne({ where: { name: perm_name } });
    const permId = perm && perm.id ? perm.id : '';

    const hasAccess = await this.Access.findOne({
      where: { role_id: roleId, permission_id: permId },
    });

    if (!hasAccess)
      return {
        state: false,
        msg: 'Unauthorized access to ' + perm_name,
        data: [],
        code: 405,
      };

    if (param_id !== 0 && role.name !== "Member" && authUser.id !== param_id)
      return {
        state: false,
        msg: 'Unauthorized access to ' + perm_name,
        data: [],
        code: 405,
      };

    return {
      state: true,
      msg: 'Access allowed to ' + perm_name,
      code: 200,
      data: { user: authUser },
    };
  };

}

module.exports = Authenticator;
