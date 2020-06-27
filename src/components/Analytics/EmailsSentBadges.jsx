import React from 'react'
import { observer, inject } from 'mobx-react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'



const EmailsSentBadges = inject("company")(observer((props) => {

    const newClients = props.company.clients.filter(c => c.emailType !== null)
    const explanationText = `Emails sent`

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {/* <ImageIcon /> */}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={newClients.length} secondary={explanationText} />
        </ListItem>
    )
}))

export default EmailsSentBadges