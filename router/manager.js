import express from "express"
import * as manager from '../controller/manager'
const router = express.Router()

router.post("/", manager.create)
router.get("/", manager.list)
router.get("/:id", manager.getById)
router.delete("/:id", manager.deleteById)
router.put("/:id", manager.update)

module.exports = router