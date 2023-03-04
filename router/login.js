import express from "express"
import * as login from '../controller/login'
const router = express.Router()

router.post("/", login.login)

module.exports = router