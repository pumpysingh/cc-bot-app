var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow17_1_3', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session)
                .sourceEvent({
                    emulator: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Page3_Image5_1200x836px.jpg"
                    },
                    directline: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Page3_Image5_1200x836px.jpg"
                    }
                })
                .text(get_questions(session, questions.Flow17.Flow17_1.Flow17_1_3.prompt))
                .speak(get_questions_ssml(session, questions.Flow17.Flow17_1.Flow17_1_3.prompt_ssml))
                .inputHint(builder.InputHint.ignoringInput);
            session.send(customMessage)
            utility.SendBotEventToGA('Flow17_1_3', session);
            setTimeout(() => {
                session.beginDialog("ContinueButton");
              //  session.endDialog();
            }, configtime.longMultipleMessageTimeout);
        },
        function (session, args) {
            session.endDialog();
        }
    ]);
}