import React from 'react'
import { observer, inject } from 'mobx-react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'



const OutStandingClientsBadges = inject("company")(observer((props) => {

    const outStandingClients = props.company.clients.filter(c => c.sold === 0)
    const explanationText = `Outstanding Clients`

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {/* <ImageIcon /> */}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={outStandingClients.length} secondary={explanationText} />
        </ListItem>
    )
}))

export default OutStandingClientsBadges