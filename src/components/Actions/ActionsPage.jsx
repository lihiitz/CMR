import React from 'react'
import AddClient from './AddClient'
import { observer, inject } from 'mobx-react'
import UpdateClient from './UpdateClient'

const ActionsPage = inject("company")(observer((props) => {
    return(
        <div>
            <AddClient />
            <UpdateClient />
        </div>
    )
}))

export default ActionsPage