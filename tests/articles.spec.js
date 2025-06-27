const request = require('supertest');
const mockingoose = require('mockingoose');
const { app } = require('../server');
const Article = require('../api/articles/articles.schema');
const User = require('../api/users/users.model');

// Tokens récupérés via postman /login
const adminToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODVlOGE2N2I4MjUxNjQ1OThlYzlhOTMiLCJpYXQiOjE3NTEwNDg1ODEsImV4cCI6MTc1MTMwNzc4MX0.n3_ok7-9wL7r4DivKQb_Ufg2hAe0i4N5K6DQXuuFmtw';
const memberToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOiI2ODVlOWM5ZWI4MjUxNjQ1OThlYzlhOTYiLCJpYXQiOjE3NTEwNDg2MDUsImV4cCI6MTc1MTMwNzgwNX0.1a50ObiufD28EzNqNTr50XjIfd6OLK4oEvYk65ttxOU';

const adminUserMock = {
  _id: '685e8a67b825164598ec9a93',
  name: 'Test Admin',
  email: 'admin@test.com',
  role: 'admin',
  password: 'hash'
};

const memberUserMock = {
  _id: '685e9c9eb825164598ec9a96',
  name: 'Test User',
  email: 'user@test.com',
  role: 'member',
  password: 'hash'
};

const articleMock = {
  _id: '601dc437f7174e4b7c9c0bc9',
  title: 'Titre test',
  content: 'Contenu test',
  status: 'draft',
  user: '685e8a67b825164598ec9a93'
};

describe('CRUD articles (admin et membre)', () => {
  beforeEach(() => {
    mockingoose.resetAll();
  });

  it('crée un article (POST /api/articles) [admin]', async () => {
    mockingoose(Article).toReturn(articleMock, 'save');
    mockingoose(User).toReturn(adminUserMock, 'findOne');
    mockingoose(User).toReturn(adminUserMock, 'findById');
    const res = await request(app)
      .post('/api/articles')
      .set('x-access-token', adminToken)
      .send({ 
        title: 'Titre test', 
        content: 'Contenu test', 
        status: 'draft' 
    });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Titre test');
  });

  it('crée un article (POST /api/articles) [membre]', async () => {
    mockingoose(Article).toReturn(articleMock, 'save');
    mockingoose(User).toReturn(memberUserMock, 'findOne');
    mockingoose(User).toReturn(memberUserMock, 'findById');
    const res = await request(app)
      .post('/api/articles')
      .set('x-access-token', memberToken)
      .send({ title: 'Titre test', content: 'Contenu test', status: 'draft' });
    expect(res.status).toBe(201);
    expect(res.body.title).toBe('Titre test');
  });

  it('met à jour un article (PUT /api/articles/:id) [admin]', async () => {
    mockingoose(Article).toReturn(articleMock, 'findOneAndUpdate');
    mockingoose(User).toReturn(adminUserMock, 'findOne');
    mockingoose(User).toReturn(adminUserMock, 'findById');
    const res = await request(app)
      .put('/api/articles/601dc437f7174e4b7c9c0bc9')
      .set('x-access-token', adminToken)
      .send({ title: 'Titre modifié' });
    expect(res.status).toBe(200);
    expect(res.body.title).toBe('Titre test'); // selon mock
  });

  it('met à jour un article (PUT /api/articles/:id) [membre interdit]', async () => {
    mockingoose(Article).toReturn(articleMock, 'findOneAndUpdate');
    mockingoose(User).toReturn(memberUserMock, 'findOne');
    mockingoose(User).toReturn(memberUserMock, 'findById');
    const res = await request(app)
      .put('/api/articles/601dc437f7174e4b7c9c0bc9')
      .set('x-access-token', memberToken)
      .send({ title: 'Titre modifié' });
    expect(res.status).toBe(403);
  });

  it('supprime un article (DELETE /api/articles/:id) [admin]', async () => {
    mockingoose(Article).toReturn(articleMock, 'findOneAndDelete');
    mockingoose(User).toReturn(adminUserMock, 'findOne');
    mockingoose(User).toReturn(adminUserMock, 'findById');
    const res = await request(app)
      .delete('/api/articles/601dc437f7174e4b7c9c0bc9')
      .set('x-access-token', adminToken);
    expect(res.status).toBe(200);
    expect(res.body.message).toBeDefined();
  });

  it('supprime un article (DELETE /api/articles/:id) [membre interdit]', async () => {
    mockingoose(Article).toReturn(articleMock, 'findOneAndDelete');
    mockingoose(User).toReturn(memberUserMock, 'findOne');
    mockingoose(User).toReturn(memberUserMock, 'findById');
    const res = await request(app)
      .delete('/api/articles/601dc437f7174e4b7c9c0bc9')
      .set('x-access-token', memberToken);
    expect(res.status).toBe(403);
  });
});
