const Nlp_Flow11_ExitBlock = require('../Nlp_Modules/Nlp_Flow11_ExitBlock')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('Flow11_ExitBlock', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow11.Flow11_ExitBlock.reprompt), get_questions(session, questions.Flow11.Flow11_ExitBlock.option), { speak: get_questions_ssml(session, questions.Flow11.Flow11_ExitBlock.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow11.Flow11_ExitBlock.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_Flow11_ExitBlock" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow11.Flow11_ExitBlock.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_Flow11_ExitBlock" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow11.Flow11_ExitBlock.prompt), get_questions(session, questions.Flow11.Flow11_ExitBlock.option), { speak: get_questions_ssml(session, questions.Flow11.Flow11_ExitBlock.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow11.Flow11_ExitBlock.reprompt), optional: true, intentName: "Flow11_ExitBlock" });
            }
        },
        function (session, results, next) {
            console.log("Result of Flow11_ExitBlock ", results);
            if (results.response) {
                Nlp_Flow11_ExitBlock.Get_Nlp_Flow11_ExitBlock(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('Flow11_ExitBlock', { data: session.conversationData, reprompt: true });
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
                keys.push("Flow11_ExitBlock");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "MorePaymentTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow11_MorePaymentTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow11_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow10_1_2");
                }
                else if (response.result.metadata.intentName == "HelpTopics") {
                    utility.setConversationDatas(session, keys, values, true, "Flow11_BackHelpTopics", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow11_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow2", { data: session.conversationData })
                }
                else if (response.result.metadata.intentName == "EndChat") {
                    utility.setConversationDatas(session, keys, values, true, "Flow11_ChatEnd", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'Flow11_ExitBlock', session.conversationData.conversationId);
                    session.beginDialog("Flow30", { data: session.conversationData })
                }
                else {
                    session.replaceDialog('Flow11_ExitBlock', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'Flow11_ExitBlock', session.conversationData.conversationId);
                session.replaceDialog('Flow11_ExitBlock', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'Flow11_ExitBlock';
                utility.StoreErrorLogs(message, 'Flow11_ExitBlock', session.conversationData.conversationId);
                session.replaceDialog('Flow11_ExitBlock', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}