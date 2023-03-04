import express from "express"
import * as user from '../controller/user'
const router = express.Router()

router.post("/", user.create)
router.put("/:id", user.update)
router.get("/:id", user.getById)

module.exports = router