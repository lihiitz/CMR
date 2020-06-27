import React from 'react'
import { Card, CardContent, Typography, CardActions, Button, makeStyles, Input, Snackbar, FormControl, MenuItem, Select, Paper, Grid } from '@material-ui/core';
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
    const classes = useStyles()
    const company = props.company
    let [open, setOpen] = useState(false)
    const [clientName, setClientName] = useState("")
    const [select, setSelect] = useState({
        owner : "",
        emailType : ""
    })

    useEffect(() => {
        async function fetchData() {
           await company.getOwners()
           setSelect({owner : company.owners[0].name, emailType : "A"})
        }
        fetchData()
    }, [])

    const handleClose = (e, reason) => {
        if (reason === 'clickaway') {
            return
        }
        setOpen(false)
    }

    const transferOwnerClick = () => {
        const client = company.clients.find(c => c.name.toLowerCase() === clientName.toLocaleLowerCase())
        if (!client){
            alert("invalid client name. please insert full name")
        }else{
            client.updateClientOwner(select.owner)
        }
    }

    const saleClick = () => {
        const client = company.clients.find(c => c.name.toLowerCase() === clientName.toLocaleLowerCase())
        if (!client){
            alert("invalid client name. please insert full name")
        }else{
            client.updateSold(1)
        }
    }

    const emailUpdateClick = () => {
        const client = company.clients.find(c => c.name.toLowerCase() === clientName.toLocaleLowerCase())
        if (!client){
            alert("invalid client name. please insert full name")
        }else{
            client.updateClientEmailType(select.emailType)
        }
    }

    const handleChange = function (e) {
        setClientName(e.target.value)
    }

    const handleSelect = function (e) {
        let temp = {...select}
        temp[e.target.name] = e.target.value
        setSelect(temp)
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
                    value={select.owner}
                    name="owner"
                    onChange={handleSelect}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    {company.owners.map(o => (
                        <MenuItem value={`${o.name}`}>{o.name}</MenuItem>
                    ))}
                </Select>
                <Button variant="contained" color="secondary" onClick={transferOwnerClick}>TRANSFER</Button>
<br></br>
Update Email Type:
        <Select
                    value={select.emailType}
                    name="emailType"
                    onChange={handleSelect}
                    displayEmpty
                    className={classes.selectEmpty}
                    inputProps={{ 'aria-label': 'Without label' }}
                >
                    <MenuItem value="A"><em>A</em></MenuItem>
                    <MenuItem value="B">B</MenuItem>
                    <MenuItem value="C">C</MenuItem>
                    <MenuItem value="D">D</MenuItem>
                    <MenuItem value="null">null</MenuItem>

                </Select>
                <Button variant="contained" color="secondary" onClick={emailUpdateClick}>SEND</Button>
<br></br>
declare sale!
<Button variant="contained" color="secondary" onClick={saleClick}>DECLARE</Button>

            </CardContent>
        </Card>
    )
}))


export default UpdateClient