const Nlp_Flow9 = require('../Nlp_Modules/Nlp_Flow9')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow9', [
        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow9.reprompt), get_questions(session, questions.Flow9.option), { speak: get_questions_ssml(session, questions.Flow9.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow9.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow9" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow9.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow9" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow9.prompt), get_questions(session, questions.Flow9.option), { speak: get_questions_ssml(session, questions.Flow9.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow9.reprompt), optional: true, intentName: "Flow9" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow9 ", results);
            if (results.response) {
                Nlp_Flow9.Get_Nlp_Flow9(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow9', { data: session.conversationData, reprompt: true });
            }
        }
    ]);

    var nlpcallbacks = function (session, message) {
        return {
            session: session,
            message: message,
            match: function (response) {
                var keys = [];
                var values = [];
                keys.push("Flow9");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "CheckBrowser") {
                    utility.setConversationDatas(session, keys, values, true, "CheckMyBrowser", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow9', session.conversationData.conversationId);
                    session.beginDialog("Flow26");
                }
                else if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow9_BackHelpTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow9', session.conversationData.conversationId);
                    session.beginDialog("Flow2", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow9_ChatEnd", response.result.metadata);
                    utility.StoreErrorLogs(constant.matched, 'Flow9', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow9', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow9', session.conversationData.conversationId);
                session.replaceDialog('Flow9', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow9';
                utility.StoreErrorLogs(message, 'Flow9', session.conversationData.conversationId);
                session.replaceDialog('Flow9', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}