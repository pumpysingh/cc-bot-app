const Nlp_Flow4 = require('../Nlp_Modules/Nlp_Flow4')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow4', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow4.reprompt), get_questions(session, questions.Flow4.option), { speak: get_questions_ssml(session, questions.Flow4.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow4.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow4" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow4.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow4" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow4.prompt), get_questions(session, questions.Flow4.option), { speak: get_questions_ssml(session, questions.Flow4.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow4.reprompt), optional: true, intentName: "Flow4" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow4 ", results);
            if (results.response) {
                Nlp_Flow4.Get_Nlp_Flow4(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow4', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow4");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "YesReturn") {
                    utility.setConversationDatas(session, keys, values, true, "Flow4_BackHelpTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow4', session.conversationData.conversationId);
                    session.beginDialog("Flow2");
                }
                else if (response.result.metadata.intentName == "NoEnd") {
                    utility.setConversationDatas(session, keys, values, true, "Flow4_ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow4', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow4', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow4', session.conversationData.conversationId);
                session.replaceDialog('Flow4', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow4';
                utility.StoreErrorLogs(message, 'Flow4', session.conversationData.conversationId);
                session.replaceDialog('Flow4', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}