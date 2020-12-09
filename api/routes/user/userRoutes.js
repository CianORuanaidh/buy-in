const express = require('express');

const router = express.Router();

router.route('/')
    .get((req,res) => {
        const where = 'USERS ROUTE GET'
        console.log(where)
        res.json({message : where});
    })
    .post((req,res) => {
        const where = 'USERS ROUTE POST'
        console.log(where)
        res.json({message : where});
    })

router.route('/signup')
    .get((req,res) => {
        const where = 'USERS SIGNUP ROUTE GET'
        console.log(where)
        res.json({message : where});
    })
    .post((req,res) => {
        const where = 'USERS SIGNUP ROUTE POST'
        console.log(where)

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

        res.json({message : where});
    })

const validateRequiredBodyParams = (requestBody, requiredParams) => {
    const validation = requiredParams.filter(param => requestBody[param] === undefined);
    return ({
        isValid: !validation.length,
        errorMessage: !validation.length ? '' : `The following parameters must be included on request body: ${validation.join(', ')}`
    })
}

const validateBodyParamsNotEmpty = (requestBody, requiredParams) => {
    const validation = requiredParams.filter(param => requestBody[param] === '');
    return ({
        isValid: !validation.length,
        errorMessage: !validation.length ? '' : `The following parameters must not be an empty string: ${validation.join(', ')}`
    })
}

module.exports = router;