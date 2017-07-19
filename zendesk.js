
const Zendesk = require('zendesk-node-api')
const zendesk = new Zendesk({
  url: process.env.ZENDESK_API,
  email: process.env.ZENDESK_EMAIL,
  token: process.env.ZENDESK_APIKEY
})
const TICKET_FIELD_HASH = process.env.TICKET_FIELD_HASH
const COMMENT_FIELD_HASH = process.env.COMMENT_FIELD_HASH


const post = function(current, status) {
  let ticketId = current[process.env.TICKET_FIELD_HASH].split("/").reverse()[0]
  let contentTemplate = 
    `${current.owner_name} has given this ticket has a new status: 
    **${status}**

    Comment: ${current[process.env.COMMENT_FIELD_HASH]}\
    `
  zendesk.tickets.update(ticketId, {
    comment: {body: contentTemplate, public: false},
    status: 'pending'
  })
    .then(()=>console.log("Posted comment to ZD ticket "+ticketId))
    .catch(console.log)
}

module.exports = {post}