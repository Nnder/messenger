import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';
import MainProvider from './1_app/MainProvider.tsx';
import Navbar from './3_widget/Navbar/Navbar.tsx';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <MainProvider>
      <Navbar/>
    </MainProvider>
  </React.StrictMode>,
)
