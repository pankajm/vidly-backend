const jwt = require('jsonwebtoken');
const config = require('config');
const redis = require('redis');
const client = redis.createClient();

function auth(req, res, next){

  const token = req.header('x-auth-token');
  if(!token)
    return res.status(401).send('Access denied. No token provided');

  client.sismember('x-auth-tokens', token, function(error, isMember){
    if(!isMember)
      return res.status(401).send('Token expired');

    try{
      const decoded = jwt.verify(token, config.get('jwtPrivateKey'));
      req.user = decoded;
      next();
    }
    catch(ex){
      return res.status(400).send('Invalid Token');
    }
  })
}

module.exports = auth;