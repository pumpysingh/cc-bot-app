// var apiai = require('apiai');
const dialogflow = require('dialogflow');
var config = require('../config');
// var app = apiai(config.apiaitoken)
var clientEmail = config.clientEmail
var privateKey = config.privateKey;
var projectId = config.projectId;
var configDialog = {
    credentials: {
        private_key: privateKey,
        client_email: clientEmail
    }
}

// Instantiates a session client
const sessionClient = new dialogflow.SessionsClient(configDialog);

const LANGUAGE_CODE = 'en-US'

module.exports = {
    sendToapiai: async function (session, message, success, error) {
        console.log("AIIIIIIIIIIIIII",message)

        console.log("Project ID ",projectId);
        console.log("Session ID ",session.message.address.conversation.id.split('|')[0]);
        // The path to identify the agent that owns the created intent.
        const sessionPath = sessionClient.sessionPath(
            projectId,
            session.message.address.conversation.id.split('|')[0]
        );

        // The text query request.
        const request = {
            session: sessionPath,
            queryInput: {
                text: {
                    text: message,
                    languageCode: LANGUAGE_CODE,
                },
            },
        };

        // if (contexts && contexts.length > 0) {
        //     request.queryParams = {
        //         contexts: contexts,
        //     };
        // }

        try{
            var responses = await sessionClient.detectIntent(request);
            console.log("response from API AI ",responses[0]);
            console.log("Response object Parameters ", responses[0].queryResult.parameters);
            console.log("Response object Intent Name", responses[0].queryResult.intent.displayName);
            success(responses[0]);
        }
        catch(err){
            console.log("Response object Error ", err);
            error(err);
        }
    }

}



// module.exports={
//     sendToapiai:function (session, message, success, error) {
//     var request = app.textRequest(message, {
//         sessionId: session.message.address.conversation.id.split('|')[0]
//     });
//     request.on('response', success);
//     request.end();
//     request.on('error', error);
//     }
// }
