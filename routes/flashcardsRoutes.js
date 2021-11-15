const { Router } = require('express');
const router = Router();

router.get('/', async function(req,res){
  res.render('flash-cards');
});

module.exports = router; 
