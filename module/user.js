import pool from "../infra/db"
import mysql from "mysql"
import errData from "../response/error"

module.exports = {
    create: (data) => {
        return new Promise(resolve => {
            pool.getConnection((err,connection) => {
                if (err) {
                    resolve([new errData("","errMsg")])
                    return
                }

                connection.beginTransaction((err) => {
                    if (err) {
                        resolve([new errData("","start transaction failed")])
                        return
                    }
                    // create user
                    var sql2 = "INSERT INTO `user`(`u_id`,`a_id`, `phone`, `name`, `first_contact_person_phone`, `second_contact_person_phone`) VALUES (?,?,?,?,?,?)"
                    const createUser= mysql.format(sql2, [data.u_id, data.a_id, data.phone, data.u_name, data.first_contact_person_phone, data.second_contact_person_phone])

                    connection.query(createUser, (err, result) => {
                        if(err){ 
                            console.log(err)
                            connection.rollback(() => {
                                resolve([new errData("","create user failed")])
                            })
                            return
                        }
                        
                         // 都沒錯將Transaction commit
                        connection.commit((err) => {
                            if (err) {
                                connection.rollback(() => {//暫止狀態復原
                                    resolve([new errData("","commit transaction failed")])
                                })
                            }
                        })

                        resolve([null])
                    })
                })
            })
        })
    },

    update: (id,data) => {
        return new Promise(resolve => {
            pool.getConnection((err,connection) => {
                if (err) {
                    resolve([new errData("","errMsg")])
                    return
                }

            const sql = mysql.format("UPDATE `user` SET `phone` = ? , `name` = ? , `first_contact_person_phone` = ? , `second_contact_person_phone` = ? WHERE `u_id` = ?", [data.phone,data.name,data.first_contact_person_phone,data.second_contact_person_phone,id])
            console.log(sql)
            // sql的執行
            connection.query(sql, (err,result) => {
                connection.release()//釋放連線
                if(err){ 
                    resolve([null,new errData("","not found")])
                }else{
                    resolve([null])
                }
            })
        })
    })
},
    getById: (id) => {
        return new Promise(resolve => {
            pool.getConnection((err,connection) => {
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
