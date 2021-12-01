const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Idk si es necesario

const preguntaSchema = mongoose.Schema({
	titulo: {type: String, require: true},
	opciones: {type: [String], require: true},
	opcionCorrecta: {type: Number, require: true}
});

const quizSchema = mongoose.Schema({
	preguntas: 	{ type: [preguntaSchema],require: true },
	// quizes: 		{ type: [mongoose.Schema.Types.Mixed], require: true }
	titulo: 		{type: String, require: true},
});

const Quiz = mongoose.model('Quiz', quizSchema);

const QuizList = {
	getQuizzes: () => {
		return Quiz.find()
			.then(quizzes => {
				return quizzes;
			})
			.catch(err => {
				throw Error(err);
			});
	},
	getQuiz: (id) => {
		return Quiz.findOne({_id: id})
			.then(quiz => {
				return quiz;
			})
			.catch(err => {
				throw Error(err);
			});
	}
}

module.exports = { QuizList };