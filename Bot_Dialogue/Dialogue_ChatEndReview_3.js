const Nlp_ChatEndReview_3 = require('../Nlp_Modules/Nlp_ChatEndReview_3')
var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var constant = require('../constant')

module.exports = function (bot, builder) {

    bot.dialog('ChatEndReview_3', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow30.ChatEndReview.ChatEndReview_3.reprompt), get_questions(session, questions.Flow30.ChatEndReview.ChatEndReview_3.option), { speak: get_questions_ssml(session, questions.Flow30.ChatEndReview.ChatEndReview_3.reprompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow30.ChatEndReview.ChatEndReview_3.reprompt), optional: true, isReprompt: true, intentName: "Reprompt_ChatEndReview_3" });
            } else if (args && args.toolargereprompt) {
                utility.prompt_choice(builder, session, get_questions(session, questions.LargeMessageError.prompt), get_questions(session, questions.Flow30.ChatEndReview.ChatEndReview_3.option), { speak: get_questions_ssml(session, questions.LargeMessageError.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.LargeMessageError.prompt), optional: true, isReprompt: true, isLargePrompt: true, intentName: "Large_Reprompt_ChatEndReview_3" });
            } else {
                utility.prompt_choice(builder, session, get_questions(session, questions.Flow30.ChatEndReview.ChatEndReview_3.prompt), get_questions(session, questions.Flow30.ChatEndReview.ChatEndReview_3.option), { speak: get_questions_ssml(session, questions.Flow30.ChatEndReview.ChatEndReview_3.prompt_ssml), listStyle: builder.ListStyle.button, retryPrompt: get_questions(session, questions.Flow30.ChatEndReview.ChatEndReview_3.reprompt), optional: true, intentName: "ChatEndReview_3" });
            }
        },
        function (session, results, next) {
            console.log("Result of ChatEndReview_3 ", results);
            if (results.response) {
                Nlp_ChatEndReview_3.Get_Nlp_ChatEndReview_3(nlpcallbacks(session, results.response.entity));
            } else {
                session.replaceDialog('ChatEndReview_3', { data: session.conversationData, reprompt: true });
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
                keys.push("ChatEndReview");
                values.push(response.result.metadata.intentName);
                if (response.result.metadata.intentName == "Helpful") {
                    utility.setConversationDatas(session, keys, values, true, "ReviewUp", response.result.metadata.intentName);
                    utility.StoreErrorLogs(constant.matched, 'ChatEndReview_3', session.conversationData.conversationId);
                    session.endDialog();
                }
                else if (response.result.metadata.intentName == "NotHelpful") {
                    utility.setConversationDatas(session, keys, values, true, "ReviewDown", response.result.metadata.intentName);
                    // session.beginDialog("ChatComment", { data: session.conversationData })
                    utility.StoreErrorLogs(constant.matched, 'ChatEndReview_3', session.conversationData.conversationId);
                    session.endDialog();
                }
                else {
                    session.replaceDialog('ChatEndReview_3', { data: session.conversationData, reprompt: true });
                }
            },
            repromptquestion: function (response) {
                console.log("Inside Reprompt Question");
                utility.StoreErrorLogs(message, 'ChatEndReview_3', session.conversationData.conversationId);
                session.replaceDialog('ChatEndReview_3', { data: session.conversationData, reprompt: true });
            },
            tooLargeMessage: function (response) {
                session.conversationData.lastDialogName = 'ChatEndReview_3';
                utility.StoreErrorLogs(message, 'ChatEndReview_3', session.conversationData.conversationId);
                session.replaceDialog('ChatEndReview_3', { data: session.conversationData, toolargereprompt: true });
            }
        }
    }
}