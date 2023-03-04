import pool from "../infra/db"
import mysql from "mysql"
import errData from "../response/error"

module.exports = {
    login: (account,password) => {
        return new Promise(resolve => {
            pool.getConnection((err,connection) => {
                if (err) {
                    resolve([null,new errData("1400","errMsg")])
                    return
                }
                
                const sql = mysql.format("SELECT * FROM `user` WHERE account = ? AND password = ? ", [account, password])
                console.log(sql)
                // sql的執行
                connection.query(sql,(err,result) => {
                    if(err || result.length == 0){ 
                        connection.release()//釋放連線
                        resolve([null,new errData("1404","not found")])
                    }
                    else{
                        resolve([result,null])
                    }
                })
            })
        })
    }
}