const {User} = require('../../../models/users');
const jwt = require('jsonwebtoken');
const config = require('config');
const mongoose = require('mongoose');

describe('GetAuthToken - ', () => {
  it('should return valid auth token ', () => {
    const payload = {_id : (new mongoose.Types.ObjectId).toHexString(), isAdmin : true};
    const user = new User(payload);
    const token = user.getAuthToken();
    const decoded = jwt.verify(token, config.get('jwtPrivateKey'))
    expect(decoded).toMatchObject(payload);
  })
})
