const Nlp_Flow26_8 = require('../Nlp_Modules/Nlp_Flow26_8')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow26_8', [
        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow26.Flow26_8.reprompt), get_questions(session, questions.Flow26.Flow26_8.option), { speak: get_questions_ssml(session, questions.Flow26.Flow26_8.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow26.Flow26_8.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow26_8" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow26.Flow26_8.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow26_8" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow26.Flow26_8.prompt), get_questions(session, questions.Flow26.Flow26_8.option), { speak: get_questions_ssml(session, questions.Flow26.Flow26_8.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow26.Flow26_8.reprompt), optional: true, intentName: "Flow26_8" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow26_8 ", results);
            if (results.response) {
                Nlp_Flow26_8.Get_Nlp_Flow26_8(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow26_8', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow26_8");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow26_8_BackHelpTopics");
                    utility.StoreErrorLogs(constant.matched, 'Flow26_8', session.conversationData.conversationId);
                    session.beginDialog("Flow2");
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow26_8_ChatEnd");
                    utility.StoreErrorLogs(constant.matched, 'Flow26_8', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow26_8', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow26_8', session.conversationData.conversationId);
                session.replaceDialog('Flow26_8', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow26_8';
                utility.StoreErrorLogs(message, 'Flow26_8', session.conversationData.conversationId);
                session.replaceDialog('Flow26_8', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}