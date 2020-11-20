const Pool = require('pg').Pool
const pool = new Pool({
    user: 'myrole',
    host: 'localhost',
    database: 'api',
    password: 'vinod@5597',
    port: 5432,
})

const getUsers = (request, response) => {
    pool.query('SELECT * FROM users', (error, results) => {
        if (error) {
            response.status(400).send(`Error occured ${error}`)
            return
        }
        response.status(200).json(results.rows)

    })
}


const postUsers = (request, response) => {
    console.log('Request body' + request.body)
    const { mobile, name, email } = request.body
    pool.query('INSERT into users(mobile,name,email) VALUES($1,$2, $3)', [mobile, name, email], (error, results) => {
        if (error) {
            response.status(400).send(`Error occured ${error}`)
            return
        }
        response.status(201).send(`user added with name :${results.rows}`)
    })
}

const findUser = (request, response) => {
    const mobile = request.query.mobileno;
    console.log('mobile=' + mobile);
    pool.query('SELECT * FROM users WHERE mobile=$1', [mobile], (error, results) => {
        if (error) {
            response.status(400).json(`Error occured ${error}`)
            return
        }
        if (results.rowCount == 1) {
            response.status(200).json({
                'userexists': true
            })
            return
        }
        else {
            response.status(200).json({
                'userexists': false
            })
            return

        }
    })
}


module.exports = {
    getUsers, postUsers, findUser
}