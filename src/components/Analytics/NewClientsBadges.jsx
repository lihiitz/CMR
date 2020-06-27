import React from 'react'
import { observer, inject } from 'mobx-react'
import { ListItem, ListItemAvatar, Avatar, ListItemText } from '@material-ui/core'

const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
]

const NewClientsBadges = inject("company")(observer((props) => {
    let currDate = new Date()
    const currMonth = currDate.getMonth() + 1
    const currYear = currDate.getFullYear()
    const clients = props.company.clients
    let newClients = clients.filter(c => {
        const month = parseInt(c.firstContact.slice(5, 7))
        const year = parseInt(c.firstContact.slice(0, 4))
        if (month === currMonth && year === currYear){
            return c
        }
    })
    newClients = newClients.length
    let explanationText = `New ${monthNames[currMonth]} Clients`

    return (
        <ListItem>
            <ListItemAvatar>
                <Avatar>
                    {/* <ImageIcon /> */}
                </Avatar>
            </ListItemAvatar>
            <ListItemText primary={newClients} secondary={explanationText} />
        </ListItem>
    )
}))

export default NewClientsBadges