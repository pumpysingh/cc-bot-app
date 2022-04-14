var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {
    bot.dialog('ChatComment_2', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (!session.conversationData.usercomment) {
                if (args && args.reprompt) {
                    var customMessage = new builder.Message(session)
                        .sourceEvent({
                            emulator: {
                                type: "commentbox"
                            },
                            directline: {
                                type: "commentbox"
                            }
                        })
                        .text(get_questions(session, questions.Flow30.ChatComment.ChatComment_2.reprompt))
                        .speak(get_questions_ssml(session, questions.Flow30.ChatComment.ChatComment_2.reprompt_ssml))
                    utility.prompt_text(builder, session, customMessage);
                    utility.SendBotEventToGA('Reprompt_ChatComment_2', session);
                } else {
                    var customMessage = new builder.Message(session)
                        .sourceEvent({
                            emulator: {
                                type: "commentbox"
                            },
                            directline: {
                                type: "commentbox"
                            }
                        })
                        .text(get_questions(session, questions.Flow30.ChatComment.ChatComment_2.prompt))
                        .speak(get_questions_ssml(session, questions.Flow30.ChatComment.ChatComment_2.prompt_ssml))
                    utility.prompt_text(builder, session, customMessage);
                    utility.SendBotEventToGA('ChatComment_2', session);
                }
            } else {
                session.endDialog();
            }
        },
        function (session, results, next) {
            if (results.response == "No feedback given") {
                var keys = [];
                var values = [];
                keys.push("usercomment");
                values.push('No feedback given');
                utility.setConversationDatas(session, keys, values, true, "Flow30_Cancel");
                utility.StoreErrorLogs(constant.matched, 'ChatComment_2', session.conversationData.conversationId);
                session.endDialog();
            } else {
                var keys = [];
                var values = [];
                keys.push("usercomment");
                values.push(results.response);
                utility.setConversationDatas(session, keys, values, true, "Flow30_Submit");
                utility.StoreErrorLogs(constant.matched, 'ChatComment_2', session.conversationData.conversationId);
                session.endDialog();
            }
        }
    ]);
}