const Mock =require('mockjs') 
// import {randomId} from "./mockData"
const mockData = require("./mockData")
// 模拟数据列表
let data=Mock.mock({
    'person|3':[
        {   
            'id':'@id',
            'name':'@cname',
            'age':'@natural(0,100)',
            'content':'@paragraph(1)'
        }
    ]
})
let arr=data.person;

// 数据的删除操作
let list = function (options) {
    // console.log(options.type);
    let rtype = options.type.toLowerCase(); //获取请求的类型并转换为小写
    switch (rtype) {
        case 'get': //查询
            break;
        case 'post': //删除

            let id = JSON.parse(options.body).params.id; // 获取请求的id，将options.body转换为JSON对象        
            arr = arr.filter(function (val) {
                return val.id != id; // 过滤掉前台传过来的id对应的相应数据，并重新返回
            });
            break;
        default:
            break;
    }
    return {
        data: arr
    }
}
Mock.mock('/list', /get|post/i, list);

// 数据的添加操作
let listAdd = function (options) {
    //  console.log("传过来的数据"+JSON.parse(options.body).params.obj);
    let obj = JSON.parse(options.body).params.obj;
    let dataId = mockData.randomId();
    obj.id = dataId;
    // console.log("数据获取"+ obj);
    arr = arr.concat(obj); // 将前台返回来的数据，拼接到数组中。
    return {
        data: arr
    }
}
Mock.mock('/listAdd', /get|post/i, listAdd);

// 数据的修改操作
let listUpdate = function (options) {
    let obj = JSON.parse(options.body).params.obj;
    console.log(obj.id)
    // console.log(JSON.parse(options.body).params);
    // let id = parseInt(JSON.parse(options.body).params.obj.id);
    arr = arr.map(val => { // 将需要替换的数据替换掉

        return val.id == obj.id ? obj : val;
    });
    return {
        data: arr
    }
}
Mock.mock('/listUpdate', /get|post/i, listUpdate);