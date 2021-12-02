const { Router } = require('express');
const router = Router();

const { QuizList } = require('./../models/quizzModel');
const { UserList } = require('./../models/userModel');

router.get('/', async function (req, res) {
  const { user } = req.query;
  QuizList.getQuizzes()
  .then(quizzes => {
    res.render('quizzes', { quizzes, user });
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

router.get('/preguntas/:quiz_id/:preguntaIdx', function(req,res) {
  const { user } = req.query;
  const { quiz_id } = req .params;
  const preguntaIdx = Number(req.params.preguntaIdx);
  QuizList.getQuiz(quiz_id)
  .then(quiz => {
    const pregunta = quiz.preguntas[preguntaIdx];
    res.status(200).render('quiz', { quiz, pregunta, user, preguntaIdx, respuesta: null, isLast: false });
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

router.post('/registrar_respuesta', function (req, res) {
  const { email, quiz } = req.query;
  const preguntaIdx = Number(req.query.preguntaIdx);
  const respuestaUser = Number(req.body.respuesta);
  UserList.updateAnswers(email, quiz, preguntaIdx, respuestaUser)
  .then(user => {
    QuizList.getQuiz(quiz)
    .then(quiz => {
      const pregunta = quiz.preguntas[preguntaIdx];
      const respuesta = pregunta.opcionCorrecta;
      const isLast = preguntaIdx + 1 === quiz.preguntas.length;
      res.status(200).render('quiz', { quiz, pregunta, user: email, preguntaIdx, respuesta, isLast, respuestaUser });
      // res.status(200).redirect(`/quizzes/${quiz}/${preguntaIdx + 1}?user=${email}`);
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

router.get('/resultados/:quiz_id/', async function(req,res) {
  const { user: email } = req.query;
  const { quiz_id } = req.params;
  const quiz = await QuizList.getQuiz(quiz_id);
  if (quiz instanceof Error) { 
    res.statusMessage = 'Hubo un error con la base de datos';
    res.status(500);
    let dataErr = {
      message: res.statusMessage,
      status: 500
    };
    return res.render('landingPage', { dataErr });
  }

  const user = await UserList.getUserWithEmail(email);
  if (user instanceof Error) { 
    res.statusMessage = 'Hubo un error con la base de datos';
    res.status(500);
    let dataErr = {
      message: res.statusMessage,
      status: 500
    };
    return res.render('landingPage', { dataErr });
  }

  const respuestasUsuario = user.quizzes.get(quiz_id);
  const respuestasCorrectas = quiz.preguntas.map(p => p.opcionCorrecta);

  let cantidadRespCorr = 0
  for(let i = 0; i < respuestasUsuario.length; i++){
    if(respuestasCorrectas[i] === respuestasUsuario[i]){
      cantidadRespCorr++;
    }
  }
  const puntajeObtenido = (100 / respuestasUsuario.length) * cantidadRespCorr;
  console.log(respuestasUsuario);
  console.log(respuestasCorrectas);
  return res.render('resultados', { puntajeObtenido });
  // const pregunta = quiz.preguntas[preguntaIdx];
  // res.status(200).render('quiz', { quiz, pregunta, user, preguntaIdx, respuesta: null, isLast: false });
});

// GET     /    Mostrar todos
// GET     /:id Mostrar uno
// POST    /    Crear uno
// PUT     /:id Editar uno
// DELETE  /:id Eliminar uno

module.exports = router; 
