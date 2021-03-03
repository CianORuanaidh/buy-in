const express = require('express');
const { createUser, findUserByEmail, findUserById,
        validateRequiredBodyParams, validateBodyParamsNotEmpty } = require('./userController')
const { createToken } = require('../../tokens/tokenService');
const { verifyToken } = require('../../middleware/verifyToken');

const router = express.Router();

// SIGNUP ROUTES
router.route('/signup')
    .post(async (req,res) => {

        const { email, password, firstName, lastName } = req.body;
        const requiredParams = ['email', 'password', 'firstName', 'lastName'];

        if (!validateRequiredBodyParams(req.body, requiredParams).isValid) {
            res.status(400).json({message : validateRequiredBodyParams(req.body, requiredParams).errorMessage});
            return;
        };

        if (!validateBodyParamsNotEmpty(req.body, requiredParams).isValid) {
            res.status(400).json({message : validateBodyParamsNotEmpty(req.body, requiredParams).errorMessage});
            return;
        };

        try {

            const foundUser = await findUserByEmail(email);
            if (foundUser) {
                res.status(400).json({message: `email ${email} already exists`});
                return;
            }

            const user = await createUser(req.body);
            const token = createToken({ id: user._id });

            res.cookie('token', token);
            res.json({ data: user });

        } catch (ex) {
            console.log(ex)
            res.status(500).json({ message: "internal server error", error: ex });
        }

    });

// LOGIN ROUTE
router
    .route('/login')
    .post(async (req, res) => {

        const { userEmail, userPassword } = req.body;        
        const requiredParams = ['userEmail', 'userPassword'];

        if (!validateRequiredBodyParams(req.body, requiredParams).isValid) {
            res.status(400).json({message : validateRequiredBodyParams(req.body, requiredParams).errorMessage});
            return;
        };

        if (!validateBodyParamsNotEmpty(req.body, requiredParams).isValid) {
            res.status(400).json({message : validateBodyParamsNotEmpty(req.body, requiredParams).errorMessage});
            return;
        };

        const user = await findUserByEmail(userEmail);

        if (!user) {
            res.status(400).json({ message: `EMAIL There was a problem signing you in. Please check user email and password` } )
        }

        try {
            const isEmailVerified = await user.comparePasswords(userPassword);
        
            if (!isEmailVerified) {
                res.status(400).json({ message: `PASSWORD There was a problem signing you in. Please check user email and password` } )
            }
        
            const token = createToken({ id: user._id });
            res.cookie('token', token);
            res.json(user)
        }

        catch (ex) {
            res.status(500).json({ message: 'internal server error', err: ex });
        }
    });

// GET USER ROUTE
router
    .use(verifyToken)
    .route('/getuser')
    .get(async (req,res) => {
        
        try {

            const user = await findUserById(req.user.id);
            res.status(200).json(user);

        } catch (ex) {

            console.log(ex)
            res.status(500).json({ message: 'internal server error' });
        
        }
    });

// LOGOUT ROUTE
router
    .use(verifyToken)
    .route('/logout')
    .post(async (req,res) => {

        try {
            
            const { user } = req;
            res.cookie("token", '');
            res.json({message:'User logged out'});
        
        } catch (ex) {

            res.status(500).json({message: 'there was a problem loggin you out'});
        }
        
    });

module.exports = router;