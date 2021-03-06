const express = require('express')
const router = express.Router()
const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')

const getCountryName = async function(countryId){
    let countryName = await sequelize.query(`SELECT name FROM Country WHERE id = ${countryId}`)
    if (countryName[0].length){
        return countryName[0][0].name
    }else{
        return null
    }
}

const getMax = function(arr){
    let max = arr[0]
    arr.forEach(element => {
      if (element.sold > max.sold){
          max = element
      }
    })
    return max
}

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

const getEmailTypeId = async function (emailType) {
    let emailTypeId = await sequelize.query(`SELECT id FROM Email_type WHERE type = '${emailType}'`)
    if (!emailTypeId[0].length) {
        emailTypeId = await sequelize.query(`INSERT INTO Email_type VALUES(null, '${emailType}')`)
        emailTypeId = emailTypeId[0]
    } else {
        emailTypeId = emailTypeId[0][0].id
    }
    return emailTypeId
}

router.get('/owners', async function(req, res){
    let owners = await sequelize.query(`SELECT name FROM Employee`)
    res.send(owners[0])
})

router.get('/hottestCountry', async function(req, res){
    let countryName = ""
    let q = await sequelize.query(`SELECT country, COUNT(sold) sold FROM Client WHERE sold = 1 GROUP BY country`)
    if (q[0].length){
        const max = getMax(q[0])
        countryName = await getCountryName(max.country)
    }
    res.send(countryName)
})

router.put('/client/:id', async function (req, res) {
    const id = req.params.id
    const countryID = await getCountry(req.body.country)
    const clientID = await sequelize.query(`UPDATE Client SET name = '${req.body.fullName}', country = '${countryID}' WHERE id = ${id}`)
    res.send(clientID)
})

router.put('/owner/:clientId', async function (req, res) {
    const clientId = +req.params.clientId
    const ownerID = await getOwner(req.body.ownerName)
    const response = await sequelize.query(`UPDATE Client SET employee = ${ownerID} WHERE id = ${clientId}`)
    res.send({ownerID})
})

router.put('/emailType/:clientId', async function (req, res) {
    const clientId = +req.params.clientId
    const emailType = req.body.emailType
    const emailTypeId = await getEmailTypeId(emailType)
    const response = await sequelize.query(`UPDATE Client SET email_type = ${emailTypeId} WHERE id = ${clientId}`)
    res.send({emailTypeId})
})

router.put('/sold/:clientId', async function (req, res) {
    const clientId = req.params.clientId
    const response = await sequelize.query(`UPDATE Client SET sold = ${req.body.sold} WHERE id = '${clientId}'`)
    res.send(response)
})

router.post('/client', async function (req, res) {    
    const obj = req.body
    const countryID = await getCountry(obj.country)
    const ownerID = await getOwner(obj.owner)
    const clientID = await sequelize.query(`INSERT INTO Client VALUES(null, '${obj.name}', '${obj.emailAdd}', null, ${countryID}, ${ownerID}, 0, '${obj.date}')`)
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
            email_type: emailType[0][0] ? emailType[0][0].type : "null",
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