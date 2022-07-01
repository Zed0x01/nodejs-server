const verifyRoles=(...ROLES)=>{
    return(req,res,next)=>{
        if(!req?.roles) return res.sendStatus(401);
        const requiredRules = [...ROLES];
        const userRoles = req.roles;
        const result = userRoles.map((role) => requiredRules.includes(role)).find((role)=> role === true);
        if(!result) return res.sendStatus(401)
        next();
    }
};

module.exports = verifyRoles;