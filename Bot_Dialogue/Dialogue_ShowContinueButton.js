var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('ContinueButton', [
        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            if (args && args.reprompt) {
                var customMessage = new builder.Message(session)
                    .sourceEvent({
                        emulator: {
                            type: "showcontinuebtn"
                        },
                        directline: {
                            type: "showcontinuebtn"
                        }
                    })
                    .text(get_questions(session, questions.ContinueButton.reprompt))
                    .speak(get_questions_ssml(session, questions.ContinueButton.reprompt_ssml))
                utility.prompt_text(builder, session, customMessage);
                utility.SendBotEventToGA('showcontinuebtn', session);
            }
            else {
                var customMessage = new builder.Message(session)
                    .sourceEvent({
                        emulator: {
                            type: "showcontinuebtn"
                        },
                        directline: {
                            type: "showcontinuebtn"
                        }
                    });
                utility.prompt_text(builder, session, customMessage);
                utility.SendBotEventToGA('showcontinuebtn', session);
            }
        },
        function (session, results, next) {
            if (results.response.toLowerCase() == "continue chat") {
                session.endDialog();
            } else {
                utility.StoreErrorLogs(results.response, 'Continue', session.conversationData.conversationId);
                session.replaceDialog('ContinueButton', { data: session.conversationData, reprompt: true });
            }
        }
    ]);
}