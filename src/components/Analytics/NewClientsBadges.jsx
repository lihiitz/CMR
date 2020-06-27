import React from 'react'
import { observer, inject } from 'mobx-react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'



const NewClientsBadges = inject("company")(observer((props) => {
    const currentMonth = Date()/////
    const currentYear = Date()/////
    const clients = props.company.clients
    // let newClients = clients.filter(c => c.firstContact === currentMonth && currentYear)/////
    // newClients = newClients.length
    let explanationText = `New ${currentMonth} Clients`

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {/* <ImageIcon /> */}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary="Photos" secondary="Jan 9, 2014" />
        </ListItem>
    )
}))

export default NewClientsBadges