const jwt = require('jsonwebtoken');
// vérifie si tu es tjr co et permet de naviguer sur le site en etant co (sans avoir a se reco a chaque page)
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token,process.env.JWT_SECRET_KEY);
        const userId = decodedToken.userId;
        //mettre une verif en base de donnee si l'user existe
        if (req.body.userId && req.body.userId !== userId) {
            throw 'Invalid user ID';
        } else {
            req.userId = decodedToken.userId;
            next();
        }
    } catch(error) {
        // console.log(`${error}`);
        res.status(401).json({
            error: new Error('Invalid request!')
        });
    }
};