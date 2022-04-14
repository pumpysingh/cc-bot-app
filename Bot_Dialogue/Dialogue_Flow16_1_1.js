var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow16_1_1', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session)
                .sourceEvent({
                    emulator: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Page5_Image2_1200x836px.JPG"
                    },
                    directline: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Page5_Image2_1200x836px.JPG"
                    }
                })
                .text(get_questions(session, questions.Flow16.Flow16_1.Flow16_1_1.prompt))
                .speak(get_questions_ssml(session, questions.Flow16.Flow16_1.Flow16_1_1.prompt_ssml))
                .inputHint(builder.InputHint.ignoringInput);
            session.send(customMessage)
            utility.SendBotEventToGA('Flow16_1_1', session);
            setTimeout(() => {
                session.endDialog();
            }, configtime.longMultipleMessageTimeout);
        }
    ]);
}