var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow32_5', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session)
                .sourceEvent({
                    emulator: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Payment_Plan_Billing_Adjust.jpg"
                    },
                    directline: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Payment_Plan_Billing_Adjust.jpg"
                    }
                })
                .text(get_questions(session, questions.Flow32.Flow32_5.prompt))
                .speak(get_questions_ssml(session, questions.Flow32.Flow32_5.prompt_ssml))
                .inputHint(builder.InputHint.ignoringInput);
            session.send(customMessage);
            utility.SendBotEventToGA('Flow32_5', session);
            setTimeout(() => {
               session.endDialog();
            }, configtime.longMultipleMessageTimeout);
        }
    ]);
}