const {expect} = require('chai');
const app = require('./app');
const sinon = require('sinon');
const request = require('supertest');
const fetch = require('node-fetch');

const FAKE_RESPONSE = {
  tickets: [{id: 1}],
  count: 10,
  other: {
    some: 'other object',
  },
};

const stubNodeFetch = (response) =>
  sinon
    .stub(fetch, 'Promise')
    .returns(Promise.resolve({json: async () => Promise.resolve(response)}));

describe('App integration', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should fetch /tickets', async () => {
    stubNodeFetch(FAKE_RESPONSE);

    const res = await request(app).get('/tickets');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal({
      tickets: FAKE_RESPONSE.tickets,
      count: FAKE_RESPONSE.count,
    });
  });

  it('should fetch /tickets/:id', async () => {
    stubNodeFetch({ticket: FAKE_RESPONSE.tickets[0]});

    const res = await request(app).get('/tickets/1');

    expect(res.status).to.equal(200);
    expect(res.body).to.deep.equal(FAKE_RESPONSE.tickets[0]);
  });
});
