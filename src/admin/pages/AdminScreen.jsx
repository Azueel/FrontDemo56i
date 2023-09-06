import React from 'react';

import { TablaUsuario } from '../components/TablaUsuario';
import { TablaProducto } from '../components/TablaProducto';

export const AdminScreen = () => {
	return (
		<div>
			<h1 className="text-center mt-3">Admin Page</h1>

			<h2>Usuarios</h2>

			<TablaUsuario />

			<h2>Productos</h2>

			<TablaProducto />
		</div>
	);
};
