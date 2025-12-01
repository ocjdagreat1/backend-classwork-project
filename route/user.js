import express from "express"
import {registerStudents,getAllStudents, loginUser, getUserById,updateUser,deleteUser} from "../controller/user.js"

const router = express.Router()
router.post('/register',registerStudents)
router.get('/',getAllStudents)
router.get('/:id',getUserById)
router.post('/login',loginUser) 
router.put('/update/:id',updateUser) 
router.delete('/delete/:id',deleteUser) 
export default router