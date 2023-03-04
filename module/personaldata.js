import pool from "../infra/db"
import mysql from "mysql"
import errData from "../response/error"

module.exports = {
    getById: (id) => {
        return new Promise(resolve => {
            pool.getConnection((err,connection) => {//資料庫連線
                if (err) {
                    resolve([null,new errData("","errMsg")])
                    return
                }

                const sql = mysql.format("SELECT DATE_FORMAT(`r_date`, \"%Y-%m-%d\") r_date, `r_time` r_time,`bpm` bpm,`spo2` spo2, level.level_name FROM `iot_project` JOIN level WHERE u_id = ? and iot_project.level = level.level", [id])
                console.log(sql)
                // sql的執行
                connection.query(sql, (err,result) => {
                    connection.release()//釋放連線
                    if(err || result.length == 0){ 
                        resolve([null,new errData("","not found")])
                    }else{
                        resolve([result,null])
                    }
                })
            })
        })
    }
}