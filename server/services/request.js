const fetch = require('node-fetch');
const {BASE_URL, AUTH_TOKEN} = require('../constants/app');

class RequestService {
  constructor() {
    this.baseUrl = BASE_URL;
    this.options = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${AUTH_TOKEN}`,
      },
    };
  }

  constructUrl(url) {
    return this.baseUrl + url;
  }

  withBody(body) {
    this.options = {...this.options, body: JSON.stringify(body)};
  }

  async request(method, url) {
    try {
      const response = await fetch(this.constructUrl(url), {
        ...this.options,
        method,
      });
      const data = await response.json();

      return data;
    } catch (e) {
      throw new Error(e);
    }
  }

  get(url) {
    return this.request('GET', url);
  }

  post(url) {
    return this.request('POST', url);
  }
}

module.exports = {
  requestService: () => new RequestService(),
};
