

class HelperFunctions {
  constructor() {
    this.nameRegex = /^[A-Za-z.\s/_-]*$/;
    this.nameyRegex = /^[A-Za-z0-9.\s,/_-]*$/;
    this.emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/i;
    this.telRegex = /^[\s()+-]*([0-9][\s()+-]*){6,20}$/;
    this.passRegex = /^([a-zA-Z0-9]).{6,}$/;
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

  generateUsername(email) {
    return email.split('@')[0];
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

  isProduction = () => process.env.ENV == 'production';
}

export default HelperFunctions;
