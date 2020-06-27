import { observable, computed, action } from "mobx";
import Axios from "axios";
import {Client} from "../stores/Client";


export class Company{
    @observable clients = []
    @observable filteredClients = []
    @observable owners = []
    @observable hottestCountry = ""

    @computed get clientsLen () {
        return this.clients.length
    }

    @action getClients = async() => {
        const temp = await Axios.get('http://localhost:3001/clients')
        this.clients = temp.data.map(c => new Client(c.id, c.name, c.email_add, c.email_type, c.country, c.employee, c.sold, c.firstContact))
    }

    formatDate = date => {
        let d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();
    
        if (month.length < 2) 
            month = '0' + month;
        if (day.length < 2) 
            day = '0' + day;
    
        return [year, month, day].join('-')
    }

    @action addClient = async (name, country, owner, emailAdd) => {
        let date = this.formatDate(new Date())
        let client = await Axios.post('http://localhost:3001/client', {name, country,  owner, emailAdd, date})
        client = client.data
        const newClient = new Client(client.clientID, name, emailAdd, "null", country, owner, 0, date)
        this.clients.push(newClient)
    }

    @action getOwners = async() => {
        const temp = await Axios.get(`http://localhost:3001/owners`)
        this.owners = temp.data
        // return temp.data
    }

    @action getHottestCountry = async () => {
        const temp = await Axios.get('http://localhost:3001/hottestCountry')
        this.hottestCountry = temp.data
        // return temp.data
    }

}
