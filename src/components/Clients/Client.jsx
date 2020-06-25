import React from 'react'
import { inject, observer } from 'mobx-react'
import { TableRow, TableCell } from '@material-ui/core'

const Client = inject("company")(observer((props) => {
    const client = props.client

    const handleClick = function(){
        props.click({open: true, clientToUpdate: client})
    }
    const name = client.name.split(' ')
    return(
        <TableRow onDoubleClick={handleClick}>
            <TableCell component="th" scope="row">{name[0]}</TableCell>
            <TableCell align="right">{name[1]}</TableCell>
            <TableCell align="right">{client.country}</TableCell>
            <TableCell align="right">{client.firstContact}</TableCell>
            <TableCell align="right">{client.emailType}</TableCell>
            <TableCell align="right">{client.sold}</TableCell>
            <TableCell align="right">{client.employee}</TableCell>
        </TableRow>
    )
}))

export default Client