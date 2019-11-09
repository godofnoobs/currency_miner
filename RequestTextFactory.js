const defaultTextTemplate = 'http://www.nbrb.by/API/ExRates/Rates/Dynamics/';

class RequestTextFactory {
    constructor(textTemplate = defaultTextTemplate) {
        this.textTemplate = textTemplate;
    }
    
    getRequestText(year = 1995, curID = 145) {
        const requestText = `${this.textTemplate}${curID}?startDate=${year}-01-01&endDate=${year}-12-31`;
        return requestText;
    }
}

module.exports = RequestTextFactory;
