import manager from "../module/manager"
import { v4 as uuidv4 } from 'uuid';
import r from "../response/res"
//邏輯寫在這邊
// create - 
const create = async (req, res) => {
    // set id 
    req.body.a_id = uuidv4() //通用唯一識別碼UUID
    req.body.u_id = uuidv4()
    const [err] = await manager.create(req.body) //等待這件事做完才能往下
    console.log(err)
    if (err) {
        res.status(200).json(r.E(err))//錯誤就跳出並回覆error
        return
    }
    

    res.status(200).json(r.R(null))
}
//多筆資料
const list = async (req, res) => {
    const [users,err] = await manager.list(req.body)//等待這件事做完才能往下 users是資料 err錯誤訊息

    if (err) {
        res.status(200).json(r.E(err))
        return
    }
    res.status(200).json(r.R(users))//正確的話回覆資料
}
//單筆資料
const getById = async (req, res) => {
    const [u,err] = await manager.getById(req.params.id);
    console.log(u)
    if (err) {
        res.status(200).json(r.E(err))
        return
    }
    res.status(200).json(r.R(u))
}

const deleteById = async (req, res) => {
    const [err] = await manager.delete(req.params.id)

    if (err) {
        res.status(200).json(r.E(err))
        return
    }
    res.status(200).json(r.R(null))
}

const update = async (req, res) => {
    const [err] = await manager.update(req.params.id,req.body)//要回傳內容

    if (err) {
        res.status(200).json(r.E(err))
        return
    }
    res.status(200).json(r.R(null))
}

export { list, create, getById, deleteById, update }