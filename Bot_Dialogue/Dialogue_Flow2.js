const Nlp_Flow2 = require('../Nlp_Modules/Nlp_Flow2')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow2', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow2.reprompt), get_questions(session, questions.Flow2.option), { speak: get_questions_ssml(session, questions.Flow2.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow2.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow2" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow2.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow2" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow2.prompt), get_questions(session, questions.Flow2.option), { speak: get_questions_ssml(session, questions.Flow2.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow2.reprompt), optional: true, intentName: "Flow2" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow2 ", results);
            if (results.response) {
                Nlp_Flow2.Get_Nlp_Flow2(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow2', { data: session.conversationData, reprompt: true });
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
                keys.push("ChatStartTopic");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "TopicLoggingIn") {
                    utility.setConversationDatas(session, keys, values, true, "Login", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow2', session.conversationData.conversationId);
                    session.beginDialog("Flow3");
                }
                else if (response.result.metadata.intentName == "TopicPaymentPlan") {
                    utility.setConversationDatas(session, keys, values, true, "PaymentPlan", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow2', session.conversationData.conversationId);
                    session.beginDialog("Flow9_1", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "ContactNelnet") {
                    utility.setConversationDatas(session, keys, values, true, "ContactNelnet", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow2', session.conversationData.conversationId);
                    session.beginDialog("Flow23", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "SomethingElse") {
                    utility.setConversationDatas(session, keys, values, true, "Flow31", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow2', session.conversationData.conversationId);
                    session.beginDialog("Flow31", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow2', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow2', session.conversationData.conversationId);
                session.replaceDialog('Flow2', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow2';
                utility.StoreErrorLogs(message, 'Flow2', session.conversationData.conversationId);
                session.replaceDialog('Flow2', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}