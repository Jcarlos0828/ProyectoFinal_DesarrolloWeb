const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const answersSchema = mongoose.Schema({
	quiz_id: { type: mongoose.Schema.Types.ObjectId, required: true },
	respuestas: { type: [Number], required: true }
});

const userSchema = mongoose.Schema({
	name: 			{ type: String, require: true },
	email: 			{ type: String, require: true },
	password: 	{ type: String, require: true },
	quizzes: 		{ type: [answersSchema], require: true }
	// quizes: 		{ type: [mongoose.Schema.Types.Mixed], require: true }
	
});

const User = mongoose.model('User', userSchema);

const UserList = {
	getUsers: () => {
		return User.find()
			.then(users => {
				return users;
			})
			.catch(err => {
				throw Error(err);
			});
	},
	getUser: (id) => {
		return User.findOne({ _id: id })
			.then(user => {
				return user;
			})
			.catch(err => {
				throw Error(err);
			});
	},
	updateAnswers: async (email, quizID, indiceRespuesta, respuesta) => {
		console.log('email', email);
		return User.findOne({ email })
			.then(async user => {
				user.quizzes.forEach(quiz => {
					if (quiz.quiz_id == quizID) {
						quiz.respuestas[indiceRespuesta] = respuesta;
					}
				});
				console.log('antes del user.save()')
				await user.save();
				return user;
			})
			.catch(err => {
				throw Error(err);
			});
	},
	login: (email, password) => {
		return User.findOne({ email })
		.then(user => {
			let result = {};
			if (user != undefined) {
				if (user.password == password) {
					result['message'] = 'Inicio de sesión exitosa';
					result['status'] = 201;
					result['error'] = false;
					result['data'] = {
						name:  user.name,
						email: user.email
					};
				} else {
					result['message'] = 'Mala combinación de usuario y contraseña';
					result['status'] = 402;
					result['error'] = true;
				}
			} else {
				result['message'] = 'Usuario no encontrado';
				result['status'] = 404;
				result['error'] = true;
			}
			return result;
		})
		.catch(err => {
			throw Error(err);
		});
	},
	signup: async (email, password, name) => {
		return User.findOne({ email })
		.then(async user => {
			let result = {};
			
			if (user == undefined) {
				let newUser = { email, password, name };
				await User.create(newUser)
					.then(user => {
						result['message'] = 'Usuario registrado exitosamente';
						result['status'] = 201;
						result['data'] = newUser
						result['error'] = false;
					})
					.catch(err => {
						result['message'] = 'Error DB';
						result['status'] = 500;
						result['error'] = true;
						throw Error(err);
					});
			} else {
				result['message'] = 'Correo ya existente';
				result['status'] = 408;
				result['error'] = true;
			}
			return result;
		})
		.catch(err => {
			throw Error(err);
		});
	}
}

module.exports = { UserList };
