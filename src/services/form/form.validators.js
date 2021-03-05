import Enums from '../enums/enum.types';

export function validateEmail(email) {
    // General Email Regex (RFC 5322 Official Standard) - https://emailregex.com/ 
    const emailRegex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
    return emailRegex.test(email);
}

export function validatePassword(password) {

    // https://stackoverflow.com/questions/19605150/regex-for-password-must-contain-at-least-eight-characters-at-least-one-number-a
    const strengthOne = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
    const strengthTwo = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    const strengthThree = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    // eight characters, at least one uppercase letter, one lowercase letter, one number and one special character:
    if (strengthThree.test(password)) {
        return Enums.PasswordStrength.Strong;
    }
    
    // eight characters, at least one uppercase letter, one lowercase letter and one number
    if (strengthTwo.test(password)) {
        return Enums.PasswordStrength.Medium;
    }
    
    // eight characters, at least one letter and one number
    if (strengthOne.test(password)) {
        return Enums.PasswordStrength.Weak;
    }

    return Enums.PasswordStrength.Invalid;
}