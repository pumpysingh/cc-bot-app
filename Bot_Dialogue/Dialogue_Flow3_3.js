const Nlp_AskUserToChooseYESNO = require('../Nlp_Modules/Nlp_AskUserToChooseYESNO')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow3_3', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow3.Flow3_3.reprompt), get_questions(session, questions.Flow3.Flow3_3.option), { speak: get_questions_ssml(session, questions.Flow3.Flow3_3.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow3.Flow3_3.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow3_3" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow3.Flow3_3.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow3_3" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow3.Flow3_3.prompt), get_questions(session, questions.Flow3.Flow3_3.option), { speak: get_questions_ssml(session, questions.Flow3.Flow3_3.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow3.Flow3_3.reprompt), optional: true, intentName: "Flow3_3" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow3.Flow3_3 ", results);
            if (results.response) {
                Nlp_AskUserToChooseYESNO.Get_Nlp_AskUserToChooseYESNO(nlpcallbacks(session, results.response.entity));
            } else {
                if (session.conversationData.usermaritialstatus) {
                    session.endDialog();
                } else {
                    session.replaceDialog('Flow3_3', { data: session.conversationData, reprompt: true });
                }
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
                keys.push("Flow3");
                values.push("uFlow3_Yes");
                utility.setConversationDatas(session, keys, values, true, "uFlow3_Yes", response.result.metadata.intentName);
                utility.StoreErrorLogs(constant.matched, 'Flow3_3', session.conversationData.conversationId);
                session.beginDialog("Flow4");
            },
            notmatch: function (response) {
                var keys = [];
                var values = [];
                keys.push("Flow3");
                values.push("uFlow3_No");
                utility.setConversationDatas(session, keys, values, true, "uFlow3_No", response.result.metadata.intentName);
                utility.StoreErrorLogs(constant.matched, 'Flow3_3', session.conversationData.conversationId);
                session.beginDialog("Flow5");
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow3_3', session.conversationData.conversationId);
                session.replaceDialog('Flow3_3', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow3_3';
                utility.StoreErrorLogs(message, 'Flow3_3', session.conversationData.conversationId);
                session.replaceDialog('Flow3_3', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}