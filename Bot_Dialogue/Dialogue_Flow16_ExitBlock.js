const Nlp_Flow16_ExitBlock = require('../Nlp_Modules/Nlp_Flow16_ExitBlock')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant=require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow16_ExitBlock', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow16.Flow16_ExitBlock.reprompt), get_questions(session, questions.Flow16.Flow16_ExitBlock.option), { speak: get_questions_ssml(session, questions.Flow16.Flow16_ExitBlock.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow16.Flow16_ExitBlock.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow16_ExitBlock" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow16.Flow16_ExitBlock.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow16_ExitBlock" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow16.Flow16_ExitBlock.prompt), get_questions(session, questions.Flow16.Flow16_ExitBlock.option), { speak: get_questions_ssml(session, questions.Flow16.Flow16_ExitBlock.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow16.Flow16_ExitBlock.reprompt), optional: true, intentName: "Flow16_ExitBlock" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow16_ExitBlock ", results);
            if (results.response) {
                Nlp_Flow16_ExitBlock.Get_Nlp_Flow16_ExitBlock(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow16_ExitBlock', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow16_ExitBlock");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "MorePaymentTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow16_MorePaymentTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow16_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow10_1_2");
                }
                else if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow16_BackHelpTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow16_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow2", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow16_ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow16_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow16_ExitBlock', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow16_ExitBlock', session.conversationData.conversationId);
                session.replaceDialog('Flow16_ExitBlock', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow16_ExitBlock';
                utility.StoreErrorLogs(message, 'Flow16_ExitBlock', session.conversationData.conversationId);
                session.replaceDialog('Flow16_ExitBlock', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}