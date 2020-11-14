
const jwt = require('jsonwebtoken');
const config = require('config');

 const auth    = (req,res,next) => {
  // done before monday
      // get token from header
      const token = req.header('x-auth-token');

      // check if not token
  
      if(!token){
          return res.status(401).json({msg: 'No token, authorization denied'});
      }
      // verif token
      try{
          const decoded = jwt.verify(token,config.get('jwtSecret'));
  
          req.user = decoded.user;
          next();
      }catch(err){
          res.status(401).json({ msg: 'token is not valid'})
      }
}


module.exports = {
    auth : auth
}