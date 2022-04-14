const Nlp_Flow17_ExitBlock = require('../Nlp_Modules/Nlp_Flow17_ExitBlock')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow17_ExitBlock', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow17.Flow17_ExitBlock.reprompt), get_questions(session, questions.Flow17.Flow17_ExitBlock.option), { speak: get_questions_ssml(session, questions.Flow17.Flow17_ExitBlock.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow17.Flow17_ExitBlock.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow17_ExitBlock" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow17.Flow17_ExitBlock.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow17_ExitBlock" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow17.Flow17_ExitBlock.prompt), get_questions(session, questions.Flow17.Flow17_ExitBlock.option), { speak: get_questions_ssml(session, questions.Flow17.Flow17_ExitBlock.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow17.Flow17_ExitBlock.reprompt), optional: true, intentName: "Flow17_ExitBlock" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow17_ExitBlock ", results);
            if (results.response) {
                Nlp_Flow17_ExitBlock.Get_Nlp_Flow17_ExitBlock(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow17_ExitBlock', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow17_ExitBlock");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "MorePaymentTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow17_MorePaymentTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow17_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow10_1_2");
                }
                else if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow17_BackHelpTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow17_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow2", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow17_ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow17_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow17_ExitBlock', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow17_ExitBlock', session.conversationData.conversationId);
                session.replaceDialog('Flow17_ExitBlock', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow17_ExitBlock';
                utility.StoreErrorLogs(message, 'Flow17_ExitBlock', session.conversationData.conversationId);
                session.replaceDialog('Flow17_ExitBlock', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}