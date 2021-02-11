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