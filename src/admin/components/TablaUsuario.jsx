import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import pruebaApi from '../../api/pruebaApi';
export const TablaUsuario = () => {
	const [cargarUsuarios, setCargarUsuarios] = useState([]);

	const cargarUser = async () => {
		try {
			const resp = await pruebaApi.get('/admin/cargarUsuario');

			setCargarUsuarios(resp.data.usuarios);
		} catch (error) {
			console.log(error);
		}
	};

	useEffect(() => {
		cargarUser();
	}, []);
	return (
		<Table striped bordered hover variant="dark">
			<thead>
				<tr>
					<th>#ID</th>
					<th>Nombre</th>
					<th>Email</th>
				</tr>
			</thead>

			<tbody>
				{cargarUsuarios.map((usuario) => {
					return (
						<tr key={usuario._id}>
							<td>{usuario._id}</td>
							<td>{usuario.name}</td>
							<td>{usuario.email}</td>
						</tr>
					);
				})}
			</tbody>
		</Table>
	);
};
