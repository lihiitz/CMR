import React from 'react'
import { inject, observer } from 'mobx-react'
import { TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Paper, makeStyles, withStyles, Grid, TablePagination } from '@material-ui/core';
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
    const [page, setPage] = useState(0)
    const [rowsPerPage, setRowsPerPage] = useState(10)
    const clients = props.company.filteredClients.length ? props.company.filteredClients : props.company.clients
    const classes = useStyles()

    const handleClick = (val) => {
        setPopup(val)
    }

    const handleUpdate = function (data) {
        popup.clientToUpdate.updateClient(data.name, data.surName, data.country)
        setPopup({ open: false, clientToUpdate: {} })
    }

    const handleChangePage = (e, newPage) => {
        setPage(newPage)
    }
    const handleChangeRowsPerPage = (e) => {
        setRowsPerPage(+e.target.value)
        setPage(0)
    }

    return (
        <Paper>
            <TableContainer component={Paper}>
                <UpdatePopup click={handleClick} update={handleUpdate} open={popup.open} />
                <Table className={classes.table}>
                    <TableHeader />
                    <Clients page={page} rowsPerPage={rowsPerPage} click={handleClick} />
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[10, 25, 100]}
                component="div"
                count={clients.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onChangePage={handleChangePage}
                onChangeRowsPerPage={handleChangeRowsPerPage}
            />
        </Paper>
    )
}))

export default ClientsTable