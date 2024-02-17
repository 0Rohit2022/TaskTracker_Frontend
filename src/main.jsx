import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './main.css'
import { createContext } from 'react'



export const Context = createContext({isAuthenticated: false});

const Appwrapper = () => {
  const [isAuthenticated, setAuthenticated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState({});
  return (
    <Context.Provider value={{user, setUser,isAuthenticated,setAuthenticated,loading,setLoading}}>
      <App />
    </Context.Provider>
  )
}

https: ReactDOM.createRoot(document.getElementById("root")).render(
  
  <Appwrapper />
);
