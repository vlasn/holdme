require('dotenv').config()
const axios = require('axios'),
    API_TOKEN = process.env.API_TOKEN,
    TICKET_FIELD_HASH = process.env.TICKET_FIELD_HASH
    SLACK_FIELD_HASH = process.env.SLACK_FIELD_HASH
    COMMENT_FIELD_HASH = process.env.COMMENT_FIELD_HASH
    WEBHOOK_URL = process.env.WEBHOOK_URL

const filter = data => {
  return(
      (data.current.stage_id === 6  ||
      data.current.stage_id === 8) &&
      data.current[TICKET_FIELD_HASH] !== null &&
      (data.previous.stage_id !== 6 &&
      data.previous.stage_id !== 8)
    )
    ||
    (
      data.current.stage_id === 2 &&
      data.current[TICKET_FIELD_HASH] !== null &&
      data.previous.stage_id > 6
    )
  }

const greeting = ({current}) => current.stage_id >= 6 ? 'On Hold' : 'In progress' // "calculate" new status based on stage ID
const getSlackUsername = personId => axios.get(
  `https://api.pipedrive.com/v1/persons/${personId}?api_token=${API_TOKEN}`
)
const commentBuilder = ({current}) => (current.stage_id == 8 ?
  `Your case has been sent to the Nylas team and might take up to 24h to be resolved. 
Please enjoy some :coffee: & :kringel: while you wait.` :
  current[COMMENT_FIELD_HASH] 
)

const ensureAt = (nick) => nick.substring(0,1) ==='@' ? nick : '@'+nick
const postToSlack = (nick, message='hi', body) => {
  return axios.post(WEBHOOK_URL, {
    channel: nick,
    text: `
*${body.current.owner_name} has updated your ticket <${body.current[TICKET_FIELD_HASH]}|${body.current.title}>!*
The new status is _${greeting(body)}_!
Comment:`,
    attachments: [
      {
        color: '#000000',
        text: commentBuilder(body)
      }
    ]
  })
}
const postToMonitoring = (nick, body) => {
  return axios.post(WEBHOOK_URL, {
    channel: process.env.MONITORING_CHANNEL_NAME,
    text: `
*${body.current.owner_name} updated  <${body.current[TICKET_FIELD_HASH]}|${body.current.title}>!*
The new status is _${greeting(body)}_!
Comment:`,
    attachments: [
      {
        color: '#000000',
        text: body.current[COMMENT_FIELD_HASH]
      },
      {
        color: '#fafafa',
        text: `Ticket id ${body.current.id}`
      }
    ]
  })
}

let buildMessage = (name,title,status) => `Hi ${name}! Your ticket '${title}' has a new status: \n *${status}*`

module.exports = { buildMessage, postToSlack, getSlackUsername,ensureAt, greeting, filter, postToMonitoring }
