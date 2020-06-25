import React from 'react'
import { inject, observer } from 'mobx-react'
import ClientsTable from './ClientsTable'
import SearchClient from './SearchClient';

const ClientsPage = inject("company")(observer((props) => {
    return(
        <div>
            <SearchClient />
            <ClientsTable />
        </div>
    )
}))

export default ClientsPage