var questions = require('../questions');
var get_questions = require('../get_questions');
var get_questions_ssml = require('../get_questions_ssml');
var utility = require('../utility');
var configtime = require('../config');

module.exports = function (bot, builder) {

    bot.dialog('Flow11_Auto_2_1', [

        function (session, args) {
            if (args && args.data) {
                session.conversationData = args.data;
            }
            var customMessage = new builder.Message(session)
                .sourceEvent({
                    emulator: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Page5_FACTS_Calendar_1200x836px.jpg"
                    },
                    directline: {
                        type: "showscreengrab",
                        link: "https://factsscreengrabs.blob.core.windows.net/screengrabs/Page5_FACTS_Calendar_1200x836px.jpg"
                    }
                })
                .text(get_questions(session, questions.Flow11.Flow11_Auto.Flow11_Auto_2.Flow11_Auto_2_1.prompt))
                .speak(get_questions_ssml(session, questions.Flow11.Flow11_Auto.Flow11_Auto_2.Flow11_Auto_2_1.prompt_ssml))
                .inputHint(builder.InputHint.ignoringInput);
            session.send(customMessage)
            utility.SendBotEventToGA('Flow11_Auto_2_1', session);
            setTimeout(() => {
                session.endDialog();
            }, configtime.longMultipleMessageTimeout);
        }
    ]);
}