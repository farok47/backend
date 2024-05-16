const jwt =require("jsonwebtoken")

/**verify token */
 function verfytoken(req,res,next) {
    const token=req.headers.token
    if (token)
    try {
        const decoded=jwt.verify(token,process.env.jwt_secret_key)
        req.user=decoded
        next()
    } catch (error) {
    res.status(401).json({message:"invalid token "})
        
    }
    else
    res.status(401).json({message:"no token provided"})
}

/**verify token and authorisation */
function verifytokenandauthorisation(req,res,next){
    verfytoken(req,res,()=>{
        if(req.user.id===req.params.id||req.user.isadmin)
        next()
        else
        res.status(403).json({message:"you are not allowed"})
    })
}

/**verify token and admin */
function verifytokenandadmin(req,res,next){
    verfytoken(req,res,()=>{
        if(req.user.isadmin)
        next()
        else
        res.status(403).json({message:"you are not allowed"})
    })
}

module.exports={verifytokenandadmin,verifytokenandauthorisation}