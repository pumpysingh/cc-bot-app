const Nlp_Flow6_Yes = require('../Nlp_Modules/Nlp_Flow6_Yes')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow6_Yes', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow6.Flow6_Yes.reprompt), get_questions(session, questions.Flow6.Flow6_Yes.option), { speak: get_questions_ssml(session, questions.Flow6.Flow6_Yes.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow6.Flow6_Yes.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow6_Yes" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow6.Flow6_Yes.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow6_Yes" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow6.Flow6_Yes.prompt), get_questions(session, questions.Flow6.Flow6_Yes.option), { speak: get_questions_ssml(session, questions.Flow6.Flow6_Yes.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow6.Flow6_Yes.reprompt), optional: true, intentName: "Flow6_Yes" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow6_Yes ", results);
            if (results.response) {
                Nlp_Flow6_Yes.Get_Nlp_Flow6_Yes(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow6_Yes', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow6_Yes");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "YES") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow6_Yes_Yes");
                    utility.StoreErrorLogs(constant.matched, 'Flow6_Yes', session.conversationData.conversationId);
                    session.beginDialog("Flow4");
                }
                else if (response.result.metadata.intentName == "NO") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow6_Yes_No");
                    utility.StoreErrorLogs(constant.matched, 'Flow6_Yes', session.conversationData.conversationId);
                    session.beginDialog("Flow7", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow6_Yes', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow6_Yes', session.conversationData.conversationId);
                session.replaceDialog('Flow6_Yes', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow6_Yes';
                utility.StoreErrorLogs(message, 'Flow6_Yes', session.conversationData.conversationId);
                session.replaceDialog('Flow6_Yes', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}