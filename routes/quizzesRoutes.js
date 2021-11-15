const { Router } = require('express');
const router = Router();

router.get('/', async function(req,res){
  res.render('quizzes');
});

router.get('/:id', async function(req,res){
  const { id } = req.params;
  res.render('quizzes',);
});

module.exports = router; 
