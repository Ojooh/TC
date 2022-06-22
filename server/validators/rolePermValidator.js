const HelperFunctions = require('../helpers/utils');
const db = require('../db/models/index');

class Validator {
  constructor() {
    this.helpers = new HelperFunctions();
    this.Perm = db.Permission;
    this.Role = db.Role;
    this.Access = db.RolePerm;
  }

  validateRolePermInput = async req => {
    let { perm_name, role_name } = req.body;
    perm_name = perm_name ? perm_name : '';
    role_name = role_name ? role_name : '';
    const data = {};
    const perm = await this.Perm.findOne({ where: { name: perm_name } });
    const role = await this.Role.findOne({ where: { name: role_name } });
    let tag;

    if (this.helpers.isEmpty(perm_name) || !perm || !perm.id) {
      return {
        vstate: false,
        vmsg: 'Invalid Input for Permission name',
        vdata: data,
      };
    } else if (this.helpers.isEmpty(role_name) || !role || !role.id) {
      return {
        vstate: false,
        vmsg: 'Invalid Input for Role name',
        vdata: data,
      };
    } else if (
      await this.helpers.isDuplicate(
        { where: { role_id: role.id, permission_id: perm.id } },
        this.Access,
      )
    ) {
      return {
        vstate: false,
        vmsg:
          'Invalid Input ' +
          role_name +
          '  already has ' +
          perm_name +
          ' Access',
        vdata: data,
      };
    } else {
      tag = role_name + ' Has been given Permission to ' + perm_name;
      data.role_id = role.id;
      data.perm_id = perm.id;

      return { vstate: true, vmsg: tag, vdata: data };
    }
  };
}

module.exports = Validator;
