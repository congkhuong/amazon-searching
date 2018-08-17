import axios from 'axios';
import cheerio from 'cheerio';
import MerchantAPI from '../lib/MerchantAPI';

var request = require('request');

const test = async (req, res) => {
  let $;
  /*const a = getPageContent(`https://www.amazon.com/dp/B003O7ZON4`);
  const b = getPageContent(`https://www.amazon.com/dp/B003O7ZON4`);*/
  //const url = 'https://www.amazon.com/dp/B003O7ZON4';
  const url = 'https://www.merchantwords.com//search/us/rubik/sort-highest.csv';

  const merchantAPI = new MerchantAPI();
  await merchantAPI.login();
  const a = await merchantAPI.getEstSearchVolumn('rubiks');
  logger.info(a.data);

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

  /*await getPageContent(url).then(data => {
    logger.info(data.data);
    $ = cheerio.load(data.data);
    const t = $('.section__head-content h1').text();
  })*/
  
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
