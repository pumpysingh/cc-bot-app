const Nlp_Flow10_NextPay_4 = require('../Nlp_Modules/Nlp_Flow10_NextPay_4')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow10_NextPay_4', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.reprompt), get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.option), { speak: get_questions_ssml(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow10_NextPay_4" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow10_NextPay_4" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.prompt), get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.option), { speak: get_questions_ssml(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_4.reprompt), optional: true, intentName: "Flow10_NextPay_4" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow10_NextPay_4 ", results);
            if (results.response) {
                Nlp_Flow10_NextPay_4.Get_Flow10_NextPay_4(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow10_NextPay_4', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow10_NextPay");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "MorePaymentTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10NextPay_MorePaymentTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_NextPay_4', session.conversationData.conversationId);
                    session.beginDialog("Flow10_1_2");
                }
                else if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10NextPay_BackHelpTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_NextPay_4', session.conversationData.conversationId);
                    session.beginDialog("Flow2", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow10NextPay_ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow10_NextPay_4', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow10_NextPay_4', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow10_NextPay_4', session.conversationData.conversationId);
                session.replaceDialog('Flow10_NextPay_4', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow10_NextPay_4';
                utility.StoreErrorLogs(message, 'Flow10_NextPay_4', session.conversationData.conversationId);
                session.replaceDialog('Flow10_NextPay_4', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}