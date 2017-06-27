require('dotenv').config()
const axios = require('axios'),
    express = require('express'),
    API_TOKEN = process.env.API_TOKEN,
    TICKET_FIELD_HASH = process.env.TICKET_FIELD_HASH
    SLACK_FIELD_HASH = process.env.SLACK_FIELD_HASH
    COMMENT_FIELD_HASH = process.env.COMMENT_FIELD_HASH
    WEBHOOK_URL = process.env.WEBHOOK_URL

const filter = data => {
  return(
      (data.current.stage_id === 11 ||
      data.current.stage_id === 11) &&
      data.current[TICKET_FIELD_HASH] !== null && 
      (data.previous.stage_id !== 11 ||
      data.previous.stage_id !== 13)
    )
    ||
    (
      data.current.stage_id === 10 &&
      data.current[TICKET_FIELD_HASH] !== null && 
      data.previous.stage_id>10
    )
  }

//let incoming = JSON.parse('{"v":1,"matches_filters":{"current":[1,52]},"meta":{"v":1,"action":"updated","object":"deal","id":649,"company_id":1491942,"user_id":2113494,"host":"just-rock.pipedrive.com","timestamp":1497533119,"timestamp_micro":1497533119159800,"permitted_user_ids":[2113494,732019,1590099,1740860,1780916,2114815,2134949,2375403,2390564,2445379],"trans_pending":false,"is_bulk_update":false,"matches_filters":{"current":[1,52]}},"retry":0,"current":{"id":649,"creator_user_id":2113494,"user_id":2113494,"person_id":18,"org_id":368,"stage_id":11,"title":"Maailm deal","value":5,"currency":"EUR","add_time":"2017-06-14 18:07:06","update_time":"2017-06-15 13:25:19","stage_change_time":"2017-06-15 13:25:19","active":true,"deleted":false,"status":"open","next_activity_date":null,"next_activity_time":null,"next_activity_id":null,"last_activity_id":null,"last_activity_date":null,"lost_reason":null,"visible_to":"3","close_time":null,"pipeline_id":3,"won_time":null,"first_won_time":null,"lost_time":null,"products_count":5,"files_count":0,"notes_count":0,"followers_count":1,"email_messages_count":0,"activities_count":0,"done_activities_count":0,"undone_activities_count":0,"reference_activities_count":0,"participants_count":1,"expected_close_date":null,"last_incoming_mail_time":null,"last_outgoing_mail_time":null,"3d9ecf284b5b419ede27cff15ddfe498b144534d":null,"4f6c8f0faa227af101991d301d7712fcec33da2f":null,"b2d881549cdb92ec9da08b040190304899a32a37":null,"a7eb12ddce7c8303706fd7d0ff9452a896d8c15b":null,"f472abb5475290fa5baf004356f134c5d6a02746":"tere","2491dfdfc72bfdec84882eefdbbd68aae3bc91ba":null,"b32459a28cdd0856512374a671f5fd9754f69537":null,"b32459a28cdd0856512374a671f5fd9754f69537_currency":null,"8eb3ce449261d165bb4bc48cc9472d2a6b1a0f8f":null,"b96409200243dcf1cc1ba3698c23220713267f9b":null,"26022fe615899a60feb6a1c24f512b605702f946":null,"26022fe615899a60feb6a1c24f512b605702f946_lat":null,"26022fe615899a60feb6a1c24f512b605702f946_long":null,"26022fe615899a60feb6a1c24f512b605702f946_subpremise":null,"26022fe615899a60feb6a1c24f512b605702f946_street_number":null,"26022fe615899a60feb6a1c24f512b605702f946_route":null,"26022fe615899a60feb6a1c24f512b605702f946_sublocality":null,"26022fe615899a60feb6a1c24f512b605702f946_locality":null,"26022fe615899a60feb6a1c24f512b605702f946_admin_area_level_1":null,"26022fe615899a60feb6a1c24f512b605702f946_admin_area_level_2":null,"26022fe615899a60feb6a1c24f512b605702f946_country":null,"26022fe615899a60feb6a1c24f512b605702f946_postal_code":null,"26022fe615899a60feb6a1c24f512b605702f946_formatted_address":null,"844cdf2369b6908432aaaabbaf9fec673f673363":null,"5d10894f962bf63723a8b6c538388bc678893076":null,"stage_order_nr":5,"person_name":"tere","org_name":"Maailm","next_activity_subject":null,"next_activity_type":null,"next_activity_duration":null,"next_activity_note":null,"formatted_value":"€5","rotten_time":"2017-07-05 13:25:19","weighted_value":5,"formatted_weighted_value":"€5","owner_name":"Veljo Lasn","cc_email":"just-rock+deal649@pipedrivemail.com","org_hidden":false,"person_hidden":false},"previous":{"id":649,"creator_user_id":2113494,"user_id":2113494,"person_id":405,"org_id":368,"stage_id":10,"title":"Maailm deal","value":5,"currency":"EUR","add_time":"2017-06-14 18:07:06","update_time":"2017-06-15 13:25:18","stage_change_time":"2017-06-15 13:25:18","active":true,"deleted":false,"status":"open","next_activity_date":null,"next_activity_time":null,"next_activity_id":null,"last_activity_id":null,"last_activity_date":null,"lost_reason":null,"visible_to":"3","close_time":null,"pipeline_id":3,"won_time":null,"first_won_time":null,"lost_time":null,"products_count":5,"files_count":0,"notes_count":0,"followers_count":1,"email_messages_count":0,"activities_count":0,"done_activities_count":0,"undone_activities_count":0,"reference_activities_count":0,"participants_count":1,"expected_close_date":null,"last_incoming_mail_time":null,"last_outgoing_mail_time":null,"3d9ecf284b5b419ede27cff15ddfe498b144534d":null,"4f6c8f0faa227af101991d301d7712fcec33da2f":null,"b2d881549cdb92ec9da08b040190304899a32a37":null,"a7eb12ddce7c8303706fd7d0ff9452a896d8c15b":null,"f472abb5475290fa5baf004356f134c5d6a02746":"tere","2491dfdfc72bfdec84882eefdbbd68aae3bc91ba":null,"b32459a28cdd0856512374a671f5fd9754f69537":null,"b32459a28cdd0856512374a671f5fd9754f69537_currency":null,"8eb3ce449261d165bb4bc48cc9472d2a6b1a0f8f":null,"b96409200243dcf1cc1ba3698c23220713267f9b":null,"26022fe615899a60feb6a1c24f512b605702f946":null,"26022fe615899a60feb6a1c24f512b605702f946_lat":null,"26022fe615899a60feb6a1c24f512b605702f946_long":null,"26022fe615899a60feb6a1c24f512b605702f946_subpremise":null,"26022fe615899a60feb6a1c24f512b605702f946_street_number":null,"26022fe615899a60feb6a1c24f512b605702f946_route":null,"26022fe615899a60feb6a1c24f512b605702f946_sublocality":null,"26022fe615899a60feb6a1c24f512b605702f946_locality":null,"26022fe615899a60feb6a1c24f512b605702f946_admin_area_level_1":null,"26022fe615899a60feb6a1c24f512b605702f946_admin_area_level_2":null,"26022fe615899a60feb6a1c24f512b605702f946_country":null,"26022fe615899a60feb6a1c24f512b605702f946_postal_code":null,"26022fe615899a60feb6a1c24f512b605702f946_formatted_address":null,"844cdf2369b6908432aaaabbaf9fec673f673363":null,"5d10894f962bf63723a8b6c538388bc678893076":null,"stage_order_nr":4,"person_name":"tere","org_name":"Maailm","next_activity_subject":null,"next_activity_type":null,"next_activity_duration":null,"next_activity_note":null,"formatted_value":"€5","rotten_time":"2017-08-04 13:25:18","weighted_value":5,"formatted_weighted_value":"€5","owner_name":"Veljo Lasn","cc_email":"just-rock+deal649@pipedrivemail.com","org_hidden":false,"person_hidden":false},"indexable_fields":["a7eb12ddce7c8303706fd7d0ff9452a896d8c15b","f472abb5475290fa5baf004356f134c5d6a02746","26022fe615899a60feb6a1c24f512b605702f946","844cdf2369b6908432aaaabbaf9fec673f673363","5d10894f962bf63723a8b6c538388bc678893076"],"event":"updated.deal"}')

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
// console.log(incoming.current.stage_id)
// getSlackUsername(incoming.current.person_id)
//     .then(({data})=>ensureAt(data.data[SLACK_FIELD_HASH]))
//     .then(slackname => postToSlack(slackname, message(slackname, incoming.current.title, greeting(incoming))))
//     .then(response=>console.log(response.data))
//     .then(res.json("Thanks!"))
//     .catch(console.log)



module.exports = { buildMessage, postToSlack, getSlackUsername,ensureAt, greeting, filter }