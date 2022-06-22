const HelperFunctions = require('../helpers/utils');
const db = require('../db/models/index');
const moment = require('moment');
const jwt = require('jsonwebtoken');

class Validator {
  constructor() {
    this.helpers = new HelperFunctions();
    this.Role = db.Roles;
  }

  validateUserInput = async (req, user = undefined) => {
    let email, fname, lname, dob, gender, wedding_date, rel_status,
      phone, career, photo, role, password, sub_unit, exec_title, is_active;

    const id = req.body.id || req.params.id || req.query.id;
    const data = {};

    if (!user) {
      ({ email, fname, lname, dob, gender, wedding_date, rel_status,
        phone, career, photo, role, password, sub_unit, exec_title, is_active } = req.body);
    } else {
      const body = req.body
      email = body.email ? body.email : user.email;
      fname = body.fname ? body.fname : user.fname;
      lname = body.lname ? body.lname : user.lname;
      dob   = body.dob ? body.dob : user.dob;
      gender = body.gender ? body.gender : user.gender; 
      wedding_date = body.wedding_date? body.wedding_date : user.wedding_date;
      rel_status = body.rel_status ? body.rel_status : user.rel_status;
      phone = body.phone ? body.phone : user.phone;
      career = body.career? body.career: user.career;
      photo = body.photo ? body.photo : user.photo;
      role = body.role ? body.role : user.role 
      password = body.password ? body.password : user.password;
      sub_unit = body.sub_unit ? body.sub_unit : user.sub_unit;
      exec_title = body.exec_title ? body.exec_title : user.exec_title;
      is_active = body.is_active ? body.is_active : user.is_active;
    }

    let tag;
    const role_id = await this.helpers.generateRoleID(role);
    const sub_unit_id = await this.helpers.generateForiegnID({ title : sub_unit });
    const exec_title_id = await this.helpers.generateForiegnID({ title : exec_title });

    if (this.helpers.isEmpty(email) || await this.helpers.emailExist(email, id)) {
      return {
        vstate: false,
        vmsg: 'Invalid Input for email address, or email address already exits',
        vdata: data,
      };
    }

    else if (this.helpers.isEmpty(fname) || !this.helpers.validateName(fname)) {
      return {
        vstate: false,
        vmsg: 'Invalid Input for first name',
        vdata: data,
      };
    } 
    
    else if (this.helpers.isEmpty(lname) || !this.helpers.validateName(lname)){
      return {
        vstate: false,
        vmsg: 'Invalid Input for last name',
        vdata: data,
      };
    } 

    else if (!this.helpers.isEmpty(dob) && new Date(dob) == "Invalid Date"){
      return {
        vstate: false,
        vmsg: 'Invalid Input for Date of Birth',
        vdata: data,
      };
    }

    else if (this.helpers.isEmpty(gender) || !this.helpers.validateName(gender)){
      return {
        vstate: false,
        vmsg: 'Invalid Input for Gender',
        vdata: data,
      };
    } 

    else if (!this.helpers.isEmpty(wedding_date) && new Date(wedding_date) == "Invalid Date"){
      return {
        vstate: false,
        vmsg: 'Invalid Input for Wedding Anniversary Date',
        vdata: data,
      };
    }

    else if (!this.helpers.isEmpty(rel_status) && !this.helpers.validateName(rel_status)){
      return {
        vstate: false,
        vmsg: 'Invalid Input for Relationship Status',
        vdata: data,
      };
    } 

    else if (!this.helpers.isEmpty(phone) && !this.helpers.validateTel(phone)){
      return {
        vstate: false,
        vmsg: 'Invalid Input for Phone',
        vdata: data,
      };
    }
    
    else if (!this.helpers.isEmpty(career) && !this.helpers.validateName(career)){
      return {
        vstate: false,
        vmsg: 'Invalid Input for Career',
        vdata: data,
      };
    }
    
    else if (this.helpers.isEmpty(role) || role_id == 0) {
      return {
        vstate: false, 
        vmsg: 'Invalid Input for role', 
        vdata: data 
      };
    } 

    else if (!this.helpers.isEmpty(password) && !this.helpers.validatePass(password)){
      return { vstate: false, vmsg: 'Invalid Input for password', vdata: data };
    } 

    else if (!this.helpers.isEmpty(sub_unit) && sub_unit_id == 0) {
      return {
        vstate: false, 
        vmsg: 'Invalid Input for Sub unit', 
        vdata: data 
      };
    } 

    else if (!this.helpers.isEmpty(exec_title) || exec_title_id == 0) {
      return {
        vstate: false, 
        vmsg: 'Invalid Input for Executive Title', 
        vdata: data 
      };
    } 

    else {
      data.username = this.helpers.generateUsername(email);
      data.role_id = role_id.id;
      data.user_id = await this.helpers.generateUserID(role_id.symbol)
      data.age = this.helpers.getAge(dob);
      data.dob =  moment(dob).format('YYYY-MM-DD');
      data.sub_unit_id = sub_unit_id;
      data.exec_title_id = exec_title_id;
      data.wedding_date =  moment(wedding_date).format('YYYY-MM-DD');
      
      if (id && user) {
        data.passhash = password ? this.helpers.generateHash(password) : user.password;
        tag = data.username + ' User succesfully Updated';
      } else {
        data.passhash = this.helpers.generateHash(password);
        req.body.is_active = false;
        data.token = jwt.sign(
          { email },
          process.env.TOKEN_KEY,
          {
            expiresIn: "2h",
          }
        );
        tag = data.username + ' User succesfully created';
      }
      

      return { vstate: true, vmsg: tag, vdata: data };
    }
  };
}

module.exports = Validator;
