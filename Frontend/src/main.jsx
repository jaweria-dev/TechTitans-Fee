import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import AuthProvider from './components/context/Context';
import { BrowserRouter } from 'react-router-dom';
import { SearchProvider } from "./components/context/searchContext";

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
  <SearchProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SearchProvider>
</AuthProvider>
)
