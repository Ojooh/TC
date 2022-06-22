const nodemailer = require('nodemailer');
const bcrypt = require('bcrypt');
// const fs = require('fs');
const ejs = require('ejs');
const db = require('../db/models/index');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

require('dotenv').config('../.env');

class HelperFunctions {
  constructor() {
    this.nameRegex = /^[A-Za-z.\s/_-]*$/;
    this.nameyRegex = /^[A-Za-z0-9.\s,/_-]*$/;
    this.emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    this.telRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    this.passRegex = /^([a-zA-Z0-9]).{6,}$/;
    this.config = process.env;
    this.User = db.User;
    this.Role = db.Role;
    this.log = db.Activity;
    this.Perm = db.Permission;
  }

  isEmpty(input) {
    if (input == '' || input == null) {
      return true;
    } else {
      return false;
    }
  }

  validateName(name) {
    const bul = this.nameRegex.test(name);
    return bul;
  }

  validateNamey(name) {
    const bul = this.nameyRegex.test(name);
    return bul;
  }

  validateEmail(email) {
    const bul = this.emailRegex.test(email);
    return bul;
  }

  validateTel(tel) {
    const bul = this.telRegex.test(tel);
    return bul;
  }

  validatePass(password) {
    const bul = this.passRegex.test(password);
    return bul;
  }

  validInteger(integer) {
    if (isNaN(integer) || parseInt(integer) <= 0) {
      return false;
    } else {
      return true;
    }
  }

  validFloat(float) {
    if (isNaN(float) || parseFloat(float) < 0) {
      return false;
    } else {
      return true;
    }
  }

  generateHash(password) {
    const salt = bcrypt.genSaltSync(10);
    return bcrypt.hashSync(password, salt);
  }

  getAge(dateString) {
    var today = new Date();
    var birthDate = new Date(dateString);
    var age = today.getFullYear() - birthDate.getFullYear();
    var m = today.getMonth() - birthDate.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) 
    {
        age--;
    }
    return age;
}

  async emailExist(email, id = '') {
    email = email ? email : 'nothing';
    const filter =
      id && id != '' ? { email: email, id: { [Op.ne]: id } } : { email: email };

    const user = await this.User.findAll({ where: filter });

    if (user && user.length > 0) {
      return true;
    } else {
      return false;
    }
  }

  async generateRoleID(name) {
    const filter = name && name != '' ? { name: name } : { name: '' };
    const role = await this.Role.findAll({ where: filter });

    if (role && role.length > 0) {
      return role[0];
    } else {
      return 0;
    }
  };

  async generateForiegnID(table, filter) {
    const inst = await table.findAll({ where: filter });

    if (inst && inst.length > 0) {
      return inst[0].id;
    } else {
      return 0;
    }
  }


  generateUsername(email) {
    return email.split('@')[0];
  }

  async generateUserID(id) {
    let unique = false;
    let ID;
    while (unique == false) {
      ID = id + '-' + Math.random().toString(16).slice(2);
      ID = ID.replace('0.', '')
      ID = ID.toUpperCase();
      const user = await this.User.findOne({ where: { user_id : ID } });

      if (user) {
        unique = false;
      } else {
        unique = true
      }

    }
    console.log(ID);
    return ID.toString()
  }

  async recordActivity(title, perm_name, user, owner, is_active = true) {
    const perm = await this.Perm.findOne({ where: { name: perm_name } });
    const permId = perm && perm.id ? perm.id : '';

    const activity = {
      title: title,
      permission_id: permId,
      activity_by: user.username,
      owner: owner,
      is_active: is_active,
    };
    await this.log.create(activity);
  }

  async isDuplicate(filter, table, modelInstance={}) {
    const inst = await table.findAll(filter);

    if (inst && inst.length > 0 && inst[0].id != modelInstance.id) {
      return true;
    } else {
      return false;
    }
  }

  setTransporter() {
    const user = this.config.EMAIL_USER;
    const pass = this.config.EMAIL_PASSWORD;
    const service = this.config.EMAIL_SERVICE;
    const host = this.config.EMAIL_HOST;
    const port = this.config.EMAIL_PORT;

    const transport = nodemailer.createTransport({
      service: service,
      host: host,
      port: port,
      secure: true, // use SSL
      auth: {
        user: user,
        pass: pass,
      },
    });

    return transport;
  }

  async sendEmail(from, to, subject, url) {
    const transport = this.setTransporter();
    let response = {};

    await ejs.renderFile(
      __dirname + '../views/emailTemplate.ejs',
      { subject: subject, url: url },
      function (err, data) {
        if (err) {
          response = {
            umsg: 'An Error Occurred, when sending Email ${err.message}',
            ustate: false,
          };
          return;
        } else {
          const Options = {
            from: from,
            to: to,
            subject: subject,
            html: data,
          };
          console.log('html data ======================>', Options.html);

          transport.sendMail(Options, function (err, info) {
            if (err) {
              response = {
                umsg: 'An Error Occurred, when sending Email ${err.message}',
                ustate: false,
              };
              return;
            } else {
              let msg = 'Message sent: ' + info.response;
              response = { umsg: msg, ustate: true };
              return;
            }
          });
        }
      },
    );

    return response;
  }

  getPagingData(data, page, limit) {
    const { count: totalItems, rows: items } = data;
    const currentPage = page ? +page : 0;
    const totalPages = Math.ceil(totalItems / limit);
    return { totalItems, items, totalPages, currentPage };
  }

  getPagination(page, size) {
    const limit = size ? +size : 10;
    const offset = page ? page * limit : 0;
    return { limit, offset };
  }

  generateRandomVolume = (min, max, precission) => {
    let difference = max - min;

    // generate random number
    let rand = Math.random();

    // multiply with difference
    rand = rand * difference;

    // add with min value
    rand = rand + min;

    return rand.toFixed(precission);
  };

  isProduction = () => process.env.ENV == 'production';
}

module.exports = HelperFunctions;
