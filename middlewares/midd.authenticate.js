import jwt from 'jsonwebtoken'
function authentificationToken(req, res, next){
    const token = req.cookies?.token
   
    if (!token){
        
        return res.status(401).json({error: "Acces refuse: token manquant" });
                
    }
    try{
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
       
        req.user = decoded
        
        next()
    } catch(err){
        
        return res.status(403).json({error: "Token invalide ou expiré"})

    }
}

export default authentificationToken