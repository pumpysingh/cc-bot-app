const Nlp_Flow7_3 = require('../Nlp_Modules/Nlp_Flow7_3')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow7_3', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow7.Flow7_3.reprompt), get_questions(session, questions.Flow7.Flow7_3.option), { speak: get_questions_ssml(session, questions.Flow7.Flow7_3.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow7.Flow7_3.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow7_3" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow7.Flow7_3.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow7_3" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow7.Flow7_3.prompt), get_questions(session, questions.Flow7.Flow7_3.option), { speak: get_questions_ssml(session, questions.Flow7.Flow7_3.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow7.Flow7_3.reprompt), optional: true, intentName: "Flow7_3" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow7_3 ", results);
            if (results.response) {
                Nlp_Flow7_3.Get_Nlp_Flow7_3(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow7_3', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow7");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "TryToRecover") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow7_RecoverAccount", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow7_3', session.conversationData.conversationId);
                    session.beginDialog("Flow7_4_RecoverAccount");
                }
                else if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow7_BackHelpTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow7_3', session.conversationData.conversationId);
                    session.beginDialog("Flow2", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow7_ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow7_3', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow7_3', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow7_3', session.conversationData.conversationId);
                session.replaceDialog('Flow7_3', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow7_3';
                utility.StoreErrorLogs(message, 'Flow7_3', session.conversationData.conversationId);
                session.replaceDialog('Flow7_3', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}