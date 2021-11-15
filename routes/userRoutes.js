const { Router } = require('express');
const router = Router();

router.get('/', async function(req,res){
    res.render('landingPage');
});

router.get('/aprendizaje', async function(req,res){
    res.render('landingPage');
});

router.get('/quizzes', async function(req,res){
    res.render('quizzes');
});

router.get('/flash-cards', async function(req,res){
    res.render('flash-cards');
});

module.exports = router; 
