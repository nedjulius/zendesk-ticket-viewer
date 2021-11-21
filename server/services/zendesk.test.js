require('dotenv').config();
const {expect} = require('chai');
const {zendeskService} = require('./zendesk');
const {BASE_URL} = require('../constants/app');
const {PAGE_SIZE} = require('../constants/zendesk');

// unit test for ZendeskService
// tests whether API works with given credentials
// and returns expected data
describe('ZendeskService test', () => {
  it('should fetch ticket with id 1', async () => {
    const ticketId = 1;
    const data = await zendeskService().getTicket(ticketId);

    expect(data.id).to.equal(ticketId);
    expect(data.url).to.equal(`${BASE_URL}/api/v2/tickets/${ticketId}.json`);
  });

  it(`should fetch ticket list with page size ${PAGE_SIZE}`, async () => {
    const data = await zendeskService().getTicketList();

    expect(data.tickets.length).to.equal(PAGE_SIZE);
    expect(!!data.count).to.equal(true);
  });
});
