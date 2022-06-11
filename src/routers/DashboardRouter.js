import React from 'react';
import {
  Routes, Route
} from 'react-router-dom';
import { Home } from "../components/Home"

export const DashboardRouter = () => {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path='*' element={<Home to="/" />} />
      </Routes>
    </div>
  )
}
