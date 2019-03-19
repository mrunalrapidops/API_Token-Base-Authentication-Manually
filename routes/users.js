const express = require ('express');
//const router = express.Router;
const router = require('express-promise-router')();
const passport = require('passport');
const passportConf = require('../passport');
const {validateBody,schema} = require('../helpers/routeHelpers');
const UsersController = require('../controllers/users');
const passportSignIn = passport.authenticate('local', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

router.route('/signup').post(validateBody(schema.authSchema),UsersController.signUp);
router.route('/signin').post(validateBody(schema.authSchema),passportSignIn,UsersController.signIn);
router.route('/secret').get(passportJWT,UsersController.secret);
module.exports = router;