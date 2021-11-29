const { Router } = require('express');
const router = Router();

const { Quiz } = require('./../models/quizzModel');

router.get('/', async function(req,res){
  res.render('quizzes');
});

router.get('/', async function(req,res) {
  const quizes = Quiz.find({});
  res.render('quizzes', { quizes });
});

router.get('/:pregunta_id/:user_id/:indice_pregunta', async function(req,res) {
  const { pregunta_id, user_id, pregunta } = req.params;
  const quiz = await Quiz.find({ _id: pregunta_id });
  res.render('quiz', { quiz, pregunta_id, user_id, pregunta });
});

router.post('/registrar_respuesta', async function(req,res) {
  const { pregunta_id, user_id, indice_pregunta, respuesta } = req.params;
  const usuario = await User.find({ _id: user_id });
  const quiz = await Quiz.find({ _id: pregunta_id });
  const quizUsuario = usuario.quizes.find(q => q.quiz_id === pregunta_id);
  quizUsuario[indice_pregunta] = respuesta;
  await usuario.save();

  if (indice_pregunta + 1 === quiz.preguntas.length) {
    res.redirect('resultados');
    return;
  }

  res.redirect(`quiz/${pregunta_id}/${user_id}/${indice_pregunta + 1}`);
});

// GET     /    Mostrar todos
// GET     /:id Mostrar uno
// POST    /    Crear uno
// PUT     /:id Editar uno
// DELETE  /:id Eliminar uno

module.exports = router; 
