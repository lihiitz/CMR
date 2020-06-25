import React from 'react'
import { observer, inject } from 'mobx-react'
import { Input, MenuItem, Select, makeStyles } from '@material-ui/core'
import { useState } from 'react'

const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(1),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
  }))

const SearchClient = inject("company")(observer((props) => {

    const classes = useStyles
    const [search, setSearch] = useState("")
    const [select, setSelect] = useState("name")
    const handleSearch = function (e) {
        let temp = [...props.company.clients]
        if (e.target.value !== ""){
            temp = temp.filter(c => c[select].toLowerCase().includes(e.target.value.toLowerCase()))
        }else{
            temp = []
        }
        setSearch(e.target.value.toLowerCase())
        props.company.filteredClients = [...temp]
    }

    const handleSelect = function (e) {
        setSelect(e.target.value)
    }

    return (
        <div>
            <Input
                autoFocus
                margin="dense"
                name="search"
                value={search}
                placeholder="search"
                onChange={handleSearch}
            />

            <Select
                value={select}
                onChange={handleSelect}
                displayEmpty
                className={classes.selectEmpty}
                inputProps={{ 'aria-label': 'Without label' }}
            >
                <MenuItem value="name"><em>Name</em></MenuItem>
                <MenuItem value="country">Country</MenuItem>
                <MenuItem value="employee">Owner</MenuItem>
            </Select>
        </div>
    )
}))

export default SearchClient