const express=require('express')
const router=express.Router()
const usercontroller =require('../app/controllers/usercontroller')
const labelcontroller =require('../app/controllers/labelcontroller')
const taskcontroller =require('../app/controllers/taskcontroller')
const {authenticateUser}=require('../app/middlewares/authentication')


router.post('/users/register',usercontroller.create)
router.post('/users/login',usercontroller.login)
router.get('/users/account',authenticateUser,usercontroller.show)
router.delete('/users/logout',authenticateUser,usercontroller.remove)

router.get('/labels',authenticateUser,labelcontroller.list)
router.post('/labels',authenticateUser,labelcontroller.create)
router.get('/labels/:id',authenticateUser,labelcontroller.show)
router.put('/labels/:id',authenticateUser,labelcontroller.update)
router.delete('/labels/:id',authenticateUser,labelcontroller.remove)
router.post('/labelsall',authenticateUser,labelcontroller.createall)

router.get('/tasks',authenticateUser,taskcontroller.list)
router.post('/tasks',authenticateUser,taskcontroller.create)
router.get('/tasks/archieved',authenticateUser,taskcontroller.archieved)
router.get('/tasks/:id',authenticateUser,taskcontroller.show)
router.put('/tasks/:id',authenticateUser,taskcontroller.update)
router.delete('/tasks/:id',authenticateUser,taskcontroller.remove)


module.exports=router