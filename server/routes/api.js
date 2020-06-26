const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')

const getCountry = async function (country) {
    let countryID = await sequelize.query(`SELECT id FROM Country WHERE name = '${country}'`)
    if (!countryID[0].length) {
        countryID = await sequelize.query(`INSERT INTO Country VALUES(null, '${country}')`)
        countryID = countryID[0]
    } else {
        countryID = countryID[0][0].id
    }
    return countryID
}

const getOwner = async function (employee) {
    let ownerID = await sequelize.query(`SELECT id FROM Employee WHERE name = '${employee}'`)
    if (!ownerID[0].length) {
        ownerID = await sequelize.query(`INSERT INTO Employee VALUES(null, '${employee}')`)
        ownerID = ownerID[0]
    } else {
        ownerID = ownerID[0][0].id
    }
    return ownerID
}

router.get('/owners', async function(req, res){
    let owners = await sequelize.query(`SELECT name FROM Employee`)
    return owners[0]
})

router.put('/client/:id', async function (req, res) {
    const id = req.params.id
    const countryID = await getCountry(req.body.country)
    const clientID = await sequelize.query(`UPDATE Client SET name = '${req.body.fullName}', country = '${countryID}' WHERE id = ${id}`)
    res.send(clientID)
})

router.post('/client', async function (req, res) {    
    const obj = req.body
    const countryID = await getCountry(obj.country)
    const ownerID = await getOwner(obj.owner)
    const clientID = await sequelize.query(`INSERT INTO Client VALUES(null, '${obj.name}', '${obj.email}', null, ${countryID}, ${ownerID}, 0, '${obj.date}')`)
    res.send({clientID: clientID[0], countryID, ownerID})
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
            email_type: emailType[0][0] ? emailType[0][0].type : null,
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
    return obj
}


module.exports = router