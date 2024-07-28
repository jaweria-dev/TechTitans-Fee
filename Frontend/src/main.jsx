import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import AuthProvider from './components/context/Context';
import { BrowserRouter } from 'react-router-dom';

ReactDOM.createRoot(document.getElementById('root')).render(
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
)
