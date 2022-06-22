const HelperFunctions = require('../helpers/utils');
const db = require('../db/models/index');

class Validator {
  constructor() {
    this.helpers = new HelperFunctions();
    this.Role = db.Role;
  }

  validateRoleInput = async (req, role = undefined) => {
    let name, symbol;
    const id = req.body.id || req.params.id || req.query.id;
    if (role) {
      name = req.body.name ? req.body.name : role.name;
      symbol = req.body.symbol ? req.body.symbol : role.symbol;
    } else {
      ({ name, symbol } = req.body);
    }
    const data = {};
    let tag;

    if (this.helpers.isEmpty(name) || !this.helpers.validateName(name)) {
      return {
        vstate: false,
        vmsg: 'Invalid Input for Role name',
        vdata: data,
      };
    } 
    else if ( await this.helpers.isDuplicate({ where: { name: name } }, this.Role, role)) {
      return {
        vstate: false,
        vmsg: `Invalid Input for Role name, '${name}' already exists`,
        vdata: data,
      };
    } 
    else if (this.helpers.isEmpty(symbol) || !this.helpers.validateName(symbol)) {
      return {
        vstate: false,
        vmsg: 'Invalid Input for Role Symbol',
        vdata: data,
      };
    } 
    else if (await this.helpers.isDuplicate({ where: { symbol : symbol.toString().toUpperCase() } }, this.Role, role)) {
      return {
        vstate: false,
        vmsg: `Invalid Input for Symbol name, '${symbol}' already exists`,
        vdata: data,
      };
    }
    else {
      symbol = symbol.toString().toUpperCase();
      data.name = name;
      data.symbol = symbol;
      if (id && role) {
        tag = name + ' Role succesfully Updated';
      } else {
        tag = name + ' Role succesfully created';
      }

      return { vstate: true, vmsg: tag, vdata: data };
    }
  };
}

module.exports = Validator;
