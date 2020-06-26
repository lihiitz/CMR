import React from 'react'
import { Card, CardContent, Typography, CardActions, Button, makeStyles, Input, Snackbar, FormControl } from '@material-ui/core';
import { inject, observer } from 'mobx-react';
import { useState } from 'react';

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

const AddClient = inject("company")(observer((props) => {
  let [open, setOpen] = useState(false)
  const classes = useStyles()
  const [client, setClient] = useState({
    fName: "",
    sName: "",
    country: "",
    owner: "",
    email : ""
  })

  const handleClose = (e, reason) => {
    if (reason === 'clickaway') {
      return
    }
    setOpen(false)
  }

  const addClientClick = function () {
    const name = client.fName + " " + client.sName
    props.company.addClient(name, client.country, client.owner, client.email)
  }

  const handleChange = function (e) {
    let prevClient = { ...client }
    prevClient[e.target.name] = e.target.value
    setClient(prevClient)
  }

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
          ADD CLIENT
        </Typography>
        <Input className={classes.margin}
          autoFocus
          margin="dense"
          name="fName"
          value={client.fName}
          placeholder="First name:"
          onChange={handleChange}
        />
        <Input className={classes.margin}
          autoFocus
          margin="dense"
          name="sName"
          value={client.sName}
          placeholder="Surname"
          onChange={handleChange}
        />
        <Input className={classes.margin}
          autoFocus
          margin="dense"
          name="country"
          value={client.country}
          placeholder="Country"
          onChange={handleChange}
        />
        <Input className={classes.margin}
          autoFocus
          margin="dense"
          name="owner"
          value={client.owner}
          placeholder="Owner"
          onChange={handleChange}
        />
          <Input className={classes.margin}
          autoFocus
          margin="dense"
          name="email"
          value={client.email}
          placeholder="Email address"
          onChange={handleChange}
        />
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


export default AddClient