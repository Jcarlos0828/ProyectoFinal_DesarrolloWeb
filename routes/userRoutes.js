const { Router } = require('express');
const router = Router();

const { UserList } = require('./../models/userModel');
const { QuizList } = require('./../models/quizzModel');

router.get('/', async function (req, res) {
    function printShido() {
        console.log("Jesse No MAMES!!");
    }
    res.render('landingPage', { dataErr: '', printShido });
});

router.get('/users/:email', async function (req, res) {
  const { email } = req.params;
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
    
    const quizzesModel = await QuizList.getQuizzes();
    if (quizzesModel instanceof Error) { 
        res.statusMessage = 'Hubo un error con la base de datos';
        res.status(500);
        let dataErr = {
        message: res.statusMessage,
        status: 500
        };
        return res.render('landingPage', { dataErr });
    }

    const quizzes = [];
    for (let [quiz_id, respuestasUsuario] of user.quizzes) {
        const quizModel = quizzesModel.find(q => q._id.toString() === quiz_id);
        if (!quizModel) continue;
        const respuestasCorrectas = quizModel.preguntas.map(p => p.opcionCorrecta);
        let puntaje = 0;
        respuestasUsuario.forEach((rU, idx) => {
            if (respuestasCorrectas[idx] === rU) puntaje += 1;
        });
        puntaje = (puntaje / respuestasCorrectas.length) * 100;
        quizzes.push({
            titulo: quizModel.titulo,
            puntaje,
            maximo: respuestasCorrectas.length
        })
    }

    res.render('userQuizzes', { user, quizzes });
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
