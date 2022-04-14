var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow10_NextPay_2', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session)
                .sourceEvent({
                    emulator: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Page4_Facts_and_CC_1200x836px.JPG"
                    },
                    directline: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Page4_Facts_and_CC_1200x836px.JPG"
                    }
                })
                .text(get_questions(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_2.prompt))
                .speak(get_questions_ssml(session, questions.Flow10.Flow10_NextPay.Flow10_NextPay_2.prompt_ssml))
                .inputHint(builder.InputHint.ignoringInput);
            session.send(customMessage)
            utility.SendBotEventToGA('Flow10_NextPay_2', session);
            setTimeout(() => {
                session.endDialog();
            }, configtime.longMultipleMessageTimeout);
        }
    ]);
}