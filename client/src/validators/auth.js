import HelperFunctions from '../helpers/utils';


class Validator {
    constructor() {
      this.helpers = new HelperFunctions();
    }

    logInValidator = (email, password) => {
        if (this.helpers.isEmpty(email)) {
            return {
                state : false,
                msg : 'Email/Username Input is not valid',
            }
        } else if (this.helpers.isEmpty(password)) {
            return {
                state : false,
                msg : 'Password Input is not valid',
            };
        } else {
            return {
                state : true,
                msg : "Valid input Details",
            }
        }
    }

  
}

export default Validator;