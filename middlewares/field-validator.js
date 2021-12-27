const { response } = require("express");
const { validationResult } = require("express-validator");

const fieldValidator = (req, res = response, next) => {
    const { name, email, password } = req.body;

    //error handling
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    }

    next();
}

module.exports = {
    fieldValidator
}
