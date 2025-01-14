
import './index.css'
import App from './App.jsx'
import * as React from "react";
import { RouterProvider } from "react-router-dom";
import {
    createBrowserRouter,
  } from "react-router-dom";
import * as ReactDOM from "react-dom/client";
import UserDetails from './Component/UserDetails.jsx';
import Update from './Component/Update.jsx';

const router = createBrowserRouter([
  {
    path:'/',
    element:<App></App>
  },
  {
    path:'/user-details/:id',
    element:<UserDetails></UserDetails>,
    loader:({params}) => fetch(`http://localhost:5000/details/${params.id}`)
    
  },
  {
    path:'/update/:id',
    element:<Update></Update>,
    loader:({params}) => fetch(`http://localhost:5000/details/${params.id}`)
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
