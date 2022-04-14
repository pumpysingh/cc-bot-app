const Nlp_Flow10_1_2 = require('../Nlp_Modules/Nlp_Flow10_1_2')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow10_1_2', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow10_1_2.reprompt), get_questions(session, questions.Flow10_1_2.option), { speak: get_questions_ssml(session, questions.Flow10_1_2.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow10_1_2.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow10_1_2" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow10_1_2.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow10_1_2" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow10_1_2.prompt), get_questions(session, questions.Flow10_1_2.option), { speak: get_questions_ssml(session, questions.Flow10_1_2.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow10_1_2.reprompt), optional: true, intentName: "Flow10_1_2" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow10_1_2 ", results);
            if (results.response) {
                Nlp_Flow10_1_2.Get_Nlp_Flow10_1_2(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow10_1_2', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow10_1_2");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "NextPay") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2NextPay", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow10_NextPay");
                }
                else if (response.result.metadata.intentName == "ChangeDueDate") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2ChangeDueDate", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow11_Auto", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "Payment") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2Payment", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow13", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "Fin") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2Fin", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow14", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "RemoveFin") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2RemoveFin", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow15", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "Terminate") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2Terminate", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow16", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "Fees") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2Fees", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow17", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "Auth") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2Auth", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow18", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "AdjustPaymentPlan") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10_1_2AdjustPaymentPlan", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_1_2', session.conversationData.conversationId);
                    session.beginDialog("Flow32", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow10_1_2', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow10_1_2', session.conversationData.conversationId);
                session.replaceDialog('Flow10_1_2', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow10_1_2';
                utility.StoreErrorLogs(message, 'Flow10_1_2', session.conversationData.conversationId);
                session.replaceDialog('Flow10_1_2', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}