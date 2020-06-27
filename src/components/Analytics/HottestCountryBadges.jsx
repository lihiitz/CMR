import React, { useEffect } from 'react'
import { observer, inject } from 'mobx-react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'
import { useState } from 'react'



const HottestCountryBadges = inject("company")(observer((props) => {
    const company = props.company
    const [country, setCountry] = useState("")
    const explanationText = `Hottest Country`

    useEffect(() => {
        async function fetchData() {
            await company.getHottestCountry()
            setCountry(company.hottestCountry)
        }
        fetchData()
    }, [])

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {/* <ImageIcon /> */}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={country} secondary={explanationText} />
        </ListItem>
    )
}))

export default HottestCountryBadges