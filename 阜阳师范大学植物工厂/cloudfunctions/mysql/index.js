// /**
//  * 查询所有数据库名
//  * @param host
//  * @param user
//  * @param password
//  * @param type 1:数据库，2:表，3:查询
//  */
// const cloud = require('wx-server-sdk')
// const mysql = require('mysql')

// cloud.init()


// exports.main = async (event, context) => new Promise((resolve, reject) => {
//   let connection;
//  if (event.type == 3) { //查询
//     const connection = mysql.createConnection({
      // host: event.host,
      // port: event.port,
      // user: event.user,
      // password: event.password,
      // database: event.database
//     });

//     connection.connect();
    // let queryResult;
    // connection.query(event.sql, function (error, results, fields) {
    //   if (error) result = error;

    //   queryResult = results
    // });
    // connection.end();

  //   setTimeout(() => {
  //     resolve(queryResult)
  //   }, 500)
  // }

// })

// 云函数入口文件
const cloud = require('wx-server-sdk')
//引入mysql操作模块
const mysql = require('mysql2/promise')
cloud.init()
// 云函数入口函数
exports.main = async(event, context) => {
 //链接mysql数据库的test库，这里你可以链接你mysql中的任意库
let connection;
 const connection = await mysql.createConnection({
  host: event.host,
  port: event.port,
  user: event.user,
  password: event.password,
  database: event.database    
 })
 connection.connect();
 let queryResult;
 connection.query(event.sql, function (error, results, fields) {
   if (error) result = error;

   queryResult = results
 });
 connection.end();

 setTimeout(() => {
  resolve(queryResult)
}, 500)


 
}