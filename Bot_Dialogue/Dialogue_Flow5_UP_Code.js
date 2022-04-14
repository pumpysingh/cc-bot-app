const Nlp_Flow5_Code = require('../Nlp_Modules/Nlp_Flow5_Code')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow5_UP_Code', [
        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow5.Flow5_UP_Code.reprompt), get_questions(session, questions.Flow5.Flow5_UP_Code.option), { speak: get_questions_ssml(session, questions.Flow5.Flow5_UP_Code.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow5.Flow5_UP_Code.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow5_UP_Code" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow5.Flow5_UP_Code.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow5_UP_Code" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow5.Flow5_UP_Code.prompt), get_questions(session, questions.Flow5.Flow5_UP_Code.option), { speak: get_questions_ssml(session, questions.Flow5.Flow5_UP_Code.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow5.Flow5_UP_Code.reprompt), optional: true, intentName: "Flow5_UP_Code" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow5_UP_CodeFlow5_Code ", results);
            if (results.response) {
                Nlp_Flow5_Code.Get_Nlp_Flow5_Code(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow5_UP_Code', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow5_UP_Code");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "YES") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow5_UP_Code_Yes", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5_UP_Code', session.conversationData.conversationId);
                    session.beginDialog("Flow5_UP_Code_Yes");
                }
                else if (response.result.metadata.intentName == "YESBUT") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow5_UP_Code_YesBut", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5_UP_Code', session.conversationData.conversationId);
                    session.beginDialog("Flow6", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "NO") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow5_UP_Code_No", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow5_UP_Code', session.conversationData.conversationId);
                    session.beginDialog("Flow6", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow5_UP_Code', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow5_UP_Code', session.conversationData.conversationId);
                session.replaceDialog('Flow5_UP_Code', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow5_UP_Code';
                utility.StoreErrorLogs(message, 'Flow5_UP_Code', session.conversationData.conversationId);
                session.replaceDialog('Flow5_UP_Code', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}