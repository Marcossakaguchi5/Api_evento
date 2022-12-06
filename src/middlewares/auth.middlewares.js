const jwt = require('jsonwebtoken');

exports.required=(req,res,next)=>{
    try{
        const token = req.headers.authorization.split(' ')[1];
        const decode= jwt.verify(token,process.env.JWT_KEY);
        req.user=decode;
        next();
    }catch(error){
        return res.status(401).send({mesagem:'falha na autenticacao'})
    }
}

exports.verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (token == null) return res.sendStatus(401);

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

exports.verifyRefreshToken = (req, res, next) => {
    const {refreshToken} = req.body;
    if (refreshToken == null) return res.sendStatus(401);

    jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET, (err, user) => {
        console.log(err);
        if (err) return res.sendStatus(403);
        req.user = user;
        next();
    })
}

