/*
    User Routes / Auth
    host + /api/auth
*/

const { Router } = require("express");
const router = Router();
const { check } = require("express-validator");

const { createUser, userLogin, renewToken } = require("../controllers/auth");
const { fieldValidator } = require("../middlewares/field-validator");
const { validateJWT } = require("../middlewares/jwt-validator");


router.post("/new", [
    //middleware
    check("name", "Name is required").not().isEmpty(),
    check("email", "Email is required").isEmail(),
    check("password", "Password is required and must contain at least 6 characters").isLength({ min: 6 }),
    fieldValidator
],createUser);

router.post("/", [
    //middleware
    check("email", "Email is required").isEmail(),
    check("password", "Password is required").isLength({ min: 6 }),
    fieldValidator
], userLogin);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
