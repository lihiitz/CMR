const Sequelize = require('sequelize')
const sequelize = new Sequelize('mysql://root:@localhost/sql_intro')
const data = require('./data.json')


const getCountry = async function(country){
    let countryID = await sequelize.query(`SELECT * FROM Country WHERE name = '${country}'`)
    if (!countryID[0].length){
        countryID = await sequelize.query(`INSERT INTO Country VALUES(null, '${country}')`)
        countryID = countryID[0]
    }else{
        countryID = countryID[0][0].id
    }
    return countryID
}

const getEmployee = async function(employee){
    let employeeID = await sequelize.query(`SELECT * FROM Employee WHERE name = '${employee}'`)
    if (!employeeID[0].length){
        employeeID = await sequelize.query(`INSERT INTO Employee VALUES(null, '${employee}')`)
        employeeID = employeeID[0]
    }else{
        employeeID = employeeID[0][0].id
    }
    return employeeID
}

const getEmail = async function(type){
    let emailTypeID = await sequelize.query(`SELECT * FROM Email_type WHERE type = '${type}'`)
    if (!emailTypeID[0].length){
        emailTypeID = await sequelize.query(`INSERT INTO Email_type VALUES(null, '${type}')`)
        emailTypeID = emailTypeID[0]
    }else{
        emailTypeID = emailTypeID[0][0].id
    }
    return emailTypeID
}

const getClient = async function(obj, emailType, country, employee){
    let sold = obj.sold ? 1 : 0
    let clientID = await sequelize.query(`SELECT * FROM Client WHERE name = '${obj.name}'`)
    if (!clientID[0].length){
        const date = obj.firstContact.slice(0, 10)
        clientID = await sequelize.query(`INSERT INTO Client VALUES(null, '${obj.name}', '${obj.email}', '${emailType}', '${country}', '${employee}', '${sold}', '${date}')`)
        clientID = clientID[0]
    }else{
        clientID = clientID[0][0].id
    }
    return clientID
}

const addData = async function(){
    for (let obj of data){
        const countryID = await getCountry(obj.country)
        const employeeID = await getEmployee(obj.owner)
        const emailTypeID = await getEmail(obj.emailType)
        const client = await getClient(obj, emailTypeID, countryID, employeeID)
    }
}

// addData()