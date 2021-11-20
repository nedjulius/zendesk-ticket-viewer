const {PAGE_SIZE} = require('../constants/zendesk');
const {requestService} = require('./request');

class ZendeskService {
  async getTicketList(page) {
    const data = await requestService().get(
      `/api/v2/tickets?per_page=${PAGE_SIZE}&page=${page}`
    );

    return {tickets: data.tickets, count: data.count};
  }

  async getTicket(id) {
    const data = await requestService().get(`/api/v2/tickets/${id}`);

    return data.ticket;
  }
}

module.exports = {
  zendeskService: () => new ZendeskService(),
};
