const express = require('express');
const router = express.Router();

const Controller = require('./controller');
const verifyToken = require('./verifyToken');


router.post('/', Controller.register);
router.put('/update',verifyToken, Controller.update);
router.delete('/delete', Controller.delete);
router.post('/login', Controller.login);

router.get('/verifytoken',verifyToken, Controller.verifyToken);



module.exports = router;