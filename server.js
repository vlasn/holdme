let express = require("express")
    axios = require('axios'),
    express = require('express'),
    API_TOKEN = process.env.API_TOKEN,
    TICKET_FIELD_HASH = process.env.TICKET_FIELD_HASH,
    SLACK_FIELD_HASH = process.env.SLACK_FIELD_HASH,
    WEBHOOK_URL = process.env.WEBHOOK_URL,
    PORT=process.env.PORT
    bodyParser = require('body-parser')


let app = express()

app.use(bodyParser.json())


const { 
    buildMessage, postToSlack, getSlackUsername ,ensureAt, greeting, filter 
} = require("./sketch")

app.post('/hold', (req, res) => {
    getSlackUsername(req.body.current.person_id)
        .then(({data})=>ensureAt(data.data[SLACK_FIELD_HASH]))
        .then(slackname => postToSlack(slackname, buildMessage(slackname, req.body.current.title, greeting(req.body)), req.body))
        .then(response=>console.log(response.data))
        .then(res.json("Thanks!"))
        .catch(console.log)
})

app.listen(3500, ()=>console.log('Up and running on port 3500'))