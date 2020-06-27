import React from 'react'
import { observer, inject } from 'mobx-react'
import Badges from './Badges'
import Charts from './Charts'

const AnalyticsPage = inject("company")(observer((props) => {
    return(
        <div>
            <Badges />
            {/* <Charts /> */}
        </div>
    )
}))

export default AnalyticsPage