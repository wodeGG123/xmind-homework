var fs = require("fs");
var csv = {
    getCsv:getCsv,
    setCsv:setCsv
}
module.exports = csv

function getCsv(path,callback){
    return new Promise((resolve, reject) => {
    fs.readFile(path, function (err, data) {
        if (err) {
            console.log(err.stack);
            reject('e')
        }
        ConvertToTable(data, function (table) {
            // callback(table)
            resolve(table)
        })
    });
    })
    function ConvertToTable(data, callBack) {
        data = data.toString();
        var table = {
            title:[],
            content:[]
        };
        var _dataList = data.split(/\n/);
        table.title = _dataList.splice(0,1)
        for (let index = 0; index < _dataList.length; index++) {
            const element = _dataList[index];
            table.content.push(element.split(','));
        }
        callBack(table);
    }
}
function setCsv(){}