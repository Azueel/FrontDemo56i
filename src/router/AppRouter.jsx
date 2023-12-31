import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginScreen } from '../auth/pages/LoginScreen';
import { RegisterScreen } from '../auth/pages/RegisterScreen';
import { AdminScreen } from '../admin/pages/AdminScreen';

export const AppRouter = () => {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/login" element={<LoginScreen />} />
				<Route path="/" element={<RegisterScreen />} />
				<Route path="/admin" element={<AdminScreen />} />
			</Routes>
		</BrowserRouter>
	);
};
