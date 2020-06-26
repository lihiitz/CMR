import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import Client from './Client'
import { TableBody } from '@material-ui/core'

const Clients = inject("company")(observer((props) => {
    const clients = props.company.filteredClients.length ? props.company.filteredClients : props.company.clients
    return (
        <TableBody>
            {clients.slice(props.page * props.rowsPerPage, props.page * props.rowsPerPage + props.rowsPerPage).map((row) => {
                return(
                    <Client key={row.id} client={row} click={props.click}/>
                )
            })}
        </TableBody>
    )
}))

export default Clients