const Nlp_Flow7_4_RecoverAccount = require('../Nlp_Modules/Nlp_Flow7_4_RecoverAccount')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow7_4_RecoverAccount', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.reprompt), get_questions(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.option), { speak: get_questions_ssml(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow7_RecoverAccount" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow7_RecoverAccount" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.prompt), get_questions(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.option), { speak: get_questions_ssml(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow7.Flow7_3.Flow7_4_RecoverAccount.reprompt), optional: true, intentName: "Flow7_RecoverAccount" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow7_4_RecoverAccount ", results);
            if (results.response) {
                Nlp_Flow7_4_RecoverAccount.Get_Nlp_Flow7_4_RecoverAccount(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow7_4_RecoverAccount', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow7_RecoverAccount");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "Yes") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow7_RecoverAccount_Yes", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow7_4_RecoverAccount', session.conversationData.conversationId);
                    session.beginDialog("Flow4");
                }
                else if (response.result.metadata.intentName == "No") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow7_RecoverAccount_No", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow7_4_RecoverAccount', session.conversationData.conversationId);
                    session.beginDialog("Flow9", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "AccountLocked") {
                    utility.setConversationDatas(session, keys, values, true, "uFlow7_RecoverAccount_Locked", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow7_4_RecoverAccount', session.conversationData.conversationId);
                    session.beginDialog("Flow8", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow7_4_RecoverAccount', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow7_4_RecoverAccount', session.conversationData.conversationId);
                session.replaceDialog('Flow7_4_RecoverAccount', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                utility.StoreErrorLogs(message, 'Flow7_4_RecoverAccount', session.conversationData.conversationId);
                session.replaceDialog('Flow7_4_RecoverAccount', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}