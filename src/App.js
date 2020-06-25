import React, {useEffect } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClientsPage from './components/Clients/ClientsPage';


const App = inject('company')(observer((props) => {
  useEffect(() => {
    async function fetchData(){
      await props.company.getClients()
    }
    fetchData()
  }, [])

  return (
    <Router>
      <Navbar />
      <ClientsPage />
    </Router>
  )
}))


export default App;
