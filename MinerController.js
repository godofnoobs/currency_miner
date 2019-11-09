const Miner = require('./Miner');

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
        this.mine();
    }
    
    async mine() {
        await this.miner.mineAll();
        
    }
    
    destroy() {
        this.reqFactory = null;
    }
}

module.exports = MinerController;
