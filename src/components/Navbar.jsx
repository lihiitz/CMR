import React from 'react'
import { Link } from 'react-router-dom'

const Navbar = function(){

    return(
        <div>
            <Link to="/clients">Clients</Link>
            <br></br>
            <Link to="/actions">Actions</Link>
            <br></br>
            <Link to="/analytics">Analytics</Link>
        </div>
    )
}

export default Navbar