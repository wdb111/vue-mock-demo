 function randomId(){
    let str="";
    for(let i=0;i<18;i++){
       str+=parseInt(Math.random()*10);
    }
    return str;
}
exports.randomId=randomId;