const Miner = require('./Miner');
const CSVSaver = require('./CSVSaver');

const defaultOptions = {
    // years of start/end currency mining
    period: {
        start: '1995',
        end: '2019'
    },
    // path to extracted values in http response data
    // and necessary conversion functions
    extractedKyes: [
        {
            name: 'date',
            path: 'Date',
            conversion: value => value.split('T')[0],
        },
        {
            name: 'rate_USD_BYN',
            path: 'Cur_OfficialRate',
            conversion: value => value,
        }
    ]
    
};


class MinerController {
    constructor(options = defaultOptions) {
        this.options = options;
        this.miner = new Miner();
        this.saver = new CSVSaver();
        this.doSomeShit();
    }
    
    async doSomeShit() {
        const currency = await this.miner.mineAll();
        this.saver.saveCSV(currency);
    }
    
    destroy() {
        this.miner.destroy();
        this.miner = null;
        this.saver = null;
    }
}

module.exports = MinerController;
