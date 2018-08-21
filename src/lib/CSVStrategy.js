import fs from 'fs';
//import json2csv from 'json2csv';

const json2csv = require('json2csv').parse;


export default class CSVStrategy {
  static async csvMwAmazon(data) {
    const fields = ['car', 'price', 'color'];
    let csv;
    try {
		  csv = json2csv(data, fields);
		  logger.info(csv);
		} catch (err) {
		  console.error(err);
		}

    return csv;
  }

  async generateFilepath(prefix = '') {
    const dateString = moment().format('DDMMYYYY');
    const filename = `${prefix}_${dateString}.${this.extension}`;
    this.filepath = `${__dirname}/../../../storage/export/${this.extension}/${filename}`;
  }

  static async write(filepath, data) {
    return new Promise((resolve, reject) => {
      const ws = fs.createWriteStream(filepath);

      ws.on('open', () => { ws.write(data); ws.end(); })
        .on('finish', () => { resolve(); })
        .on('error', () => { reject(); });
    });
  }
}
