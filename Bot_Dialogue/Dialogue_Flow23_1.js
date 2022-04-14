const Nlp_Flow23_1 = require('../Nlp_Modules/Nlp_Flow23_1')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow23_1', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow23.Flow23_1.reprompt), get_questions(session, questions.Flow23.Flow23_1.option), { speak: get_questions_ssml(session, questions.Flow23.Flow23_1.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow23.Flow23_1.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow23_1" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow23.Flow23_1.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow23_1" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow23.Flow23_1.prompt), get_questions(session, questions.Flow23.Flow23_1.option), { speak: get_questions_ssml(session, questions.Flow23.Flow23_1.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow23.Flow23_1.reprompt), optional: true, intentName: "Flow23_1" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow23_1 ", results);
            if (results.response) {
                Nlp_Flow23_1.Get_Nlp_Flow23_1(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow23_1', { data: session.conversationData, reprompt: true });
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
                    utility.setConversationDatas(session, keys, values, true, "Flow23_Email");
                    utility.StoreErrorLogs(constant.matched, 'Flow23_1', session.conversationData.conversationId);
                    session.beginDialog("Flow23_2");
                }
                else if (response.result.metadata.intentName == "LiveChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow23_Chat");
                    utility.StoreErrorLogs(constant.matched, 'Flow23_1', session.conversationData.conversationId);
                    session.beginDialog("Flow24", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "Phone") {
                    utility.setConversationDatas(session, keys, values, true, "Flow23_Phone");
                    utility.StoreErrorLogs(constant.matched, 'Flow23_1', session.conversationData.conversationId);
                    session.beginDialog("Flow25", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow23_1', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow23_1', session.conversationData.conversationId);
                session.replaceDialog('Flow23_1', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow23_1';
                utility.StoreErrorLogs(message, 'Flow23_1', session.conversationData.conversationId);
                session.replaceDialog('Flow23_1', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}