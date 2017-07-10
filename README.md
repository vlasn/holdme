HOLDME:

Super simple webhook listener that yells at people in Slack on deal updates that meet filter criteria.

Used tech:
Javascript,
Node 7+

usage:
`git clone repositoryaddress foldername`
`npm install`
`touch .env && nano .env`

Create an ENV file with the following contents:
```
TICKET_FIELD_HASH= Pipedrive custom field hash
SLACK_FIELD_HASH= Pipedrive custom field hash
COMMENT_FIELD_HASH= Pipedrive custom field hash
API_TOKEN= Pipedrive API token
WEBHOOK_URL= Slack webhook url
PORT= The port the service should run on
MONITORING_CHANNEL_NAME= Internal Slack channel name for record-keeping
```
then
`node hold` or `pm2 start hold.js` or `nodemon hold.js`

Point a Pipedrive webhook towards it and you should be good to go!
