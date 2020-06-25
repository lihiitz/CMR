const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')

const getCountry = async function(country){
    let countryID = await sequelize.query(`SELECT id FROM Country WHERE name = '${country}'`)
    if (!countryID[0].length){
        countryID = await sequelize.query(`INSERT INTO Country VALUES(null, '${country}')`)
        countryID = countryID[0]
    }else{
        countryID = countryID[0][0].id
    }
    return countryID
}

router.put('/client/:id', async function(req, res){    
    const id = req.params.id
    const countryID = await getCountry(req.body.country)
    const clientID = await sequelize.query(`UPDATE Client SET name = '${req.body.fullName}', country = '${countryID}' WHERE id = ${id}`)
    res.send(clientID)
})

router.post('/clients', async function (req, res) {
    const obj = req.body
    const clientID = await sequelize.query(`INSERT INTO Client VALUES(null, '${obj.name}', '${obj.email}', ${obj.emailType}, ${obj.country}, ${obj.employee}, ${obj.sold}, '${obj.firstContact}')`)
    res.send(clientID[0])
})

router.get('/clients', async function (req, res) {
    const clients = await sequelize.query(`SELECT * FROM Client`)
    let clientsRes = []
    for (let client of clients[0]) {
        // clientsRes.push(finalClients(client))
        const country = await sequelize.query(`SELECT name FROM Country WHERE id = ${client.country}`)
        const emailType = await sequelize.query(`SELECT type FROM Email_type WHERE id = ${client.email_type}`)
        const owner = await sequelize.query(`SELECT name FROM Employee WHERE id = ${client.employee}`)
        const date = client.firstContact.slice(0, 10)
        const obj = {
            id: client.id,
            name: client.name,
            email_add: client.email_add,
            email_type: emailType[0][0].type,
            country: country[0][0].name,
            employee: owner[0][0].name,
            sold: client.sold,
            firstContact: date
        }
        clientsRes.push(obj)
    }

    res.send(clientsRes)
})

const finalClients = async function (client) {
    const country = await sequelize.query(`SELECT name FROM Country WHERE id = ${client.country}`)
    console.log(country);
    
    const emailType = await sequelize.query(`SELECT type FROM Email_type WHERE id = ${client.emailType}`)
    const owner = await sequelize.query(`SELECT name FROM Employee WHERE id = ${client.employee}`)
    const date = client.firstContact.slice(0, 10)
    const obj = {
        id: client.id,
        name: client.name,
        email_add: client.email_add,
        email_type: emailType,
        country: country,
        employee: owner,
        sold: client.sold,
        firstContact: date
    }
    return obj
}


module.exports = router