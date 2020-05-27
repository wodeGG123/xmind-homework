let fs = require("fs");
let csv = {
    get,
    update,
    add,
    del,
}
module.exports = csv

function get(path,ctx){
    return new Promise((resolve, reject) => {
        fs.readFile(path, function (err, data) {
            if (err) {
                console.log(err.stack);
                reject('没找到文件')
            }else{
                let table = ConvertToTable(data);
                let reqParam = ctx.request.query;
                table = _csvFilter(table.content,reqParam)
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
function update(){}
function add(path,ctx){
    return new Promise((resolve,reject)=>{
       let data = getWriteData(ctx.request.body,reject);
       console.log(11111)
       fs.writeFile(path,data,{flag:'a'},function(err){
           err ? reject('写入失败') : resolve('写入成功')
       })
    })

    function getWriteData(param,reject){
        reject('cccccc')
        let rs = []
        let paramKeys = new Set(Object.keys(param))
        let keys = ['type','time','category','amount']

        for (const key in param) {
            if (param.hasOwnProperty(key)) {
                const element = param[key];
                rs.push(element)
            }
        }
        rs.join(',');
        rs = '\n'+rs;
        return rs
    }
}
function del(path,ctx){
    return new Promise((resolve,reject)=>{
        if(1){resolve()}else{reject()}
    })
}


function _csvFilter(list,param){
    let rs = []
    list.forEach((item)=>{
        item = _arrToObj(item,['type','time','category','amount']); // 查询数据数组转换成对象
        if(Object.keys(param).length>0){
            let tag = true; // 预置参数，如果结果为true则向返回值里添加对象
            for (const key in param) {
                if (Object.hasOwnProperty.call(param,key)) {
                    const element = param[key];
                    if(element === '') continue; // 值为空的属性表示不对此项进行筛选，直接跳过
                    if(item[key].indexOf(element)===-1) tag = false; // 筛选所有属性的交集
                    
                }
            }
            if(tag) rs.push(item)
        }else{
            rs.push(item)
        }
    })
    return rs
}

function _arrToObj(arr,keys){
    let obj = {}
    arr.forEach((item,i)=>{
        obj[keys[i]] = item
    })
    return obj
}
function _objToArr(){}