import user from "../module/user"
import { v4 as uuidv4 } from 'uuid';
import r from "../response/res"
const create = async (req, res) => {
    // set id 
    req.body.u_id = uuidv4()
    const [err] = await user.create(req.body)//等待這件事做完才能往下
    console.log(err)
    if (err) {
        res.status(200).json(r.E(err))//錯誤就跳出並回覆error
        return
    }
    res.status(200).json(r.R(null))
}
const update = async (req, res) => {
    const [err] = await user.update(req.params.id,req.body)//要回傳內容

    if (err) {
        res.status(200).json(r.E(err))
        return
    }
    res.status(200).json(r.R(null))
}
const getById = async (req, res) => {
    const [u,err] = await user.getById(req.params.id);
    console.log(u)
    if (err) {
        res.status(200).json(r.E(err))
        return
    }
    res.status(200).json(r.R(u))
}
export { create , update , getById }