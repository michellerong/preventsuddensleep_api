import express from "express"
import cors from "cors"
import manager from "./router/manager"
import login from "./router/login"
import personaldata from "./router/personaldata"
import user from "./router/user"

const app = express()

// cors - 
app.use(cors())

// 解析json格式(req.body)
app.use(express.urlencoded({extended: true}))
app.use(express.json())

// set router
app.use("/manager",manager)
app.use("/login",login)
app.use("/personaldata",personaldata)
app.use("/user",user)
// 沒有設定路徑的頁面
app.use((req,res,next) => {
    res.status(404).send('查無此頁面！')
    next();
});

// 設定後端爆炸時的頁面
app.use((err,req,res,next) => {
    console.log(err);
    res.status(500).send('伺服器爆了，請稍後再嘗試！')
    next();
})

export default app