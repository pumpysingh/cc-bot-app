const Nlp_Flow9_1 = require('../Nlp_Modules/Nlp_Flow9_1')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow9_1', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow9.Flow9_1.reprompt), get_questions(session, questions.Flow9.Flow9_1.option), { speak: get_questions_ssml(session, questions.Flow9.Flow9_1.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow9.Flow9_1.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow9_1" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow9.Flow9_1.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow9_1" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow9.Flow9_1.prompt), get_questions(session, questions.Flow9.Flow9_1.option), { speak: get_questions_ssml(session, questions.Flow9.Flow9_1.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow9.Flow9_1.reprompt), optional: true, intentName: "Flow9_1" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow9_1 ", results);
            if (results.response) {
                Nlp_Flow9_1.Get_Nlp_Flow9_1(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow9_1', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow9_1");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "YES") {
                    utility.setConversationDatas(session, keys, values, true, "Flow9_1_Yes", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow9_1', session.conversationData.conversationId);
                    session.beginDialog("Flow10");
                }
                else if (response.result.metadata.intentName == "NO") {
                    utility.setConversationDatas(session, keys, values, true, "Flow9_1_No", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow9_1', session.conversationData.conversationId);
                    session.beginDialog("Flow10_1_1", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow9_1', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow9_1', session.conversationData.conversationId);
                session.replaceDialog('Flow9_1', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow9_1';
                utility.StoreErrorLogs(message, 'Flow9_1', session.conversationData.conversationId);
                session.replaceDialog('Flow9_1', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}