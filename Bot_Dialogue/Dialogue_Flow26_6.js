var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow26_6', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session)
                .sourceEvent({
                    emulator: {
                        type: "downloadpdf",
                        link: "https://factsscreengrabs.blob.core.windows.net/browserguides/Safari_Troubleshooting.pdf"
                    },
                    directline: {
                        type: "downloadpdf",
                        link: "https://factsscreengrabs.blob.core.windows.net/browserguides/Safari_Troubleshooting.pdf"
                    }
                })
                .text(get_questions(session, questions.Flow26.Flow26_6.prompt))
                .speak(get_questions_ssml(session, questions.Flow26.Flow26_6.prompt_ssml))
                .inputHint(builder.InputHint.ignoringInput);
            session.send(customMessage)
            utility.SendBotEventToGA('Flow26_6', session);
            setTimeout(() => {
                session.endDialog();
            }, configtime.longMultipleMessageTimeout);
        }
    ]);
}