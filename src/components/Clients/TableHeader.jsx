import React from 'react'
import { inject, observer } from 'mobx-react'
import { TableHead, withStyles, TableRow, TableCell } from '@material-ui/core'

const StyledTableCell = withStyles((theme) => ({
    head: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    body: {
        fontSize: 14,
    },
}))(TableCell)

const TableHeader = inject("company")(observer((props) => {
    return (
        <TableHead>
            <TableRow>
                <StyledTableCell>Name</StyledTableCell>
                <StyledTableCell align="right">Surname</StyledTableCell>
                <StyledTableCell align="right">Country</StyledTableCell>
                <StyledTableCell align="right">First Contact</StyledTableCell>
                <StyledTableCell align="right">Email</StyledTableCell>
                <StyledTableCell align="right">Sold</StyledTableCell>
                <StyledTableCell align="right">Owner</StyledTableCell>
            </TableRow>
        </TableHead>
    )
}))

export default TableHeader