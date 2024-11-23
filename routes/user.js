const express = require('express')
const {handledelete,handleget, handlepost, handleput, handlesingleuser} = require('../controllers/user')

const router = express.Router()

router.get('/getusers',handleget)
router.delete('/deleteuser/:id',handledelete)
router.post('/adduser',handlepost)
router.put('/update/:id',handleput)
router.get('/getuser/:id',handlesingleuser)



module.exports = router

