import React from 'react'
import { inject, observer } from 'mobx-react'
import Client from './Client'
import { TableBody } from '@material-ui/core'

const Clients = inject("company")(observer((props) => {
    const clients = props.company.filteredClients.length ? props.company.filteredClients : props.company.clients
    return (
        <TableBody>
            {clients.map(c => <Client key={c.id} client={c} click={props.click}/>)}
        </TableBody>
    )
}))

export default Clients