const fs = require("fs");

defaultName = 'currency.csv';

class CSVSsver {
    constructor (name = defaultName) {
        console.log(111);
        this.name = name;
    }
    
    saveCSV(arr) {
        const keys = [];
        for (let key in arr[0]) { keys.push(key); };
        const heading = keys.join(';');
        fs.writeFileSync(this.name, heading + '\n');
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
