const User = require('./userModel');

exports.createUser = async (user) => {

    const { email, password, firstName, lastName } = user;

    try {

        const newUser = new User({
            firstName, lastName, email, password
        });
        const user = await newUser.save()

        return user;

    } catch (ex) {

        throw ex;
    }
}

exports.findUserByEmail = async (email) => {
    try {

        const user =  await User.findOne({email});

        return user;
    
    } catch (ex) {
    
        throw ex;
    }
}

exports.findUserById = async (id) => {
    try {
        
        const user = await User.findById(id);

        return {
            id: user._id,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email
        }

    } catch (ex) {

        throw ex;
    }
    
}

// helper functions
exports.validateRequiredBodyParams = (requestBody, requiredParams) => {

    const validation = requiredParams.filter(param => requestBody[param] === undefined);
    
    return ({
        isValid: !validation.length,
        errorMessage: !validation.length ? '' : `The following parameters must be included on request body: ${validation.join(', ')}`
    })
}

exports.validateBodyParamsNotEmpty = (requestBody, requiredParams) => {
    
    const validation = requiredParams.filter(param => requestBody[param] === '');
    
    return ({
        isValid: !validation.length,
        errorMessage: !validation.length ? '' : `The following parameters must not be an empty string: ${validation.join(', ')}`
    })
}