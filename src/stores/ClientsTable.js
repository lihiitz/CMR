import { observable, action } from "mobx";

export class ClientsTable{

    @observable popup //{open: false, clientToUpdate: {}}
    @observable page
    @observable rowsPerPage


    constructor(popup, page, rowsPerPage){
        this.popup = popup
        this.page = page
        this.rowsPerPage = rowsPerPage
    }

    @action handleClick = val => {
        this.popup = val
    }

    @action handleUpdate = data => {
        this.popup.clientToUpdate.updateClient(data.name, data.surName, data.country)
        this.popup = {open: false, clientToUpdate: {}}
    }

    @action handleChangePage = (e, newPage) => {
        this.page = newPage
    }

    @action handleChangeRowsPerPage = e => {
        this.rowsPerPage = +e.target.value
        this.page = 0
    }
}

