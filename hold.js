require('dotenv').config()

const express = require("express")
const PORT = process.env.PORT
const bodyParser = require("body-parser")
const zendesk = require("./zendesk")

const app = express()
app.use(bodyParser.json())

const {
    buildMessage, postToSlack, getPerson, ensureAt, status, filter, postToMonitoring, loggo
} = require("./utilities")

app.post("/hold", (req, res) => {
    if (filter(req.body)) {
        let nick = ''
        loggo(req.body)
        getPerson(req.body.current.person_id)
            .then(({data}) => ensureAt(data.data[SLACK_FIELD_HASH]))
            .then(slackname => {
                nick = slackname
                return postToSlack(slackname, buildMessage(slackname, req.body.current.title, status(req.body.current)), req.body)
            })
            .then(() => postToMonitoring(nick, req.body))
            .then(response => console.log("slack: " + response.data))
            .then(() => zendesk.post(req.body.current, status(req.body.current)))
            .then(res.status(200).json("Thanks!"))
            .catch(console.log)
    } else {
        res.status(200).json("didnt post")
    }
})

app.listen(PORT||3500, () => console.log("Up and running on port 3500"))
