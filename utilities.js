require('dotenv').config()
const axios = require('axios'),
    API_TOKEN = process.env.API_TOKEN,
    TICKET_FIELD_HASH = process.env.TICKET_FIELD_HASH
    SLACK_FIELD_HASH = process.env.SLACK_FIELD_HASH
    COMMENT_FIELD_HASH = process.env.COMMENT_FIELD_HASH
    WEBHOOK_URL = process.env.WEBHOOK_URL

const filter = data => {
  return(
      (data.current.stage_id === 6  || //=== 11 ||
      data.current.stage_id === 8) && //=== 11) &&
      data.current[TICKET_FIELD_HASH] !== null && 
      (data.previous.stage_id !== 6 || // !== 11 
      data.previous.stage_id !== 8) // !== 13)
    )
    ||
    (
      data.current.stage_id === 2 && // === 10 &&
      data.current[TICKET_FIELD_HASH] !== null && 
      data.previous.stage_id > 2 //  > 10
    )
  }

const greeting = ({current}) => current.stage_id>=11 ? 'On Hold' : 'In progress' // "calculate" new status based on stage ID
const getSlackUsername = personId => axios.get(
  `https://api.pipedrive.com/v1/persons/${personId}?api_token=${API_TOKEN}`
)

const ensureAt = (nick) => nick.substring(0,1) ==='@' ? nick : '@'+nick
const postToSlack = (nick, message='hi', body) => {
  return axios.post(WEBHOOK_URL, {
    channel: nick,
    text: message + " \n Comment:",
    attachments: [
      {
        color: '#000000',
        text: body.current[COMMENT_FIELD_HASH]
      }
    ]
  })
}

let buildMessage = (name,title,status) => `Hi ${name}! Your ticket '${title}' has a new status: \n *${status}*`

module.exports = { buildMessage, postToSlack, getSlackUsername,ensureAt, greeting, filter }
