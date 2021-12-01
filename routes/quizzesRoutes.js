const { Router } = require('express');
const router = Router();

const { QuizList } = require('./../models/quizzModel');
const { UserList } = require('./../models/userModel');

router.get('/', async function(req,res) {
  QuizList.getQuizzes()
  .then(quizzes => {
    res.render('quizzes', { quizzes });
  })
  .catch(err => {
    res.statusMessage = 'Hubo un error con la base de datos';
    res.status(500);
    let dataErr = {
      message: res.statusMessage,
      status: 500
    };
    res.status(200).render('landingPage', { dataErr });
  });
});

router.get('/:quiz_id/:pregunta', function(req,res) {
  const { quiz_id, pregunta } = req.params;
  QuizList.getQuiz(quiz_id)
  .then(quiz => {
    res.status(200).render('quiz', { quiz, pregunta });
  })
  .catch(err => {
    res.statusMessage = 'Hubo un error con la base de datos';
    res.status(500);
    let dataErr = {
      message: res.statusMessage,
      status: 500
    };
    res.render('landingPage', { dataErr });
  });
});

router.post('/registrar_respuesta', function(req, res) {
  const { email, quiz_id, indice_pregunta, respuesta } = req.body;
  UserList.updateAnswers(email, quiz_id, indice_pregunta, respuesta)
  .then(user => {
    QuizList.getQuiz(quiz_id)
    .then(quiz => {
      // res.status(200).render('quiz', { quiz, indice_pregunta });
      res.status(200).redirect(`/quizzes/${quiz_id}/${indice_pregunta + 1}`, { email });
    })
    .catch(err => {
      console.log('registrar_respuesta: error en el quiz')
      res.statusMessage = 'Hubo un error con la base de datos';
      res.status(500);
      let dataErr = {
        message: res.statusMessage,
        status: 500
      };
      res.render('aprendizaje', { dataErr });
    });
  })
  .catch(err => {
    console.log('registrar_respuesta: error en el usuario', err);
    res.statusMessage = 'Hubo un error con la base de datos';
    res.status(500);
    let dataErr = {
      message: res.statusMessage,
      status: 500
    };
    res.render('aprendizaje', { dataErr });
  });

  
});

// GET     /    Mostrar todos
// GET     /:id Mostrar uno
// POST    /    Crear uno
// PUT     /:id Editar uno
// DELETE  /:id Eliminar uno

module.exports = router; 
