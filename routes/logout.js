const express = require('express');
const router = express.Router();
const client = require('../startup/database').redisClient;

router.post('/', (req, res) => {
    client.srem('x-auth-tokens', req.header('x-auth-token'), function(error, reply){
      if(error)
        return res.send(error);
      return res.send('logout successful');
    });
    
});

module.exports = router;

