import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, useRoutes, useLocation } from 'react-router-dom';

import Home from './components/Home';
import Layout from './Layout';
import TenderDetails from './components/TenderDetails'



// ScrollToTop component
const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);

  return null;
};

// AppRoutes component
const AppRoutes = () => {
  return useRoutes([
    {
      path: '/',
      element: <Layout />,
      children: [
        { path: '/', element: <Home /> },
        {path:"/tender/:id", element:<TenderDetails /> }

      ],
    },
  ]);
};

const App = () => {
  return (
    <Router >
      <ScrollToTop /> {/* Add ScrollToTop inside Router but outside Routes */}
      <div >
        <AppRoutes />
      </div>
    </Router>
  );
};

export default App;