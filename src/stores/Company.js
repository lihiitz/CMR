import { observable, computed, action } from "mobx";
import Axios from "axios";
import {Client} from "../stores/Client";


export class Company{
    @observable clients = []
    @observable filteredClients = []
    
    @computed get clientsLen () {
        return this.clients.length
    }

    @action getClients = async() => {
        const temp = await Axios.get('http://localhost:3001/clients')
        this.clients = temp.data.map(c => new Client(c.id, c.name, c.email_type, c.country, c.employee, c.sold, c.firstContact))
    }
}
