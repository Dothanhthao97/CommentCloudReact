import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { Provider } from 'react-redux';
import store from './store/store.ts';
import { BrowserRouter,Route, Routes } from 'react-router-dom';


ReactDOM.createRoot(document.getElementById('workflowReact')).render(  
    <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Routes>
          <Route path="*" element={<App />} />
        </Routes> 
        </BrowserRouter>
      </Provider>
      </React.StrictMode>
);
