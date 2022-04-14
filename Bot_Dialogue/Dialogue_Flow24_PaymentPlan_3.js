const Nlp_Flow24_3 = require('../Nlp_Modules/Nlp_Flow24_3')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow24_PaymentPlan_3', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.reprompt), get_questions(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.option), { speak: get_questions_ssml(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow24_PaymentPlan_3" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow24_PaymentPlan_3" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.prompt), get_questions(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.option), { speak: get_questions_ssml(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow24_PaymentPlan.Flow24_PaymentPlan_3.reprompt), optional: true, intentName: "Flow24_PaymentPlan_3" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow24_PaymentPlan_3 ", results);
            if (results.response) {
                Nlp_Flow24_3.Get_Nlp_Flow24_3(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow24_PaymentPlan_3', { data: session.conversationData, reprompt: true });
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
                keys.push("email");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "Email") {
                    utility.setConversationDatas(session, keys, values, true, "Flow24_PaymentPlan_3_Email", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow24_PaymentPlan_3', session.conversationData.conversationId);
                    session.beginDialog("Flow23_PaymentPlan_2");
                }
                else if (response.result.metadata.intentName == "Phone") {
                    utility.setConversationDatas(session, keys, values, true, "Flow24_PaymentPlan_3_Phone", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow24_PaymentPlan_3', session.conversationData.conversationId);
                    session.beginDialog("Flow25_PaymentPlan", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow24_PaymentPlan_3_ChatStartTopic", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow24_PaymentPlan_3', session.conversationData.conversationId);
                    session.beginDialog("Flow2", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow24_PaymentPlan_3_ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow24_PaymentPlan_3', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow24_PaymentPlan_3', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow24_PaymentPlan_3', session.conversationData.conversationId);
                session.replaceDialog('Flow24_PaymentPlan_3', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow24_PaymentPlan_3';
                utility.StoreErrorLogs(message, 'Flow24_PaymentPlan_3', session.conversationData.conversationId);
                session.replaceDialog('Flow24_PaymentPlan_3', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}