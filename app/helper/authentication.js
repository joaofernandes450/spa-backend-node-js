var jwt = require('jsonwebtoken');
var config = require('../../config');

/**
 * Token creation
 * @param {*} user 
 * @param {*} func 
 */
exports.createToken = function (user, func) {
    const payload = {
        id: user._id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        phoneNumber: user.phoneNumber,
        vat: user.vat,
        address: user.address,
        deliveryInformation: user.deliveryInformation
    };
    var token = jwt.sign(payload, config.secret, {
        expiresIn: (2 * 60 * 60) // 2 hours in seconds as token expiration date
    });
    func(token);
}
/**
 * Validates token
 * @param {*} req 
 * @param {*} res 
 * @param {*} next 
 */
exports.verifyToken = function (req, res, next) {
    var token = req.headers['x-access-token'];
    if (!token)
        return res.status(403).send({
            auth: false,
            message: 'No token provided.'
        });

    jwt.verify(token, config.secret, function (err, decoded) {
        if (err)
            return res.status(500).send({
                auth: false,
                message: 'Invalid token'
            });
        next();
    });
}
