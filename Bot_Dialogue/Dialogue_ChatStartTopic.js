const Nlp_ChatStartTopic = require('../Nlp_Modules/Nlp_ChatStartTopic')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('ChatStartTopic', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.ChatStartTopic.reprompt), get_questions(session, questions.ChatStartTopic.option), { speak: get_questions_ssml(session, questions.ChatStartTopic.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.ChatStartTopic.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_ChatStartTopic" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.ChatStartTopic.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_ChatStartTopic" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.ChatStartTopic.prompt), get_questions(session, questions.ChatStartTopic.option), { speak: get_questions_ssml(session, questions.ChatStartTopic.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.ChatStartTopic.reprompt), optional: true, intentName: "ChatStartTopic" });
            }
        },
        function (session, results, next) {
            console.log("Result of ChatStartTopic ", results);
            if (results.response) {
                Nlp_ChatStartTopic.Get_Nlp_ChatStartTopic(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('ChatStartTopic', { data: session.conversationData, reprompt: true });
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
                    utility.StoreErrorLogs(constant.matched, 'ChatStartTopic', session.conversationData.conversationId);
                    session.beginDialog("Flow3");
                }
                else if (response.result.metadata.intentName == "TopicPaymentPlan") {
                    utility.setConversationDatas(session, keys, values, true, "PaymentPlan", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'ChatStartTopic', session.conversationData.conversationId);
                    session.beginDialog("Flow9_1", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "ContactNelnet") {
                    utility.setConversationDatas(session, keys, values, true, "ContactNelnet", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'ChatStartTopic', session.conversationData.conversationId);
                    session.beginDialog("Flow23", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "SomethingElse") {
                    utility.setConversationDatas(session, keys, values, true, "Flow31", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'ChatStartTopic', session.conversationData.conversationId);
                    session.beginDialog("Flow31", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('ChatStartTopic', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'ChatStartTopic', session.conversationData.conversationId);
                session.replaceDialog('ChatStartTopic', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'ChatStartTopic';
                utility.StoreErrorLogs(message, 'ChatStartTopic', session.conversationData.conversationId);
                session.replaceDialog('ChatStartTopic', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}