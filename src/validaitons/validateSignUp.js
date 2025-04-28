const validateSignUp=(req,res)=>{
    return validatekeys(req.body, ['firstName', 'lastName', 'email', 'password']);
};

const validatekeys=(jsonObject, requiredkeys)=>{
    const objectKeys = Object.keys(jsonObject);
    const missingKeys = requiredkeys.filter(key => !objectKeys.includes(key));
    if (missingKeys.length > 0) {
        return false;
    }
    return true;
}

module.exports=validateSignUp;