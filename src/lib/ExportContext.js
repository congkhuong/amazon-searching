import moment from 'moment';
import CSVStrategy from './CSVStrategy';

export default class ExportContext {
  constructor(strategy, designed = false) {
    this.setStrategy(strategy, designed);
  }

  async saveMwAmazon() {
    await this.generateFilepath(`amazon`);
    const content = [
      {
        "car": "Audi",
        "price": 40000,
        "color": "blue"
      }
    ];
    const data = await this.strategy.csvMwAmazon(content);
    logger.info(this.filepath);
    await this.strategy.write(this.filepath, data);

    return this.filepath;
  }

  async generateFilepath(prefix = '') {
    const dateString = moment().format('DDMMYYYY');
    const filename = `${prefix}_${dateString}.${this.extension}`;
    this.filepath = `${__dirname}/../../storage/export/${this.extension}/${filename}`;
  }

  setStrategy(strategy) {
    this.extension = strategy;

    switch (strategy) {
      case 'csv':
        this.strategy = CSVStrategy;
        break;

      default:
        throw new TypeError(`Unsupported export strategy: ${strategy}`);
    }
  }
}
