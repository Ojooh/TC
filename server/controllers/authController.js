const db = require('../db/models/index');
const Op = require('sequelize').Op;
const passport = require('passport');
const Authenticator = require('../helpers/auth');
const HelperFunctions = require('../helpers/utils');
const RoleValidator = require('../validators/roleValidator');
const PermValidator = require('../validators/permValidator');
const RolePermValidator = require('../validators/rolePermValidator');

class AuthController {
  constructor() {
    this.User = db.User;
    this.Role = db.Role;
    this.Perm = db.Permission;
    this.Access = db.RolePerm;
    this.auth =  new Authenticator();
    this.helpers = new HelperFunctions();
    this.roleValidator = new RoleValidator();
    this.permValidator = new PermValidator();
    this.rolePermValidator = new RolePermValidator();

  }

  logInUser = async (req, res) => {
    const perm_name = 'user_login';
    // const { username, password } = req.body;

    await passport.authenticate('local', (resp) => {
      // console.log(resp);
        if(resp == null) {
          return res.errResponse(500, "Bad Request sent");
        }
        if (resp && !resp.state) {
            return res.errResponse(resp.code, resp.msg, resp.data);
        }
        
      
        req.login(resp.data.user, (err) => {
            this.helpers.recordActivity(resp.msg, perm_name, resp.data.user, resp.data.user.id);
            res.successResponse(resp.code, resp.msg, resp.data);
        })
    })(req, res,)
  };

  logOutUser = async (req, res) => {
      const perm_name = 'user_logout';
      const data = req.user;
      req.logout();
      const msg = " User logged out successfully";
      this.helpers.recordActivity(msg, perm_name, data, data.id);
      return res.successResponse(200, msg, data);
  };

  createRole = async (req, res) => {
    try {
        const perm_name = 'create_role';
        const { state, msg, code, data } = await this.auth.checkPermission(
            req,
            perm_name,
        );

        if (!state) {
            return res.errResponse(code, msg);
        } else {
            const { vstate, vmsg, vdata } = await this.roleValidator.validateRoleInput(req,);

            if (vstate) {
                const roledata = vdata;
                const role = await this.Role.create(roledata);
                this.helpers.recordActivity(vmsg, perm_name, data.user, data.user.id);

                return res.successResponse(201, vmsg, role);
            } else {
                return res.errResponse(404, vmsg);
            }
      }
    } catch (error) {
      return res.errResponse(403, error.message);
    }
  };

  getAllRoles = async (req, res) => {
    try {
        const { page, size } = req.query;
        const perm_name = 'view_roles';
        let vmsg;
        const { state, msg, code, data } = await this.auth.checkPermission(
        req,
        perm_name,
        );


        if (!state) return res.errResponse(code, msg);

        const { limit, offset } = this.helpers.getPagination(page, size);
        const roles = await this.Role.findAndCountAll({
        order: [['createdAt', 'DESC']],limit,offset,
        });

        vmsg = 'Fetched ' + roles.count.toString() + ' Role Records';
        this.helpers.recordActivity(vmsg, perm_name, data.user, data.user.id, false);
        return res.successResponse(200, vmsg, this.helpers.getPagingData(roles, page, limit) );
    } catch (error) {
        console.log(error);
        return res.errResponse(403, error.message);
      }
  };

  updateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const perm_name = 'update_role';
        const { state, msg, code, data } = await this.auth.checkPermission(
        req, perm_name, 
        );

        if (!state) return res.errResponse(code, msg);

        const role = await this.Role.findByPk(id);

        if (!role) return res.errResponse(404, 'Role not found');

        const { vstate, vmsg, vdata } = await this.roleValidator.validateRoleInput(req,role);

        if (vstate) {
            const roleData = vdata;
            const updatedRole = await role.update(roleData);
            this.helpers.recordActivity(vmsg, perm_name, data.user, data.user.id);

            return res.successResponse(200, vmsg, updatedRole);
        } else {
            return res.errResponse(code, vmsg);
        }
    } catch (err) {
      return res.errResponse(403, err.message);
    }
  };

  deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const perm_name = 'delete_role';
        let vmsg;
        const { state, msg, code, data } = await this.auth.checkPermission(req,'delete_role',);

        if (!state) return res.errResponse(code, msg);

    
        const role = await this.Role.findByPk(id);

        if (!role) return res.errResponse(404, 'Role not found');

        const deletedRole = await role.destroy();
        vmsg = `Role '${deletedRole.name}'  deleted successfully`;
        this.helpers.recordActivity(vmsg, 'delete_role', data.user, data.user.id);

        return res.successResponse(200, vmsg, deletedRole);
    } catch (err) {
      return res.errResponse(403, err.message);
    }
  };

  createPerm = async (req, res) => {
    try {
        const perm_name = 'create_perm';
        const { state, msg, code, data } = await this.auth.checkPermission(req,perm_name,);

        if (!state) {
            return res.errResponse(code, msg);
        } else {
            const { vstate, vmsg } = await this.permValidator.validatePermissionInput(req);

            if (vstate) {
                const { name, description } = req.body;
                let permdata = { name, description };
                let perm = await this.Perm.create(permdata);
                this.helpers.recordActivity(vmsg, perm_name, data.user, data.user.id);

                return res.successResponse(201, vmsg, perm);
            } else {
                return res.errResponse(404, vmsg);
            }
      }
    } catch (error) {
      return res.errResponse(403, error.message);
    }
  };

  getAllPerms = async (req, res) => {
    try {
        const perm_name = 'view_perms'
        const { page, size } = req.query;
        let vmsg;
        const { state, msg, code, data } = await this.auth.checkPermission(req, perm_name);

        if (!state) return res.errResponse(code, msg);

        const { limit, offset } = this.helpers.getPagination(page, size);
        const perms = await this.Perm.findAndCountAll({order: [['createdAt', 'DESC']],limit,offset,});

        vmsg = 'Fetched ' + perms.count.toString() + ' Permissions Records';
        this.helpers.recordActivity(vmsg, perm_name, data.user, data.user.id, false);
        return res.successResponse(200, vmsg, this.helpers.getPagingData(perms, page, limit) );
    } catch (error) {
        return res.errResponse(403, error.message);
    }
  };

  updatePerm = async (req, res) => {
    try {
        const id = req.params.id;
        const perm_name = 'update_perm';
        const { state, msg, code, data } = await this.auth.checkPermission(req, perm_name);

        if (!state) return res.errResponse(code, msg);

    
        const perm = await this.Perm.findByPk(id);

        if (!perm) return res.errResponse(404, 'Permission not found');

        const { vstate, vmsg } = await this.permValidator.validatePermissionInput(req,perm);

        if (vstate) {
            const { name, description } = req.body;
            const permData = { name, description };

            const updatedPerm = await perm.update(permData);
            this.helpers.recordActivity(vmsg, perm_name, data.user, data.user.id);

            return res.successResponse(200, vmsg, updatedPerm);
        } else {
            return res.errResponse(code, vmsg);
        }
    } catch (err) {
      return res.errResponse(403, err.message);
    }
  };

  deletePerm = async (req, res) => {
    try {
        const id = req.params.id;
        const perm_name = 'delete_perm';
        let vmsg;
        const { state, msg, code, data } = await this.auth.checkPermission(req, 'delete_perm',);

        if (!state) return res.errResponse(code, msg);

    
        const perm = await this.Perm.findByPk(id);

        if (!perm) return res.errResponse(404, 'Permission not found');

        const deletedPerm = await perm.destroy();
        vmsg = `Permission '${deletedPerm.name}'  deleted successfully`;
        this.helpers.recordActivity(vmsg, perm_name, data.user, data.user.id);

        return res.successResponse(200, vmsg, deletedPerm);
    } catch (err) {
      return res.errResponse(403, err.message);
    }
  };

  givePermission = async (req, res) => {
    try {
            const perm_name = 'give_permission';
            const { state, msg, code, data } = await this.auth.checkPermission(req, perm_name);

            if (!state) return res.errResponse(code, msg);

        
            const { vstate, vmsg, vdata } =await this.rolePermValidator.validateRolePermInput(req);

            if (vstate) {
                const { role_id, perm_id } = vdata;
                const rolePermdata = {
                    role_id: role_id,
                    permission_id: perm_id,
                };
                const rolePerm = await this.Access.create(rolePermdata);
                this.helpers.recordActivity(vmsg, 'give_permission', data.user, data.user.id);

                return res.successResponse(200, vmsg, rolePerm);
            } else {
                return res.errResponse(404, vmsg);
            }
    } catch (error) {
        return res.errResponse(403, error.message);
    }
  };
}

module.exports = AuthController;
