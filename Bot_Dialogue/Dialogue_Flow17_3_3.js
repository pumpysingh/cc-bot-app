const Nlp_Flow17_3_3 = require('../Nlp_Modules/Nlp_Flow17_3_3')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow17_3_3', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow17.Flow17_3.Flow17_3_3.reprompt), get_questions(session, questions.Flow17.Flow17_3.Flow17_3_3.option), { speak: get_questions_ssml(session, questions.Flow17.Flow17_3.Flow17_3_3.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow17.Flow17_3.Flow17_3_3.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow17_3_3" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow17.Flow17_3.Flow17_3_3.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow17_3_3" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow17.Flow17_3.Flow17_3_3.prompt), get_questions(session, questions.Flow17.Flow17_3.Flow17_3_3.option), { speak: get_questions_ssml(session, questions.Flow17.Flow17_3.Flow17_3_3.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow17.Flow17_3.Flow17_3_3.reprompt), optional: true, intentName: "Flow17_3_3" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow17_3_3 ", results);
            if (results.response) {
                Nlp_Flow17_3_3.Get_Nlp_Flow17_3_3(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow17_3_3', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow17_3_3");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "ContactNelnet") {
                    utility.setConversationDatas(session, keys, values, true, "Flow17_Contact", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow17_3_3', session.conversationData.conversationId);
                    session.beginDialog("Flow23_PaymentPlan");
                }
                else if (response.result.metadata.intentName == "Continue") {
                    utility.setConversationDatas(session, keys, values, true, "Flow17_Continue", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow17_3_3', session.conversationData.conversationId);
                    session.beginDialog("Flow17_ExitBlock", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow17_3_3', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow17_3_3', session.conversationData.conversationId);
                session.replaceDialog('Flow17_3_3', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow17_3_3';
                utility.StoreErrorLogs(message, 'Flow17_3_3', session.conversationData.conversationId);
                session.replaceDialog('Flow17_3_3', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}