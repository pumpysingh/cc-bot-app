var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('CommanOptOut', [
        function (session, args, next) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session).sourceEvent({
                emulator: {
                    type: "endOfConversation",
                    showbutton: false
                }, directline: {
                    type: "endOfConversation",
                    showbutton: false
                }
            })
            var keys = [];
            var values = [];
            keys.push("EndConversation");
            values.push("ConversationEnded");
            utility.setConversationDatas(session, keys, values, true);
            utility.StoreErrorLogs(constant.matched, 'EndConversation', session.conversationData.conversationId);
            utility.EndChatEvent(session, true);
            console.log("Session data ", session.conversationData);
            session.send(customMessage);
        }
    ]);
}