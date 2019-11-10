const fs = require("fs");

defaultName = 'currency.csv';

class CSVSsver {
    constructor (name = defaultName) {
        this.name = name;
    }
    
    saveCSV(arr) {
        const keys = [];
        for (let key in arr[0]) { keys.push(key); };
        arr.forEach((it) => {
            const values = [];
            keys.forEach((key) => {
               values.push(it[key]) 
            });
            const line = values.join(';');
            fs.appendFileSync(this.name, line + '\n');
        });
    }
}

module.exports = CSVSsver;
