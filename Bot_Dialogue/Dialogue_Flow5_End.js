const Nlp_Flow5_End = require('../Nlp_Modules/Nlp_Flow5_End')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow5_End', [
        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow5.Flow5_End.reprompt), get_questions(session, questions.Flow5.Flow5_End.option), { speak: get_questions_ssml(session, questions.Flow5.Flow5_End.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow5.Flow5_End.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow5_End" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow5.Flow5_End.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow5_End" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow5.Flow5_End.prompt), get_questions(session, questions.Flow5.Flow5_End.option), { speak: get_questions_ssml(session, questions.Flow5.Flow5_End.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow5.Flow5_End.reprompt), optional: true, intentName: "Flow5_End" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow5_End ", results);
            if (results.response) {
                Nlp_Flow5_End.Get_Nlp_Flow5_End(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow5_End', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow5_End");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "YesReturn") {
                    utility.setConversationDatas(session, keys, values, true, "Flow5_End_Yes", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5_End', session.conversationData.conversationId);
                    session.beginDialog("Flow2");
                }
                else if (response.result.metadata.intentName == "NoEnd") {
                    utility.setConversationDatas(session, keys, values, true, "ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5_End', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow5_End', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow5_End', session.conversationData.conversationId);
                session.replaceDialog('Flow5_End', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow5_End';
                utility.StoreErrorLogs(message, 'Flow5_End', session.conversationData.conversationId);
                session.replaceDialog('Flow5_End', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}