import personaldata from "../module/personaldata"
import r from "../response/res"
//單筆資料
const getById = async (req, res) => {
    const [u,err] = await personaldata.getById(req.params.id);
   console.log(u)
    if (err) {
        res.status(200).json(r.E(err))
        return
    }
    res.status(200).json(r.R(u))
}


export { getById }