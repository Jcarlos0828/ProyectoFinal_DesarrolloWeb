const { Router } = require('express');
const router = Router();

const { UserList } = require('./../models/userModel');

router.get('/', async function(req,res){
    res.render('landingPage');
});

router.get('/login', async function(req, res){
    UserList.login('', '')
    .then(result => {
        const {data, message, status, error} = result;
        res.statusMessage = message;
        if (error) {
            return res.status(status).json({
                message: message,
                status: status
            });
        } else {
	        return res.status(status).json(data);
        }
    })
    .catch(err => {
        res.statusMessage = 'Hubo un error con la base de datos';
        return res.status(500).json({
            message: res.statusMessage,
            status: 500
        });
    });
});


router.get('/aprendizaje', async function(req,res){
    res.render('aprendizaje');
});

module.exports = router; 
