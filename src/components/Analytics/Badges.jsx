import React from 'react'
import { observer, inject } from 'mobx-react'
import NewClientsBadges from './NewClientsBadges'
import EmailsSentBadges from './EmailsSentBadges'
import { makeStyles, List, Divider } from '@material-ui/core'
import OutStandingClientsBadges from './OutstandingClientsBadges'
import HottestCountryBadges from './HottestCountryBadges'

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
        maxWidth: 360,
        backgroundColor: theme.palette.background.paper,
    },
}))

const Badges = inject("company")(observer((props) => {
    const classes = useStyles()

    return (
        <List className={classes.root}>
            <NewClientsBadges />
            <Divider variant="inset" component="li" />
            <EmailsSentBadges />
            <Divider variant="inset" component="li" />
            <OutStandingClientsBadges />
            <Divider variant="inset" component="li" />
            <HottestCountryBadges />
        </List>
    )
}))

export default Badges