import React from 'react';
import ReactDOM from 'react-dom/client';
import {  RouterProvider, createBrowserRouter } from "react-router-dom";
import './index.css';
import './App.css';
import Home from './pages/Home';
import Employees, { loader as loaderEmployee } from './pages/Employees';
import ListEmployees from './pages/ListEmployees';

// Importing the Bootstrap CSS
import 'bootstrap/dist/css/bootstrap.min.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />,
    children: [
      {
        children: [
          {
            path: "listEmployees",
            element: <ListEmployees />,
          },
          {
            path: "employees",
            element: <Employees />,
          },
          {
            path: "employees/:employeeId",
            element: <Employees />,
            loader: loaderEmployee,
          },
        ],
      }]
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
)
