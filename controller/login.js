import auth from "../module/login"
import r from "../response/res"
import errData from "../response/error"

// create - 
const login = async (req, res) => {
    if (req.body.account == "" || req.body.password == "") {
        res.status(200).json(r.E(new errData("","Invalid Paramter")))
    }
    const [users,err] = await auth.login(req.body.account,req.body.password)
    
    if (err) {
        res.status(200).json(r.E(err))
        return
    }
console.log(users)
    res.status(200).json(r.R(users))
}
export { login }