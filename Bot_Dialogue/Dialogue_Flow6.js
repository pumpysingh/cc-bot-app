const Nlp_Flow6 = require('../Nlp_Modules/Nlp_Flow6')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow6', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow6.reprompt), get_questions(session, questions.Flow6.option), { speak: get_questions_ssml(session, questions.Flow6.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow6.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow6" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow6.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow6" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow6.prompt), get_questions(session, questions.Flow6.option), { speak: get_questions_ssml(session, questions.Flow6.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow6.reprompt), optional: true, intentName: "Flow6" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow6 ", results);
            if (results.response) {
                Nlp_Flow6.Get_Nlp_Flow6(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow6', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow6");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "YesTryAgain") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow6_Yes", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow6', session.conversationData.conversationId);
                    session.beginDialog("Flow6_Yes");
                }
                else if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow6_BackHelpTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow6', session.conversationData.conversationId);
                    session.beginDialog("Flow2", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow6_ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow6', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow6', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow6', session.conversationData.conversationId);
                session.replaceDialog('Flow6', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow6';
                utility.StoreErrorLogs(message, 'Flow6', session.conversationData.conversationId);
                session.replaceDialog('Flow6', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}