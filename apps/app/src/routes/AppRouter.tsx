import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Landing from '../features/Landing';
import InventoryInput from '../features/InventoryInput';
import InventoryInfo from '../features/InventoryInfo';
import Dashboard from '../features/Dashboard';

export const AppRoutes = () => (
  <Routes>
    <Route path="/" element={<Landing />} />
    <Route path="/inventory-input" element={<InventoryInput />} />
    <Route path="/inventory-info" element={<InventoryInfo />} />
    <Route path="/dashboard" element={<Dashboard />} />
  </Routes>
);
