const express = require("express")
    PORT=process.env.PORT
    bodyParser = require("body-parser")

let app = express()
app.use(bodyParser.json())

const { 
    buildMessage, postToSlack, getSlackUsername ,ensureAt, greeting, filter, postToMonitoring
} = require("./utilities")

app.post("/hold", (req, res) => {
    if(filter(req.body)) {
        let nick = ''
    getSlackUsername(req.body.current.person_id)
        .then(({data})=>ensureAt(data.data[SLACK_FIELD_HASH]))
        .then(slackname => {
            nick = slackname
            return postToSlack(slackname, buildMessage(slackname, req.body.current.title, greeting(req.body)), req.body)
        })
        .then(()=>postToMonitoring(nick,req.body))
        .then(response=>console.log(response.data))
        .then(res.status(200).json("Thanks!"))
        .catch(console.log)
    } else {
	res.status(200).json("didnt post")
    }
})
app.get("/")

app.listen(3500, ()=>console.log("Up and running on port 3500"))
