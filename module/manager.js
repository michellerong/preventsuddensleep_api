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

                    // create manager
                    var sql = "INSERT INTO `user`(`a_id`, `u_id`, `phone`, `name`, `first_contact_person_phone`, `second_contact_person_phone`, `account`, `password`) VALUES (?,?,?,?,?,?,?,?)"
                    const createManager = mysql.format(sql, [data.a_id, data.u_id, data.phone, data.a_name, data.first_contact_person_phone, data.second_contact_person_phone, data.account, data.password])
                    
                    connection.query(createManager, (err, result) => {
                        if(err){ 
                            resolve([new errData("","create manager failed")])
                            return
                        }
                        else{
                             // 都沒錯將Transaction commit
                            connection.commit((err) => {
                                if (err) {
                                    connection.rollback(() => {//暫止狀態復原
                                        resolve([new errData("","commit transaction failed")])
                                    })
                                }
                            })

                            resolve([null])
                        }
                    })
                })
            })
        })
    },

    list: () => {
        return new Promise(resolve => {
            pool.getConnection((err,connection) => {
                if (err) {
                    resolve([null, new errData("","errMsg")])
                    return
                }

                const sql = mysql.format("SELECT * FROM `user`")

                // sql的執行
                connection.query(sql, (err,result) => {
                    connection.release()//釋放連線
                    if(err){ 
                        resolve([null, new errData("","errMsg")])
                    }else{
                        resolve([result, null])
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

                const sql = mysql.format("SELECT * FROM `user` WHERE a_id = ?", [id])
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
    },

    delete: (id) => {
        return new Promise(resolve => {
            pool.getConnection((err,connection) => {
                if (err) {
                    resolve([new errData("","errMsg")])
                    return
                }

                const sql = mysql.format("DELETE FROM `manager` WHERE a_id = ?", [id])

                // sql的執行
                connection.query(sql, (err,result) => {
                    connection.release()//釋放連線
                    if(err){ 
                        resolve([new errData("","not found")])
                    }else{
                        resolve([null])
                    }
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

                const sql = mysql.format("UPDATE `manager` SET phone = ? , a_name = ? , first_contact_person_phone = ? , second_contact_person_phone = ? WHERE u_id = ?", [data.phone,data.a_name,data.first_contact_person_phone,data.second_contact_person_phone,id])
                
                // sql的執行
                connection.query(sql, (err,result) => {
                    connection.release()//釋放連線
                    if(err){ 
                        resolve([new errData("","not found")])
                    }else{
                        resolve([null])
                    }
                })
            })
        })
    },
}