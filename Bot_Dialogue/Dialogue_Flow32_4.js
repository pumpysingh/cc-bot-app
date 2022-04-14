const Nlp_Flow32_4 = require('../Nlp_Modules/Nlp_Flow32_4')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow32_4', [
        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow32.Flow32_4.reprompt), get_questions(session, questions.Flow32.Flow32_4.option), { speak: get_questions_ssml(session, questions.Flow32.Flow32_4.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow32.Flow32_4.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow32_4" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow32.Flow32_4.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow32_4" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow32.Flow32_4.prompt), get_questions(session, questions.Flow32.Flow32_4.option), { speak: get_questions_ssml(session, questions.Flow32.Flow32_4.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow32.Flow32_4.reprompt), optional: true, intentName: "Flow32_4" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow32_4 ", results);
            if (results.response) {
                Nlp_Flow32_4.Get_Nlp_Flow32_4(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow32_4', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow32_4");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "ContactNelnet") {
                    utility.setConversationDatas(session, keys, values, true, "Flow32_4_Contact", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow32_4', session.conversationData.conversationId);
                    session.beginDialog("Flow23_PaymentPlan");
                }
                else if (response.result.metadata.intentName == "Continue") {
                    utility.setConversationDatas(session, keys, values, true, "Flow32_4_Continue", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow32_4', session.conversationData.conversationId);
                    session.endDialog();
                }
                else {
                    session.replaceDialog('Flow32_4', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow32_4', session.conversationData.conversationId);
                session.replaceDialog('Flow32_4', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow32_4';
                utility.StoreErrorLogs(message, 'Flow32_4', session.conversationData.conversationId);
                session.replaceDialog('Flow32_4', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}