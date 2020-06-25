import React from 'react'
import { inject, observer } from 'mobx-react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, makeStyles, withStyles, Grid } from '@material-ui/core';
import Clients from './Clients';
import TableHeader from './TableHeader';
import { useState } from 'react';
import UpdatePopup from './UpdatePopup';

const useStyles = makeStyles({
    table: {
        minWidth: 650,
    },
})

const ClientsTable = inject("company")(observer((props) => {
    const [popup, setPopup] = useState({ open: false, clientToUpdate: {} })
    const handleClick = (val) => {
      setPopup(val)
    }

    const handleUpdate = function(data){
        popup.clientToUpdate.updateClient(data.name, data.surName, data.country)
        setPopup({open: false, clientToUpdate: {}})
    }
    const classes = useStyles()

    return(
        <TableContainer component={Paper}>
            <UpdatePopup click={handleClick} update={handleUpdate} open={popup.open}/>
            <Table className={classes.table}>
                <TableHeader />
                <Clients click={handleClick}/>
            </Table>
        </TableContainer>

    )
}))

export default ClientsTable