import React from 'react'
import { Card, CardContent, Typography, CardActions, Button, makeStyles, Input, Snackbar, FormControl, MenuItem, Select } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useState } from 'react';
import { useEffect } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        minWidth: 275,
    },
    bullet: {
        display: 'inline-block',
        margin: '0 2px',
        transform: 'scale(0.8)',
    },
    title: {
        fontSize: 14,
    },
    pos: {
        marginBottom: 12,
    },
    margin: {
        margin: theme.spacing(1),
    },
}))

const UpdateClient = inject("company")(observer((props) => {
    let owners = []
    useEffect(() => {
        async function fetchData(){
          owners = await props.company.getOwners()
        }
        fetchData()
        // debugger
      },[])

    // debugger
    let [open, setOpen] = useState(false)
    const classes = useStyles()
    const [clientName, setClientName] = useState("")

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const addClientClick = function () {
        // const name = client.fName + " " + client.sName
        // props.company.addClient(name, client.country, client.owner, client.email)
    }

    const handleChange = function (e) {
        setClientName(e.target.value)
    }

    return (
        <Card className={classes.root} variant="outlined">
            <CardContent>
                <Typography className={classes.title} color="textSecondary" gutterBottom>
                    UPDATE
        </Typography>
                <Input className={classes.margin}
                    autoFocus
                    margin="dense"
                    name="clientName"
                    value={clientName}
                    placeholder="Client Name:"
                    onChange={handleChange}
                />
                <br></br>
        Transfer ownership to
        <Select
                    value={""}
                    onChange={""}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {owners.map(o => (
                    <MenuItem value={`{${o}}`}>{o}</MenuItem>
                    ))}
                </Select>

            </CardContent>
            <CardActions>
                <FormControl className={classes.margin}>
                    <Snackbar
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        open={open}
                        autoHideDuration={2000}
                        onClose={handleClose}
                        message="operation completed"
                    />
                    <Button variant="contained" color="secondary" onClick={addClientClick}>Add New Client</Button>
                </FormControl>
            </CardActions>
        </Card>
    )
}))


export default UpdateClient