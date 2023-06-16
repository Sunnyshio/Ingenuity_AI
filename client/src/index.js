import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import Login from './Pages/Login.jsx';
import Home from './Pages/Home.jsx';
import Test from './Pages/Test.jsx';
import SmartReview from './Pages/SmartReview.jsx';
import Chat from './Pages/Chat.jsx';
import Signup from './Pages/Signup.jsx'
import SamplePDF from './components/PDFviewer'

import {
    createBrowserRouter,
    RouterProvider,
  } from "react-router-dom";


  const router = createBrowserRouter([
    {
      path: "/",
      element: <App />,
    },
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "home",
      element: <Home />,
    },
    {
      path: "test",
      element: <Test />
    },
    {
      path: "smartreview",
      element: <SmartReview />,
    },
    {
      path: "chat",
      element: <Chat />,
    },
    {
      path: "pdfviewer",
      element: <SamplePDF />
    },
    {
      path: "signup",
      element: <Signup />
    }

    ]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render (
    <RouterProvider router={router} />
);
