const HelperFunctions = require('../helpers/utils');
const db = require('../db/models/index');

class Validator {
  constructor() {
    this.helpers = new HelperFunctions();
    this.Perm = db.Permission;
  }

  validatePermissionInput = async (req, perm = undefined) => {
    let name, description;
    const id = req.body.id || req.params.id || req.query.id;
    if (perm) {
      name = req.body.name ? req.body.name : perm.name;
      description = req.body.description ? req.body.description : perm.description;
    } else {
      ({ name, description } = req.body);
    }
    const data = {};
    let tag;

    if (this.helpers.isEmpty(name) || !this.helpers.validateName(name)) {
      return {
        vstate: false,
        vmsg: 'Invalid Input for Permission name',
        vdata: data,
      };
    } else if (
      await this.helpers.isDuplicate({ where: { name: name } }, this.Perm, perm)
    ) {
      return {
        vstate: false,
        vmsg: `Invalid Input for Permission name, '${name}' already exists`,
        vdata: data,
      };
    } else if (
      this.helpers.isEmpty(description) == false &&
      !this.helpers.validateNamey(description)
    ) {
      return {
        vstate: false,
        vmsg: `Invalid Input for Description`,
        vdata: data,
      };
    } else {
      if (id && perm) {
        tag = name + ' Permission succesfully Updated';
      } else {
        tag = name + ' Permission succesfully created';
      }

      return { vstate: true, vmsg: tag, vdata: data };
    }
  };
}

module.exports = Validator;
