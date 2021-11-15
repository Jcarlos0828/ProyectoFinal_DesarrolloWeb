const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

const userSchema = mongoose.Schema({
	name: 			{type: String, require: true},
	email: 			{type: String, require: true},
	password: 	{type: String, require: true}
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
	login: (email, password) => {
		return User.findOne({ email })
		.then(user => {
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
	}
}

module.exports = { UserList };
