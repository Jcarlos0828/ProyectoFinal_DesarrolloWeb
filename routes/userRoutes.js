const { Router } = require('express');
const router = Router();

const { UserList } = require('./../models/userModel');

router.get('/', async function(req,res){
    res.render('landingPage', { dataErr: '' });
});

router.post('/login', async function(req, res){
    const {email, password} = req.body;
    UserList.login(email, password)
    .then(result => {
        const {data, message, status, error} = result;
        res.statusMessage = message;
        res.status(status);
        if (error) {
            let dataErr = {
                message: message,
                status: status
            };
            res.render('landingPage', { dataErr });
        } else {
	        res.render('aprendizaje', { data });
        }
    })
    .catch(err => {
        console.log('Login', err);
        res.statusMessage = 'Hubo un error con la base de datos';
        res.status(500);
        let dataErr = {
            message: res.statusMessage,
            status: 500
        };
        res.render('landingPage', { dataErr });
    });
});

router.post('/signup', async function(req, res){
    const {name, email, password} = req.body;
    await UserList.signup(email, password, name)
    .then(result => {
        const {data, message, status, error} = result;
        res.statusMessage = message;
        res.status(status);
        if (error) {
            let dataErr = {
                message: message,
                status: status
            };
            res.render('landingPage', { dataErr });
        } else {
            res.render('aprendizaje', { data });
        }
    })
    .catch(err => {
        console.log('Login', err);
        let dataErr = {
            message: 'Hubo un error con la base de datos',
            status: 500
        };
        res.status(500);
        res.render('landingPage', { dataErr });
    });
});

router.get('/aprendizaje', async function(req,res){
    res.render('aprendizaje');
});

module.exports = router; 
