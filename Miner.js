const axios = require('axios');
const RequestTextFactory = require('./RequestTextFactory');

const defaultOptions = {
    // years of start/end currency mining
    period: {
        start: 1995,
        end: 2019
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



class Miner{
    constructor(options = defaultOptions) {
        this.options = options;
        this.reqFactory = new RequestTextFactory();
    }
    
    async mineYear(year = this.options.period.start) {
        const reqText = this.reqFactory.getRequestText(year);
        let response;
        try {
            response = await axios.get(reqText);
        } catch(err) {
            console.log(err);
        }
        const result = [];
        response.data.forEach((day) => {
            const dayObj = {};
            this.options.extractedKyes.forEach((key) => {
                dayObj[key.name] = key.conversion(day[key.path]);
            });
            result.push(dayObj);
        });
        return result;
    }
    
    async mineAll(start = this.options.period.start, end = this.options.period.end) {
        const range = [];
        const result = [];
        for (let year = start; year <= end; year++) {
            const yearResult = await this.mineYear(year);
            console.log('YEAR: ', year);
            console.log('FIRST_RATE', yearResult[0].rate_USD_BYN,
                'LAST_RATE', yearResult[yearResult.length - 1].rate_USD_BYN);
            yearResult.forEach((it) => { result.push(it); })
        };
        return result;
    }
    
    destroy() {
        this.reqFactory = null;
    }
}

module.exports = Miner;
