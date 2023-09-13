import React, { useState } from 'react';
import '../css/auth.css';
import pruebaApi from '../../api/pruebaApi';

export const RegisterScreen = () => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [error, setError] = useState('');

	const startRegister = async (name, email, password) => {
		try {
			const resp = await pruebaApi.post('/auth/crearUsuario', {
				name,
				email,
				password,
			});

			setError(resp.data.msg);

			localStorage.setItem('token', resp.data.token);
		} catch (error) {
			console.log(error);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		//validaciones
		if (name === '' || email === '' || password === '') {
			return console.log('todos los campos son obligatorios');
		}

		startRegister(name, email, password);
	};

	return (
		<div className="register-container">
			{/* mostrar error si es que hay */}
			<div className="form-container">
				{error ? <h3 className="errorStyle">{error}</h3> : ''}
				<h1>Registro</h1>
				<form onSubmit={handleSubmit}>
					<div className="input-container">
						<label>Nombre: </label>
						<input
							type="text"
							id="name"
							placeholder="Ingrese nombre"
							onChange={(e) => setName(e.target.value)}
						/>
					</div>

					<div className="input-container">
						<label htmlFor="">Correo Electronico: </label>
						<input
							type="email"
							id="email"
							placeholder="Ingrese nombre"
							onChange={(e) => setEmail(e.target.value)}
						/>
					</div>

					<div className="input-container">
						<label>Contraseña: </label>
						<input
							type="password"
							id="email"
							placeholder="Ingrese nombre"
							onChange={(e) => setPassword(e.target.value)}
						/>
					</div>

					<button type="submit">Registrarse</button>
				</form>
			</div>
		</div>
	);
};
