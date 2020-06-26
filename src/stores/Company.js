import { observable, computed, action } from "mobx";
import Axios from "axios";
import {Client} from "../stores/Client";


export class Company{
    @observable clients = []
    @observable filteredClients = []
    // @observable owners = []

    @computed get clientsLen () {
        return this.clients.length
    }

    @action getOwners = async() => {
        const temp = await Axios.get(`http://localhost:3001/owners`)
        // this.owners = temp.data
        debugger
        return temp.data
    }

    @action getClients = async() => {
        const temp = await Axios.get('http://localhost:3001/clients')
        this.clients = temp.data.map(c => new Client(c.id, c.name, c.email_add, c.email_type, c.country, c.employee, c.sold, c.firstContact))
    }

    @action addClient = async (name, country, owner, email) => {
        let date = Date()
        date = date.slice(0, 10)
        let client = await Axios.post('http://localhost:3001/client', {name, country,  owner, email, date})
        client = client.data
        const newClient = new Client(client.clientID, name, email, "null", country, owner, 0, date)
        this.clients.push(newClient)
    }

}
