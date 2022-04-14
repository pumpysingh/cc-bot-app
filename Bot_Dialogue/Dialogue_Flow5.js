const Nlp_Flow5 = require('../Nlp_Modules/Nlp_Flow5')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow5', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow5.reprompt), get_questions(session, questions.Flow5.option), { speak: get_questions_ssml(session, questions.Flow5.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow5.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow5" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow5.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow5" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow5.prompt), get_questions(session, questions.Flow5.option), { speak: get_questions_ssml(session, questions.Flow5.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow5.reprompt), optional: true, intentName: "Flow5" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow5 ", results);
            if (results.response) {
                Nlp_Flow5.Get_Nlp_Flow5(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow5', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow5");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "ForgotUP") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow5_ForgotUP", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5', session.conversationData.conversationId);
                    session.beginDialog("Flow5_ForgotUP");
                }
                else if (response.result.metadata.intentName == "AccountLocked") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow5_Locked", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5', session.conversationData.conversationId);
                    session.beginDialog("Flow5_Locked", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "CurrentPlan") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow5_CPlan", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5', session.conversationData.conversationId);
                    session.beginDialog("Flow5_CPlan", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "OtherLoggingInProblems") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow5_Other", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5', session.conversationData.conversationId);
                    session.beginDialog("Flow5_Other", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow5', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow5', session.conversationData.conversationId);
                session.replaceDialog('Flow5', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow5';
                utility.StoreErrorLogs(message, 'Flow5', session.conversationData.conversationId);
                session.replaceDialog('Flow5', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}