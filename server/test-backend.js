const request = require('supertest');
const app = require('./index');

describe('BackEnd testing suite', () => {
  test('GET /userId', (done) => {
    request(app)
    .get('/11')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        typeof JSON.parse(res.body.userId) === 'number';
        (typeof JSON.parse(res.body.name) &&
          typeof JSON.parse(res.body.email)) === 'string';
          res.body.name === 'jmarc';
          res.body.userId === 11;
          res.body.keys <= 2;
      })
    .end((err, res) => {
      if (err) return done(err);
      return done();
    });
  });
  test('POST /register', (done) => {
    request(app)
      .post('/register')
      .expect('Content-Type', /json/)
      .send({
        userId: '13',
        name: 'Test',
        email: 'test@example.com',
        password: 'p4ssw0rd',
      })
      .expect(201)
      .expect((res) => {
        res.body.keys.length === 4;
        res.body.email === 'test@example.com';
        res.body.userId === 13;
        res.body.name === 'Test';
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  test('GET /userId/template', (done) => {
    request(app)
    .get('/13/template')
    .expect('Content-Type', /json/)
  .expect(200)
  .end((err, res) => {
    if (err) return done(err);
    return done();
  });
  });
  test('POST /userId/template', (done) => {
    request(app)
      .post('/13/template')
      .expect('Content-Type', /json/)
      .expect(201)
      .send({
        "userId": "13",
        "name" : "Testing",
      })
      .expect((res) => {
        Array.isArray(res.body.stickers) == true;
        res.body.keys.length = 4;
        res.body.name = 'Testing'
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
  test( 'POST / userId / guests', (done) => {
    request(app)
    .post('/13/guests')
    .expect('Content-Type', /json/)
    .expect(201)
    .send({
      "name" : "testingFriend1",
      "mail": "johnDoe@testingfriend.org"
    })
    .expect((res) => {
      res.body.name === "testingFriend1";
      res.body.invitationSent == false;
      res.body.confirmed == false;
      res.body.keys.length <= 3;
    })
    .end((err, res) => {
      if (err) return done(err);
      return done();
    })
  })
  test('GET /userId/guests', (done) => {
    request(app)
      .get('/13/guests')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect((res) => {
        Array.isArray( res) = true;
      })
      .end((err, res) => {
        if (err) return done(err);
        return done();
      });
  });
});
