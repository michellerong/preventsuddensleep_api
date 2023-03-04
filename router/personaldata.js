import express from "express"
import * as personaldata from '../controller/personaldata'
const router = express.Router()
router.get("/:id", personaldata.getById)

module.exports = router