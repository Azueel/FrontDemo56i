import React, { useEffect, useState } from 'react';
import { Table } from 'react-bootstrap';
import pruebaApi from '../../api/pruebaApi';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';

export const TablaProducto = () => {
	const [cargarProductos, setCargarProductos] = useState([]);
	const [show, setShow] = useState(false);
	const [name, setName] = useState('');
	const [precio, setPrecio] = useState('');
	const [descripcion, setDescripcion] = useState('');
	const [productoEditarSeleccionado, setProductoEditarSeleccionado] = useState({});

	const [showEditar, setShowEditar] = useState(false);

	//Funcion para traer todos los productos de la base de datos
	const cargarProduct = async () => {
		try {
			const resp = await pruebaApi.get('/admin/cargarProducto');

			setCargarProductos(resp.data.productos);
		} catch (error) {
			console.log(error);
		}
	};

	//funciones para cerrar y abrir el modal
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

	//funcion para enviar los datos del producto y guardarlo en la base de datos
	const guardarProductoDB = async (name, precio, descripcion) => {
		try {
			const resp = await pruebaApi.post('/admin/new', {
				name,
				precio,
				descripcion,
			});

			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	//funcion para ejecutar el submit del formulario para crear producto
	const handleSubmit = (e) => {
		e.preventDefault();
		//van las validaciones
		if (name === '' || precio === '' || descripcion === '') {
			return console.log('todos los campos son obligatorios');
		} else if (precio < 0) {
			return console.log('el precio debe ser mayor a 0');
		}

		//estan listos para enviar

		guardarProductoDB(name, precio, descripcion);

		setName('');
		setPrecio('');
		setDescripcion('');
	};

	//Funcion para eliminar Productos
	const eliminarProductoClick = async (id) => {
		try {
			const resp = await pruebaApi.delete(`/admin/eliminar/${id}`);
			console.log(resp);
		} catch (error) {
			console.log(error);
		}
	};

	//funcion para guardar los datos del producto a editar y abrir el modal

	const editarProducto = (producto) => {
		setShowEditar(true);

		setProductoEditarSeleccionado(producto);
	};

	//funcion para editar Productos
	const handleSubmitEditar = (e) => {
		e.preventDefault();
		console.log('producto Editar');
	};

	useEffect(() => {
		cargarProduct();
	}, []);

	return (
		<>
			<div className="w-100 d-flex justify-content-end">
				<Button className="m-3 p-2" variant="primary" onClick={handleShow}>
					Agregar Producto
				</Button>
			</div>

			{/* Modal para crear producto */}
			<Modal show={show} onHide={handleClose}>
				<Modal.Header closeButton>
					<Modal.Title>Crear Producto</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmit}>
					<Modal.Body>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Nombre del producto</Form.Label>
							<Form.Control type="text" onChange={(e) => setName(e.target.value)} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Precio</Form.Label>
							<Form.Control
								type="number"
								onChange={(e) => setPrecio(e.target.value)}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>descripcion</Form.Label>
							<Form.Control
								type="text"
								onChange={(e) => setDescripcion(e.target.value)}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={handleClose}>
							cerrar
						</Button>
						<Button type="submit" variant="primary" onClick={handleClose}>
							Guardar cambios
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/* ModalEditar */}
			<Modal show={showEditar}>
				<Modal.Header closeButton>
					<Modal.Title>Editar Producto</Modal.Title>
				</Modal.Header>
				<Form onSubmit={handleSubmitEditar}>
					<Modal.Body>
						<Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
							<Form.Label>Nombre del producto</Form.Label>
							<Form.Control type="text" value={productoEditarSeleccionado.name} />
						</Form.Group>
						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>Precio</Form.Label>
							<Form.Control
								type="number"
								value={productoEditarSeleccionado.precio}
							/>
						</Form.Group>

						<Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
							<Form.Label>descripcion</Form.Label>
							<Form.Control
								type="text"
								value={productoEditarSeleccionado.descripcion}
							/>
						</Form.Group>
					</Modal.Body>
					<Modal.Footer>
						<Button variant="secondary" onClick={() => setShowEditar(false)}>
							cerrar
						</Button>
						<Button
							type="submit"
							variant="primary"
							onClick={() => setShowEditar(false)}
						>
							Guardar cambios
						</Button>
					</Modal.Footer>
				</Form>
			</Modal>

			{/* Tabla para cargar Usuarios */}
			<Table striped bordered hover variant="dark">
				<thead>
					<tr>
						<th>#ID</th>
						<th>Nombre Producto</th>
						<th>Precio</th>
						<th>descripcion</th>
						<th>Editar</th>
						<th>Eliminar</th>
					</tr>
				</thead>

				<tbody>
					{cargarProductos.map((producto) => {
						return (
							<tr key={producto._id}>
								<td>{producto._id}</td>
								<td>{producto.name}</td>
								<td>{producto.precio}</td>
								<td>{producto.descripcion}</td>
								<td>
									<button onClick={() => editarProducto(producto)}>Editar</button>
								</td>
								<td>
									<button onClick={() => eliminarProductoClick(producto._id)}>
										Eliminar
									</button>
								</td>
							</tr>
						);
					})}
				</tbody>
			</Table>
		</>
	);
};
