
let fs = require("fs");
let csv = {get,update,add,del}
module.exports = csv

function get(path,ctx){
    return new Promise(async (resolve, reject) => {
        try {
            let table = await getCsvData(path);
            let reqParam = ctx.request.query;
            table = _csvFilter(table.content,reqParam)
            resolve(table)
        } catch (error) {
            reject('没找到文件')
        }
    })
}
function update(path,ctx){
    return new Promise(async (resolve,reject)=>{
        let tag = true;
        let csvContent = ''
        try {
            let table = await getCsvData(path);
            let param = ctx.request.body;
            if(param._id){
                for (const key in param) {
                    if (param.hasOwnProperty(key)) {
                        const element = param[key];
                        table.content[param._id][key] = element
                    }
                }
            }
            csvContent = _convertToCsv(table);
        } catch (error) {
            tag = false
            reject(error)
        }
        if(tag){
            try {
                let rs = await setCsvData(path,csvContent);
                resolve(rs)
            } catch (error) {
                reject(error)
            }
        }
      
    })
}
function add(path,ctx){
    return new Promise(async (resolve,reject)=>{
        let table = await getCsvData(path);
        let titles = table.title;
    if(validateWriteParam(ctx.request.body,titles)){
        let data = getWriteData(ctx.request.body,titles);
        fs.writeFile(path,data,{flag:'a'},function(err){
            err ? reject('写入失败') : resolve('写入成功')
        })
    }else{
        reject('参数错误')
    }
    })
    function validateWriteParam(param,titles){
        let keys = new Set(titles);
        let count = 0;
        for (const key in param) {
            if (param.hasOwnProperty(key)) {
                if(keys.has(key)) count++;
            }
        }
        return (keys.size === count);
    }
    function getWriteData(param){
        let rs = []
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
    return new Promise(async (resolve,reject)=>{
        let tag = true;
        let csvContent = ''
        try {
            let table = await getCsvData(path);
            let _id = ctx.request.body._id;
            table.content.splice(_id,1); // 删除动作
            csvContent = _convertToCsv(table);
        } catch (error) {
            tag = false
            reject(error)
        }
        if(tag){
            try {
                let rs = await setCsvData(path,csvContent);
                resolve(rs)
            } catch (error) {
                reject(error)
            }
        }
      
    })
}
function _convertToCsv(data){
    let rs = '';
    rs += _arrToLine(data.title);
    data.content.forEach((obj,index)=>{
        delete obj._id;
        let t = _objToArr(obj);
        t = _arrToLine(t);
        if(index+1===data.content.length) {
            t = t.replace(/\n/,'');
        }
        rs += t;
    });
    return rs;
}
function _convertToTable(data) {
    data = data.toString();
    let table = {};
    let dataList = data.split(/\n/);
    table.title = dataList.splice(0,1)[0].replace(/\r/,'').split(',');
    table.content = dataList.map((item,index)=>_arrToObj(item.replace(/\r/,'').split(','),table.title,index));
    return table
}
function getCsvData(path){
    return new Promise((resolve,reject)=>{
        fs.readFile(path,function(err,data){
            if(err){
                reject('读取失败')
            }else{
                let table = _convertToTable(data);
                resolve(table)
            }
        })
    })
}
function setCsvData(path,data){
    return new Promise((resolve,reject)=>{
        fs.writeFile(path,data,function(err){
            if(err){
                reject('读取失败')
            }else{
                resolve('写入成功')
            }
        })
    })
}
function _csvFilter(list,param){
    let rs = []
    list.forEach((item)=>{
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

function _arrToObj(arr,keys,_id){
    let obj = {}
    arr.forEach((item,i)=>{
        obj[keys[i]] = item
    })
    return Object.assign(obj,{_id});
}
function _objToArr(obj){
    return Object.values(obj)
}
function _arrToLine(arr){
    return `${arr.join(',')}\n`
}