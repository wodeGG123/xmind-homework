let fs = require("fs");
let csv = {
    getCsv:getCsv,
    setCsv:setCsv
}
module.exports = csv

function getCsv(path){
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err.stack);
                reject('没找到文件')
            }else{
            let table = ConvertToTable(data)
                resolve(table)
            }
        });
    })
    function ConvertToTable(data) {
        data = data.toString();
        let table = {};
        let dataList = data.split(/\n/);
        table.title = dataList.splice(0,1)[0].replace(/\r/,'').split(',')
        table.content = dataList.map(item=>item.replace(/\r/,'').split(','))
        return table
    }
}
function setCsv(){}