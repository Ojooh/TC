const db = require('../db/models/index');

const verifyUserSession = (req, res, next) => {
    console.log(req.user)
    if (!req.isAuthenticated()) {
        return res.errResponse(401, 'Invalid User cannot access system resources, please contact System Admin');
    } else {
        return next()
    }
};

exports.verifyUserSession = verifyUserSession;
