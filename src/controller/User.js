import axios from 'axios';
import cheerio from 'cheerio';

const test = async (req, res) => {
  let $;
  /*const a = getPageContent(`https://www.amazon.com/dp/B003O7ZON4`);
  const b = getPageContent(`https://www.amazon.com/dp/B003O7ZON4`);*/
  await getPageContent(`https://www.amazon.com/dp/B003O7ZON4`).then(data => {
    $ = cheerio.load(data.data);
    const t = $('#sponsoredProducts2_feature_div .a-carousel-card:first-child').text();
    console.log(t);
  })
  
  res.json({ data: 1 });
};

const getPageContent = async (url) => {
  return axios({
    method: 'get',
    url,
  });
}


export default {
  test
};
