const mongoose = require('mongoose');
mongoose.Promise = global.Promise; // Idk si es necesario

const quizSchema = mongoose.Schema({
	preguntas: {
		type: [{
        titulo: String,
        opciones: [String],
        opcionCorrecta: Number, 
    }],
		require: true
	},
	titulo: 			{type: String, require: true},
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = { Quiz };