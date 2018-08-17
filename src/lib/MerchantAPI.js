import axios from 'axios';

const baseUrl = 'https://www.merchantwords.com/';


export default class MerchantAPI {
  request(method, url, options = {}) {
    options.headers = { ...this.headers, ...options.headers || {} };
    return axios({
      method,
      url,
      ...options,
    });
  }

  async login(data) {
    const url = `${baseUrl}login`;
    return this.request('post', url, { data });
  }

  async getEstSearchVolumn(kw) {
  	const suffix = `search/us/${kw}/sort-highest.csv`
    const url = `${baseUrl}${suffix}`;
    return this.request('get', url);
  }
}
