import { observable, computed, action } from "mobx";
import Axios from "axios";

export class Client{

    @observable id
    @observable name
    @observable emailAdd
    @observable emailType
    @observable country    
    @observable employeeId
    @observable sold
    @observable firstContact

    constructor(id, name, emailAdd, emailType, country, employee, sold, firstContact){
        this.id = id
        this.name = name
        this.emailType = emailType
        this.emailAdd = emailAdd
        this.country = country
        this.employee = employee
        this.sold = sold
        this.firstContact = firstContact
    }

    @action updateClient = async(name, surName, country) => {
        const fullName = name + " " + surName
        const temp = await Axios.put(`http://localhost:3001/client/${this.id}`, {fullName, country})
        this.name = fullName
        this.country = country
    }

    @action updateClientOwner = async (newOwnerName) => {
        const temp = await Axios.put(`http://localhost:3001/owner/${this.id}`, {ownerName: newOwnerName})
        this.employee = newOwnerName
    }

    @action updateClientEmailType = async (newType) => {
        const temp = await Axios.put(`http://localhost:3001/emailType/${this.id}`, {emailType: newType})
        this.emailType = newType
    }
        
    @action updateSold = async (sold) => {
        const temp = await Axios.put(`http://localhost:3001/sold/${this.id}`, {sold})
        this.sold = sold
    }
}

