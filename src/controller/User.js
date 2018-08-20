import axios from 'axios';
import cheerio from 'cheerio';
import MerchantAPI from '../lib/MerchantAPI';
import * as CSV from 'csv-string';


var request = require('request');

const test = async (req, res) => {
  let $;
  /*const a = getPageContent(`https://www.amazon.com/dp/B003O7ZON4`);
  const b = getPageContent(`https://www.amazon.com/dp/B003O7ZON4`);*/
  //const url = 'https://www.amazon.com/dp/B003O7ZON4';

  const merchantAPI = new MerchantAPI();
  await merchantAPI.login({ email: 'hiepkk3@gmail.com', 'password': 'hoanghiep9x' });
  const a = await merchantAPI.getEstSearchVolumn('glass');

  let merchantwordArr = CSV.parse(a.data);

  merchantwordArr = merchantwordArr.slice(1, 21);
  logger.info(merchantwordArr);
  //return request.get('https://www.merchantwords.com//search/us/rubik/sort-highest.csv');

  /*request.get('https://www.merchantwords.com//search/us/rubik/sort-highest.csv', function (error, response, body) {
    if (!error && response.statusCode == 200) {
      var csv = body;
      logger.info(csv);
    }
  });*/

  /*await downloadFile(url).then(data => {
    logger.info(data.data);
    $ = cheerio.load(data.data);
    const t = $('.section__head-content h1').text();
  })*/
  //const aryKw = ['rubiks', 'rubik', 'glass'];
  await Promise.all(merchantwordArr.map(async (merchantword) => {
    const kw = merchantword[0];
    const url = `https://www.amazon.com/s?field-keywords=${kw}`;
    await getPageContent(url).then(data => {
      $ = cheerio.load(data.data);
      const t = $('#s-result-count').text();
      logger.info(t);
    })
  }));
  
  
  res.json({ data: 1 });
};

const getPageContent = async (url) => {
  return axios({
    method: 'get',
    url,
  });
}

const downloadFile = async (url) => {
  return axios({
    method: 'get',
    responseType: 'blob',
  });
}


export default {
  test
};
