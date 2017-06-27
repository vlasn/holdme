const express = require("express")
    PORT=process.env.PORT
    bodyParser = require("body-parser")

let app = express()
app.use(bodyParser.json())

const { 
    buildMessage, postToSlack, getSlackUsername ,ensureAt, greeting, filter 
} = require("./utilities")

app.post("/hold", (req, res) => {
    if(filter(req.body)) {
    getSlackUsername(req.body.current.person_id)
        .then(({data})=>ensureAt(data.data[SLACK_FIELD_HASH]))
        .then(slackname => postToSlack(slackname, buildMessage(slackname, req.body.current.title, greeting(req.body)), req.body))
        .then(response=>console.log(response.data))
        .then(res.status(200).json("Thanks!"))
        .catch(console.log)
    } else {
	res.status(200).json("didnt post")
    }
})
app.get("/")

app.listen(3500, ()=>console.log("Up and running on port 3500"))
