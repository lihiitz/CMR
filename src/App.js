import React, {useEffect } from 'react';
import './App.css';
import { observer, inject } from 'mobx-react'
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import ClientsPage from './components/Clients/ClientsPage';
import ActionsPage from './components/Actions/ActionsPage';
import {Client} from './stores/Client'

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
      <Route path="/clients" exact component={ClientsPage}/>
      <Route path="/actions" exact render={() => <ActionsPage/>}/>
    </Router>
  )
}))


export default App;
