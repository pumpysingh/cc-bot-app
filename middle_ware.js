var restapicall = require('./restapicall');
var utility = require('./utility');
module.exports = {
    logIncomingMessage: function (session, next) {
        if(!session.conversationData.msg_counter){
            session.conversationData.msg_counter = 1;
        }else{
            session.conversationData.msg_counter = parseInt(session.conversationData.msg_counter) + 1;
        }
        var constantuuid = '50c9ec3c-4355-11eb-b378-0242ac130002';
        if(session.message.text && session.message.text.indexOf(constantuuid) > -1){
            restapicall.storemessages(session.message.address.conversation.id,
                "Hello",
                "",
                "user",
                new Date(),
                session.conversationData.msg_counter,
                "",
                "message",
                "").then(function(data) {
                // console.log(data);
            },
            function(err) {
                console.log(err);
            })
            next();
        }
        else{
            restapicall.storemessages(session.message.address.conversation.id,
                session.message.text,
                "",
                "user",
                new Date(),
                session.conversationData.msg_counter,
                "",
                "message",
                "").then(function(data) {
                // console.log(data);
            },
            function(err) {
                console.log(err);
            })
            next();
        }
    },
    logOutgoingMessage: function (event,next) {
        var msgtype = "message";
        if(!event.text && event.sourceEvent){
            msgtype = event.sourceEvent.type;
        }
        if(event && Array.isArray(event.attachments) && event.attachments[0].contentType=='application/vnd.microsoft.keyboard'){
            msgtype = 'application/vnd.microsoft.keyboard';
        }
        // console.log("msgtype :"+msgtype);
        var attachments = {}
        if(event.attachments){
            attachments = event.attachments;
        }
        restapicall.storemessages(event.address.conversation.id,
            event.text,
            event.speak,
            "xander",
            new Date(),
            "",
            event.sourceEvent,
            msgtype,
            attachments).then(function(data) {
            // console.log(data);
        },
        function(err) {
            console.log(err);
        })
        next();
    }
}