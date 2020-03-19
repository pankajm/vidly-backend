const request = require('supertest');
const {Genre} = require('../../models/genres');
let server;

describe('/api/genres - ', () => {
  describe('Get /', () => {
    beforeEach(() => {
      server = require('../../index');
    })
    afterEach(async () => {
      server.close();
      await Genre.remove({});
    })

    it('should return all genres', async () => {
      await Genre.collection.insertMany([
        {type : 'genre1'}, 
        {type : 'genre2'}
      ]
      )
      const res = await request(server).get('/api/genres');
      expect(res.status).toBe(200);
      expect(res.body.length).toBe(2);
      expect(res.body.some(g => g.type === 'genre1')).toBeTruthy();
      expect(res.body.some(g => g.type === 'genre2')).toBeTruthy();
    })
  })
})