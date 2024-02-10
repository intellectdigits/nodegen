const {body, checkSchema, validationResult} = require('express-validator');
module.exports = { email: {
    normalizeEmail: true,
    custom: {
        options: value => {
            return User.find({
                email: value
            }).then(user => {
                if (user.length > 0) {
                    return Promise.reject('Email address already taken')
                }
            })
      
          }
    }
}, password:{
        
    isStrongPassword: {
        minLength: 8,
        minLowercase: 1,
        minUppercase: 1,
        minNumbers: 1
    },
    errorMessage: "Password must be greater than 8 and contain at least one uppercase letter, one lowercase letter, and one number",
},
} 