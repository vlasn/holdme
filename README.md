HOLDME:

Super simple webhook listener that yells at people in Slack on deal updates that meet filter criteria.

Used tech:
Node 7+, express, axios.

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
```
then
`node hold` or `pm2 start hold.js` or `nodemon hold.js`

Then point a Pipedrive webhook towards it and you should be good to go!
