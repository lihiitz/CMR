import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField, Input } from '@material-ui/core'

const UpdatePopup = inject("company")(observer((props) => {
    const [name, setName] = useState("")
    const [surName, setSurName] = useState("")
    const [country, setCountry] = useState("")
    
    const handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        if (name === 'setName') {
            setName(value)
        }else if (name === 'setSurName'){
            setSurName(value)
        }else{
            setCountry(value)
        }
    }
    return (
      <div>
        <Dialog open={props.open} onClose={() => {props.click(false)}} aria-labelledby="form-dialog-title">
          <DialogTitle id="form-dialog-title">Update</DialogTitle>
          <DialogContent>
            <Input
              autoFocus
              margin="dense"
              name="setName"
              value={name}
              placeholder="Name"
              onChange={handleInput}
              fullWidth
            />
            <Input
              autoFocus
              margin="dense"
              name="setSurName"
              value={surName}
              placeholder="surName"
              onChange={handleInput}
              fullWidth
            />
            <Input
              autoFocus
              margin="dense"
              name="setCountry"
              value={country}
              placeholder="Country"
              onChange={handleInput}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={() => {props.click({open: false, clientToUpdate: {}})}} color="primary">
              Cancel
            </Button>
            <Button onClick={() => {props.update({name, surName, country})}} color="primary">
              Update
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
}))

export default UpdatePopup